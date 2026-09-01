/* ============================================================
   HELPERS — shared lookups & small render utilities
   ============================================================ */

function esc(str) {
  if (str === undefined || str === null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function skillById(id) { return SKILLS.find(s => s.id === id); }
function projectById(id) { return PROJECTS.find(p => p.id === id); }
function serviceById(id) { return SERVICES.find(s => s.id === id); }
function stageById(id) { return ROADMAP_STAGES.find(s => s.id === id); }
function categoryById(id) { return CATEGORIES.find(c => c.id === id); }

function skillStatusTag(skillId) {
  const status = getSkillStatus(skillId);
  return `<span class="tag tag-status-${status}"><span class="tag-dot"></span>${esc(SKILL_STATUS_LABELS[status])}</span>`;
}

function projectStatusTag(projectId) {
  const status = getProjectStatus(projectId);
  const cls = status === "complete" || status === "portfolio-published" ? "strong" : (status === "not-started" ? "not-started" : "learning");
  return `<span class="tag tag-status-${cls}"><span class="tag-dot"></span>${esc(PROJECT_STATUS_LABELS[status])}</span>`;
}

function roiTag(roi) {
  return `<span class="tag tag-roi">ROI ${roi}/10</span>`;
}

function categoryTag(catId) {
  const cat = categoryById(catId);
  if (!cat) return "";
  return `<span class="tag" style="color:${cat.color}; border-color:${cat.color}">${esc(cat.name)}</span>`;
}

function statusOptions(order, labels, selected) {
  return order.map(s => `<option value="${s}" ${s === selected ? "selected" : ""}>${esc(labels[s])}</option>`).join("");
}

function skillStatusSelect(skillId) {
  return `<select class="status-select" data-skill-status="${skillId}">${statusOptions(SKILL_STATUS_ORDER, SKILL_STATUS_LABELS, getSkillStatus(skillId))}</select>`;
}

function projectStatusSelect(projectId) {
  return `<select class="status-select" data-project-status="${projectId}">${statusOptions(PROJECT_STATUS_ORDER, PROJECT_STATUS_LABELS, getProjectStatus(projectId))}</select>`;
}

function progressBar(pct) {
  return `<div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>`;
}

function nowNextPill(skill) {
  const stage = currentStage();
  if (stage.skillIds.includes(skill.id)) return `<span class="pill-now">NOW</span>`;
  const stageIdx = ROADMAP_STAGES.findIndex(s => s.id === stage.id);
  const nextStage = ROADMAP_STAGES[stageIdx + 1];
  if (nextStage && nextStage.skillIds.includes(skill.id)) return `<span class="pill-next">NEXT</span>`;
  if (skill.stage === "later") return `<span class="pill-later">LATER</span>`;
  return `<span class="pill-later">LATER</span>`;
}

function formatList(arr) {
  if (!arr || !arr.length) return "—";
  return arr.map(esc).join(", ");
}

function noteBlock(type, id, label = "Notes") {
  const val = getNote(type, id);
  return `
    <div class="note-block">
      <div class="why-q" style="margin-top:var(--sp-4)">${esc(label)}</div>
      <textarea class="note-textarea" data-note-type="${type}" data-note-id="${id}" placeholder="Add a private note…">${esc(val)}</textarea>
    </div>
  `;
}

function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}
