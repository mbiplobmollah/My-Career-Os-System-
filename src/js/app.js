/* ============================================================
   APP — router, nav, modal, global event delegation, bootstrap
   ============================================================ */

const NAV_SECTIONS = [
  { label: "OVERVIEW", items: [
    { route: "dashboard", label: "Dashboard", icon: "◆" },
    { route: "roadmap", label: "My Roadmap", icon: "≋" },
  ]},
  { label: "LEARN", items: [
    { route: "skills", label: "Skills", icon: "◈" },
    { route: "skill-tree", label: "Skill Tree", icon: "⌥" },
    { route: "projects", label: "Projects", icon: "▣" },
    { route: "practice", label: "Practice", icon: "▹" },
    { route: "resources", label: "Resources", icon: "▤" },
  ]},
  { label: "BUSINESS", items: [
    { route: "business-problems", label: "Business Problems", icon: "?" },
    { route: "services", label: "Services", icon: "$" },
    { route: "freelancing", label: "Freelancing", icon: "⇄" },
    { route: "income", label: "Income", icon: "↗" },
    { route: "consulting", label: "Consulting", icon: "◎" },
    { route: "portfolio", label: "Portfolio", icon: "★" },
  ]},
  { label: "THINKING TOOLS", items: [
    { route: "decision-framework", label: "Decision Framework", icon: "⚖" },
    { route: "dont-learn-yet", label: "Don't Learn Yet", icon: "⊘" },
  ]},
  { label: "PLANNING", items: [
    { route: "weekly-plan", label: "Weekly Plan", icon: "▦" },
    { route: "monthly-checkpoints", label: "Monthly Checkpoints", icon: "✓" },
    { route: "notes", label: "Notes", icon: "✎" },
  ]},
  { label: "", items: [
    { route: "settings", label: "Settings", icon: "⚙" },
  ]},
];

const ROUTE_TITLES = {};
NAV_SECTIONS.forEach(sec => sec.items.forEach(i => ROUTE_TITLES[i.route] = i.label));

const ROUTES = {
  "dashboard": () => renderDashboard(),
  "roadmap": () => renderRoadmap(),
  "skills": () => renderSkills(skillsFilterState),
  "skill-tree": () => renderSkillTree(),
  "projects": () => renderProjects(),
  "practice": () => renderPractice(),
  "resources": () => renderResources(),
  "business-problems": () => renderBusinessProblems(bpQuery),
  "services": () => renderServices(),
  "freelancing": () => renderFreelancing(),
  "income": () => renderIncome(),
  "consulting": () => renderConsulting(),
  "portfolio": () => renderPortfolio(),
  "decision-framework": () => renderDecisionFramework(),
  "dont-learn-yet": () => renderDontLearnYet(),
  "weekly-plan": () => renderWeeklyPlan(),
  "monthly-checkpoints": () => renderMonthlyCheckpoints(),
  "notes": () => renderNotes(),
  "settings": () => renderSettings(),
};

let currentRoute = "dashboard";
let skillsFilterState = { category: "all", status: "all", q: "" };
let bpQuery = "";

function navigateTo(route) {
  if (!ROUTES[route]) route = "dashboard";
  currentRoute = route;
  window.location.hash = route;
  renderRoute();
  closeSidebarMobile();
  document.getElementById("main").scrollTo({ top: 0 });
}

function renderRoute() {
  const main = document.getElementById("main");
  main.innerHTML = ROUTES[currentRoute]();
  document.getElementById("topbar-title").textContent = ROUTE_TITLES[currentRoute] || "Career OS";
  renderNav();
}

function renderNav() {
  const nav = document.getElementById("sidebar-nav");
  nav.innerHTML = NAV_SECTIONS.map(sec => `
    ${sec.label ? `<div class="nav-group-label">${sec.label}</div>` : `<div style="margin-top:var(--sp-3)"></div>`}
    <ul class="nav-list">
      ${sec.items.map(i => `
        <li class="nav-item ${currentRoute === i.route ? "active" : ""}" data-action="navigate" data-route="${i.route}">
          <span class="nav-icon">${i.icon}</span>${esc(i.label)}
        </li>
      `).join("")}
    </ul>
  `).join("");
}

/* ---------------- Modal (detail drawer) ---------------- */

function openModal(innerHTML) {
  closeModal();
  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop";
  backdrop.id = "modal-backdrop";
  backdrop.innerHTML = `
    <div class="modal-panel" role="dialog" aria-modal="true">
      <button class="btn btn-ghost icon-btn modal-close" data-action="close-modal" aria-label="Close">✕</button>
      <div id="modal-content">${innerHTML}</div>
    </div>
  `;
  backdrop.addEventListener("click", (e) => { if (e.target === backdrop) closeModal(); });
  document.body.appendChild(backdrop);
  document.addEventListener("keydown", modalEscHandler);
}

function modalEscHandler(e) {
  if (e.key === "Escape") closeModal();
}

function closeModal() {
  const existing = document.getElementById("modal-backdrop");
  if (existing) existing.remove();
  document.removeEventListener("keydown", modalEscHandler);
}

function openSkill(id) {
  const skill = skillById(id);
  if (!skill) return;
  openModal(skillDetailHTML(skill));
}
function openProject(id) {
  const p = projectById(id);
  if (!p) return;
  openModal(projectDetailHTML(p));
}
function openService(id) {
  const s = serviceById(id);
  if (!s) return;
  openModal(serviceDetailHTML(s));
}
function openSimulation(id) {
  const s = CLIENT_SIMULATIONS.find(x => x.id === id);
  if (!s) return;
  openModal(simulationDetailHTML(s));
}

/* ---------------- Theme ---------------- */

function applyTheme() {
  document.documentElement.setAttribute("data-theme", STATE.theme);
}

/* ---------------- Mobile sidebar ---------------- */

function toggleSidebarMobile() {
  document.getElementById("sidebar").classList.toggle("open");
  document.getElementById("sidebar-overlay").classList.toggle("open");
}
function closeSidebarMobile() {
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("sidebar-overlay").classList.remove("open");
}

/* ---------------- Command palette (search) ---------------- */

function buildSearchIndex() {
  const idx = [];
  SKILLS.forEach(s => idx.push({ title: s.name, cat: "Skill", action: () => openSkill(s.id) }));
  PROJECTS.forEach(p => idx.push({ title: p.name, cat: "Project", action: () => openProject(p.id) }));
  SERVICES.forEach(s => idx.push({ title: s.name, cat: "Service", action: () => openService(s.id) }));
  RESOURCES.forEach(r => idx.push({ title: r.title, cat: "Resource", action: () => window.open(r.url, "_blank") }));
  BUSINESS_PROBLEMS.forEach(b => idx.push({ title: b.problem, cat: "Business problem", action: () => navigateTo("business-problems") }));
  CLIENT_SIMULATIONS.forEach(s => idx.push({ title: s.company, cat: "Client simulation", action: () => openSimulation(s.id) }));
  DONT_LEARN_YET.forEach(d => idx.push({ title: d.name, cat: "Don't learn yet", action: () => navigateTo("dont-learn-yet") }));
  NAV_SECTIONS.forEach(sec => sec.items.forEach(i => idx.push({ title: i.label, cat: "Page", action: () => navigateTo(i.route) })));
  return idx;
}
let SEARCH_INDEX = [];

function openPalette() {
  closePalette();
  const backdrop = document.createElement("div");
  backdrop.className = "palette-backdrop";
  backdrop.id = "palette-backdrop";
  backdrop.innerHTML = `
    <div class="palette">
      <input class="palette-input" id="palette-input" placeholder="Search skills, projects, services, pages…" autocomplete="off" />
      <div class="palette-results" id="palette-results"></div>
    </div>
  `;
  backdrop.addEventListener("click", (e) => { if (e.target === backdrop) closePalette(); });
  document.body.appendChild(backdrop);
  const input = document.getElementById("palette-input");
  input.focus();
  renderPaletteResults("");
  input.addEventListener("input", () => renderPaletteResults(input.value));
  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePalette();
    if (e.key === "Enter") {
      const first = document.querySelector(".palette-result");
      if (first) first.click();
    }
  });
}

function renderPaletteResults(q) {
  const results = document.getElementById("palette-results");
  if (!results) return;
  const query = q.trim().toLowerCase();
  const matches = (query ? SEARCH_INDEX.filter(i => i.title.toLowerCase().includes(query)) : SEARCH_INDEX.slice(0, 8)).slice(0, 30);
  if (!matches.length) {
    results.innerHTML = `<div class="palette-empty">No matches for "${esc(q)}"</div>`;
    return;
  }
  results.innerHTML = matches.map((m, idx) => `
    <div class="palette-result" data-palette-idx="${idx}">
      <span class="palette-result-title">${esc(m.title)}</span>
      <span class="palette-result-cat">${esc(m.cat)}</span>
    </div>
  `).join("");
  results.querySelectorAll(".palette-result").forEach((el, idx) => {
    el.addEventListener("click", () => { matches[idx].action(); closePalette(); });
  });
}

function closePalette() {
  const existing = document.getElementById("palette-backdrop");
  if (existing) existing.remove();
}

/* ---------------- Print ---------------- */

function printCareerOS() {
  window.print();
}

/* ---------------- Global event delegation ---------------- */

function bindGlobalEvents() {
  document.addEventListener("click", (e) => {
    const actionEl = e.target.closest("[data-action]");
    if (actionEl) {
      const action = actionEl.dataset.action;
      switch (action) {
        case "navigate": navigateTo(actionEl.dataset.route); break;
        case "open-skill": openSkill(actionEl.dataset.id); break;
        case "open-project": openProject(actionEl.dataset.id); break;
        case "open-service": openService(actionEl.dataset.id); break;
        case "open-simulation": openSimulation(actionEl.dataset.id); break;
        case "close-modal": closeModal(); break;
        case "print": printCareerOS(); break;
        case "set-theme":
          STATE.theme = actionEl.dataset.theme;
          saveState(); applyTheme(); renderRoute();
          break;
        case "delete-lead":
          STATE.leads = STATE.leads.filter(l => l.id !== actionEl.dataset.id);
          saveState(); renderRoute();
          break;
        case "delete-task": {
          const key = weekKey();
          STATE.weeklyTasks[key] = (STATE.weeklyTasks[key] || []).filter(t => t.id !== actionEl.dataset.id);
          saveState(); renderRoute();
          break;
        }
      }
      return;
    }

    if (e.target.id === "search-open-btn") { openPalette(); return; }
    if (e.target.id === "mobile-nav-btn") { toggleSidebarMobile(); return; }
    if (e.target.id === "sidebar-overlay") { closeSidebarMobile(); return; }
    if (e.target.id === "export-btn") { exportData(); return; }
    if (e.target.id === "reset-btn") {
      if (confirm("This clears all locally saved progress, notes, and leads. This can't be undone unless you've exported a backup. Continue?")) resetAllData();
      return;
    }
    if (e.target.id === "decision-submit") {
      const name = document.getElementById("decision-name").value.trim() || "Untitled";
      const answers = {};
      document.querySelectorAll("[data-decision-answer]").forEach(ta => { answers[ta.dataset.decisionAnswer] = ta.value; });
      const verdict = calculateVerdict(answers);
      STATE.decisionEntries.push({ id: "d" + Date.now(), name, answers, verdict, createdAt: Date.now() });
      saveState();
      document.getElementById("decision-result").innerHTML = `<div class="next-action"><div><div class="next-action-label">RECOMMENDATION</div>${verdictPill(verdict)}</div></div>`;
      document.getElementById("decision-history").innerHTML = decisionHistoryHTML();
      return;
    }
  });

  document.addEventListener("change", (e) => {
    if (e.target.matches("[data-skill-status]")) {
      setSkillStatus(e.target.dataset.skillStatus, e.target.value);
      showToast("Status updated.");
      // refresh underlying page behind modal if relevant
      renderRoute();
      const openId = e.target.dataset.skillStatus;
      const skill = skillById(openId);
      if (document.getElementById("modal-backdrop") && skill) {
        document.getElementById("modal-content").innerHTML = skillDetailHTML(skill);
      }
      return;
    }
    if (e.target.matches("[data-project-status]")) {
      setProjectStatus(e.target.dataset.projectStatus, e.target.value);
      showToast("Status updated.");
      renderRoute();
      const p = projectById(e.target.dataset.projectStatus);
      if (document.getElementById("modal-backdrop") && p) {
        document.getElementById("modal-content").innerHTML = projectDetailHTML(p);
      }
      return;
    }
    if (e.target.matches("[data-practice-toggle]")) {
      const id = e.target.dataset.practiceToggle;
      STATE.practiceDone[id] = e.target.checked;
      saveState();
      return;
    }
    if (e.target.matches("[data-resource-toggle]")) {
      const id = e.target.dataset.resourceToggle;
      STATE.resourceDone[id] = e.target.checked;
      saveState();
      return;
    }
    if (e.target.matches("[data-task-toggle]")) {
      const key = weekKey();
      const list = STATE.weeklyTasks[key] || [];
      const task = list.find(t => t.id === e.target.dataset.taskToggle);
      if (task) task.done = e.target.checked;
      saveState();
      return;
    }
    if (e.target.matches("[data-checkpoint]")) {
      const cpId = e.target.dataset.checkpoint;
      const field = e.target.dataset.checkpointField;
      if (!STATE.monthlyCheckpointsDone[cpId]) STATE.monthlyCheckpointsDone[cpId] = {};
      STATE.monthlyCheckpointsDone[cpId][field] = e.target.checked;
      saveState();
      e.target.closest(".checklist-item").classList.toggle("done", e.target.checked);
      return;
    }
    if (e.target.matches("[data-lead-stage]")) {
      const lead = STATE.leads.find(l => l.id === e.target.dataset.leadStage);
      if (lead) lead.stage = e.target.value;
      saveState(); renderRoute();
      return;
    }
    if (e.target.id === "hours-target") {
      STATE.weeklyHoursTarget = parseInt(e.target.value, 10);
      saveState();
      return;
    }
    if (e.target.id === "skills-cat-filter") { skillsFilterState.category = e.target.value; renderRoute(); return; }
    if (e.target.id === "skills-status-filter") { skillsFilterState.status = e.target.value; renderRoute(); return; }
    if (e.target.id === "import-input") {
      if (e.target.files[0]) importData(e.target.files[0]);
      return;
    }
  });

  document.addEventListener("input", debounce((e) => {
    if (e.target.matches("[data-note-type]")) {
      setNote(e.target.dataset.noteType, e.target.dataset.noteId, e.target.value);
      return;
    }
    if (e.target.id === "skills-search") { skillsFilterState.q = e.target.value; renderRoute(); return; }
    if (e.target.id === "bp-search") { bpQuery = e.target.value; renderRoute(); return; }
  }, 300));

  document.addEventListener("submit", (e) => {
    if (e.target.id === "lead-form") {
      e.preventDefault();
      const input = document.getElementById("lead-name");
      const name = input.value.trim();
      if (!name) return;
      STATE.leads.push({ id: "lead" + Date.now(), name, stage: "Lead", createdAt: Date.now() });
      saveState();
      renderRoute();
    }
    if (e.target.id === "task-form") {
      e.preventDefault();
      const text = document.getElementById("task-text").value.trim();
      const category = document.getElementById("task-category").value;
      if (!text) return;
      const key = weekKey();
      if (!STATE.weeklyTasks[key]) STATE.weeklyTasks[key] = [];
      STATE.weeklyTasks[key].push({ id: "task" + Date.now(), text, category, done: false });
      saveState();
      renderRoute();
    }
  });

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      openPalette();
    }
  });
}

/* ---------------- Bootstrap ---------------- */

function init() {
  applyTheme();
  SEARCH_INDEX = buildSearchIndex();
  bindGlobalEvents();

  const startRoute = (window.location.hash || "").replace("#", "") || "dashboard";
  currentRoute = ROUTES[startRoute] ? startRoute : "dashboard";
  renderRoute();

  window.addEventListener("hashchange", () => {
    const r = (window.location.hash || "").replace("#", "") || "dashboard";
    if (ROUTES[r]) { currentRoute = r; renderRoute(); }
  });
}

document.addEventListener("DOMContentLoaded", init);
