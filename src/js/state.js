/* ============================================================
   STATE — local-first persistence layer (localStorage)
   Nothing here ever leaves the browser.
   ============================================================ */

const STORAGE_KEY = "careerOS.v1";

const DEFAULT_STATE = {
  theme: "dark",
  skillStatus: {},       // { skillId: status }
  projectStatus: {},     // { projectId: status }
  resourceDone: {},       // { resourceId: true }
  practiceDone: {},        // { practiceId: true }
  notes: {},               // { "type:id": "text" }
  weeklyHoursTarget: 15,
  weeklyTasks: {},          // { "phaseId-weekIndex": [{id,text,category,done}] }
  monthlyCheckpointsDone: {}, // { checkpointId: { know:false, build:false, ... } }
  leads: [],                // [{id, name, note, stage, createdAt}]
  decisionEntries: [],      // [{id, name, answers:{}, verdict, createdAt}]
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredCloneSafe(DEFAULT_STATE);
    const parsed = JSON.parse(raw);
    return Object.assign(structuredCloneSafe(DEFAULT_STATE), parsed);
  } catch (e) {
    console.error("Failed to load state, resetting.", e);
    return structuredCloneSafe(DEFAULT_STATE);
  }
}

function structuredCloneSafe(obj) {
  return JSON.parse(JSON.stringify(obj));
}

let STATE = loadState();

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE));
  } catch (e) {
    console.error("Failed to save state", e);
    showToast("Couldn't save — storage may be full or blocked.");
  }
}

/* ---- Skill / project status helpers ---- */
function getSkillStatus(id) {
  return STATE.skillStatus[id] || SKILLS.find(s => s.id === id)?.status || "not-started";
}
function setSkillStatus(id, status) {
  STATE.skillStatus[id] = status;
  saveState();
}
function getProjectStatus(id) {
  return STATE.projectStatus[id] || PROJECTS.find(p => p.id === id)?.status || "not-started";
}
function setProjectStatus(id, status) {
  STATE.projectStatus[id] = status;
  saveState();
}

function getNote(type, id) {
  return STATE.notes[`${type}:${id}`] || "";
}
function setNote(type, id, text) {
  const key = `${type}:${id}`;
  if (text.trim()) STATE.notes[key] = text;
  else delete STATE.notes[key];
  saveState();
}
function allNotes() {
  return Object.entries(STATE.notes).map(([key, text]) => {
    const [type, id] = key.split(":");
    return { type, id, text };
  });
}

/* ---- Progress aggregation ---- */
const SKILL_STATUS_ORDER = ["not-started", "learning", "practicing", "built-project", "portfolio-ready", "commercially-ready", "strong"];
const SKILL_STATUS_LABELS = {
  "not-started": "Not started",
  "learning": "Learning",
  "practicing": "Practicing",
  "built-project": "Built project",
  "portfolio-ready": "Portfolio ready",
  "commercially-ready": "Commercially ready",
  "strong": "Strong",
};
const PROJECT_STATUS_ORDER = ["not-started", "planning", "building", "testing", "complete", "portfolio-published"];
const PROJECT_STATUS_LABELS = {
  "not-started": "Not started",
  "planning": "Planning",
  "building": "Building",
  "testing": "Testing",
  "complete": "Complete",
  "portfolio-published": "Portfolio published",
};

function skillProgressPct(skill) {
  const idx = SKILL_STATUS_ORDER.indexOf(getSkillStatus(skill.id));
  return Math.round((idx / (SKILL_STATUS_ORDER.length - 1)) * 100);
}

function overallProgress() {
  const total = SKILLS.length;
  const weighted = SKILLS.reduce((sum, s) => sum + skillProgressPct(s), 0);
  const completedSkills = SKILLS.filter(s => ["portfolio-ready", "commercially-ready", "strong"].includes(getSkillStatus(s.id))).length;
  const projectsComplete = PROJECTS.filter(p => ["complete", "portfolio-published"].includes(getProjectStatus(p.id))).length;
  const portfolioProjects = PROJECTS.filter(p => getProjectStatus(p.id) === "portfolio-published").length;
  return {
    pct: total ? Math.round(weighted / total) : 0,
    completedSkills,
    totalSkills: total,
    projectsComplete,
    totalProjects: PROJECTS.length,
    portfolioProjects,
    practiceHours: SKILLS.reduce((sum, s) => {
      const done = (s.practiceIds || []).filter(pid => STATE.practiceDone[pid]).length;
      return sum;
    }, 0),
  };
}

function currentStage() {
  // The first stage that isn't fully "strong/commercially-ready" on all its skills
  for (const stage of ROADMAP_STAGES) {
    const skills = SKILLS.filter(s => stage.skillIds.includes(s.id));
    const allStrong = skills.every(s => ["commercially-ready", "strong"].includes(getSkillStatus(s.id)));
    if (!allStrong) return stage;
  }
  return ROADMAP_STAGES[ROADMAP_STAGES.length - 1];
}

/* Business readiness — self-reported signal, not a certification */
function businessReadiness() {
  const skillsReady = SKILLS.filter(s => ["commercially-ready", "strong"].includes(getSkillStatus(s.id))).length;
  const projectsPortfolio = PROJECTS.filter(p => getProjectStatus(p.id) === "portfolio-published").length;
  const technical = Math.min(100, Math.round((skillsReady / SKILLS.length) * 140));
  const portfolio = Math.min(100, projectsPortfolio * 34);
  const clientReady = Math.min(100, (STATE.leads.filter(l => l.stage === "Won" || l.stage === "Delivery" || l.stage === "Retainer").length) * 50);
  const sales = Math.min(100, STATE.leads.length * 12);
  return { technical, portfolio, clientReady, sales };
}

/* ---- Next action logic ---- */
function nextActionForSkill(skill) {
  const status = getSkillStatus(skill.id);
  const map = {
    "not-started": `Start learning — review prerequisites, then the "Topics" list on this skill.`,
    "learning": `Move from theory to practice — try the linked practice exercises.`,
    "practicing": `Build the linked project to prove this skill with something real.`,
    "built-project": `Publish it — write up the project and mark it portfolio-ready.`,
    "portfolio-ready": `Look for a way to sell this — check the linked service on the Services page.`,
    "commercially-ready": `Keep the proof current; look for a compounding skill that pairs with this one.`,
    "strong": `This skill is solid — mentor, teach, or use it to anchor a new service.`,
  };
  return map[status] || map["not-started"];
}

function suggestedNextSkill() {
  const stage = currentStage();
  const skills = SKILLS.filter(s => stage.skillIds.includes(s.id));
  const unfinished = skills.filter(s => !["commercially-ready", "strong"].includes(getSkillStatus(s.id)));
  unfinished.sort((a, b) => SKILL_STATUS_ORDER.indexOf(getSkillStatus(b.id)) - SKILL_STATUS_ORDER.indexOf(getSkillStatus(a.id)));
  return unfinished[0] || skills[0];
}

/* ---- Export / Import ---- */
function exportData() {
  const blob = new Blob([JSON.stringify(STATE, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `career-os-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  showToast("Exported your data.");
}

function importData(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      STATE = Object.assign(structuredCloneSafe(DEFAULT_STATE), parsed);
      saveState();
      applyTheme();
      showToast("Import complete — reloading view.");
      navigateTo(currentRoute || "dashboard");
    } catch (err) {
      showToast("That file couldn't be read as valid Career OS data.");
    }
  };
  reader.readAsText(file);
}

function resetAllData() {
  STATE = structuredCloneSafe(DEFAULT_STATE);
  saveState();
  applyTheme();
  navigateTo("dashboard");
  showToast("All local data cleared.");
}

/* ---- Toast ---- */
let toastTimer = null;
function showToast(message) {
  let el = document.getElementById("toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.style.display = "block";
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.style.display = "none"; }, 2600);
}
