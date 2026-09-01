/* ============================================================
   PAGES — one render function per route.
   Each returns an HTML string; app.js mounts it into #main.
   Interactions are wired via event delegation in app.js.
   ============================================================ */

/* ---------------- DASHBOARD ---------------- */

function renderDashboard() {
  const prog = overallProgress();
  const stage = currentStage();
  const nextSkill = suggestedNextSkill();
  const readiness = businessReadiness();

  const currentSkills = SKILLS.filter(s => stage.skillIds.includes(s.id));

  return `
    <div class="page">
      <div class="page-header">
        <div>
          <div class="page-eyebrow">Dashboard</div>
          <h1>${esc(stage.title)}</h1>
          <p class="page-sub">${esc(stage.why)}</p>
        </div>
        <button class="btn btn-ghost no-print" data-action="print"><span class="mono">⎙</span> Print / export PDF</button>
      </div>

      <div class="next-action">
        <div>
          <div class="next-action-label">NEXT ACTION</div>
          ${nextSkill ? `<strong>${esc(nextSkill.name)}</strong> — ${esc(nextActionForSkill(nextSkill))}` : "Pick a skill from the roadmap to focus on."}
        </div>
        ${nextSkill ? `<button class="btn btn-primary" style="margin-left:auto" data-action="open-skill" data-id="${nextSkill.id}">Open skill →</button>` : ""}
      </div>

      <div class="card-grid" style="margin-bottom:var(--sp-8); grid-template-columns:repeat(auto-fit,minmax(160px,1fr));">
        <div class="panel stat-block"><div class="stat-num">${prog.pct}%</div><div class="stat-label">OVERALL PROGRESS</div>${progressBar(prog.pct)}</div>
        <div class="panel stat-block"><div class="stat-num">${prog.completedSkills}/${prog.totalSkills}</div><div class="stat-label">SKILLS PORTFOLIO+</div></div>
        <div class="panel stat-block"><div class="stat-num">${prog.projectsComplete}/${prog.totalProjects}</div><div class="stat-label">PROJECTS COMPLETE</div></div>
        <div class="panel stat-block"><div class="stat-num">${prog.portfolioProjects}</div><div class="stat-label">PORTFOLIO PUBLISHED</div></div>
      </div>

      <div class="section-title"><h2>Current focus — ${esc(stage.title)}</h2><span class="count">${currentSkills.length} skills</span></div>
      <div class="card-grid" style="margin-bottom:var(--sp-8)">
        ${currentSkills.map(skillCardHTML).join("")}
      </div>

      <div class="section-title"><h2>Business readiness</h2></div>
      <p class="page-sub" style="margin-bottom:var(--sp-4)">A personal tracking signal based on your own status updates and logged leads — not a certification or guarantee of income.</p>
      <div class="card-grid" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); margin-bottom:var(--sp-8)">
        ${readinessBlock("Technical readiness", readiness.technical)}
        ${readinessBlock("Portfolio readiness", readiness.portfolio)}
        ${readinessBlock("Client readiness", readiness.clientReady)}
        ${readinessBlock("Sales readiness", readiness.sales)}
      </div>

      <div class="section-title"><h2>Next milestone</h2></div>
      ${milestoneCallout()}
    </div>
  `;
}

function readinessBlock(label, pct) {
  return `<div class="panel"><div class="stat-label">${esc(label).toUpperCase()}</div><div class="stat-num" style="font-size:var(--fs-xl); margin:6px 0">${pct}%</div>${progressBar(pct)}</div>`;
}

function milestoneCallout() {
  const wonOrLater = STATE.leads.some(l => l.stage === "Won");
  const m = INCOME_MILESTONES.find(m => m.id === (wonOrLater ? "m2" : "m1"));
  return `
    <div class="panel">
      <div class="card-title">${esc(m.label)}</div>
      <p style="margin-top:var(--sp-2)">${esc(m.capability)}</p>
      <div class="flow-chain">
        <span class="flow-step">Buyer: ${esc(m.buyer)}</span>
        <span class="flow-arrow">→</span>
        <span class="flow-step">Service: ${esc(m.service)}</span>
      </div>
      <button class="btn btn-ghost" data-action="navigate" data-route="income">See full income path →</button>
    </div>
  `;
}

function skillCardHTML(skill) {
  const status = getSkillStatus(skill.id);
  const color = getComputedColorForStatus(status);
  return `
    <div class="card status-accent" style="--status-color:${color}" data-action="open-skill" data-id="${skill.id}">
      <div class="card-title">${esc(skill.name)}</div>
      <div class="card-meta">${skillStatusTag(skill.id)}${roiTag(skill.roi)}${nowNextPill(skill)}</div>
      <div class="card-body">${esc(nextActionForSkill(skill))}</div>
      <div class="card-footer">
        <span class="stat-label">${skillProgressPct(skill)}% COMPLETE</span>
        ${progressBar(skillProgressPct(skill))}
      </div>
    </div>
  `;
}

function getComputedColorForStatus(status) {
  const map = {
    "not-started": "var(--border-strong)",
    "learning": "var(--info)",
    "practicing": "var(--warning)",
    "built-project": "var(--purple)",
    "portfolio-ready": "var(--accent)",
    "commercially-ready": "var(--success)",
    "strong": "var(--success)",
  };
  return map[status] || "var(--border)";
}

/* ---------------- ROADMAP ---------------- */

function renderRoadmap() {
  return `
    <div class="page">
      <div class="page-header">
        <div>
          <div class="page-eyebrow">My Roadmap</div>
          <h1>The path, phase by phase</h1>
          <p class="page-sub">Each stage follows the same chain: why → skills → practice → project → proof → monetization. Click a skill to see it in full.</p>
        </div>
      </div>
      <div class="timeline">
        ${ROADMAP_STAGES.map((stage, i) => roadmapStageHTML(stage, i === ROADMAP_STAGES.length - 1)).join("")}
      </div>
    </div>
  `;
}

function roadmapStageHTML(stage, isLast) {
  const skills = stage.skillIds.map(skillById).filter(Boolean);
  const isCurrent = currentStage().id === stage.id;
  return `
    <div class="timeline-stage print-section">
      <div class="timeline-rail">
        <div class="timeline-node" style="${isCurrent ? "background:var(--accent)" : ""}"></div>
        ${isLast ? "" : `<div class="timeline-line"></div>`}
      </div>
      <div class="timeline-content">
        <div class="panel">
          <div class="card-meta">
            <span class="tag mono">${esc(stage.months)}</span>
            ${isCurrent ? `<span class="pill-now">CURRENT</span>` : ""}
          </div>
          <h3>${esc(stage.title)}</h3>
          <p><strong style="color:var(--text-primary)">Why: </strong>${esc(stage.why)}</p>
          <div class="flow-chain">
            <span class="flow-step">Skills</span><span class="flow-arrow">→</span>
            <span class="flow-step">Practice</span><span class="flow-arrow">→</span>
            <span class="flow-step">Project</span><span class="flow-arrow">→</span>
            <span class="flow-step">Proof</span><span class="flow-arrow">→</span>
            <span class="flow-step">Monetization</span>
          </div>
          <div class="card-grid" style="margin-top:var(--sp-3)">
            ${skills.map(skillCardHTML).join("")}
          </div>
          <table class="data-table" style="margin-top:var(--sp-4)">
            <tr><td style="width:120px"><strong>Practice</strong></td><td>${esc(stage.practice)}</td></tr>
            <tr><td><strong>Project</strong></td><td>${esc(stage.project)}</td></tr>
            <tr><td><strong>Proof</strong></td><td>${esc(stage.proof)}</td></tr>
            <tr><td><strong>Monetization</strong></td><td>${esc(stage.monetization)}</td></tr>
          </table>
        </div>
      </div>
    </div>
  `;
}

/* ---------------- SKILLS ---------------- */

function renderSkills(filterState = {}) {
  const cat = filterState.category || "all";
  const status = filterState.status || "all";
  const q = (filterState.q || "").toLowerCase();

  const filtered = SKILLS.filter(s => {
    if (cat !== "all" && s.category !== cat) return false;
    if (status !== "all" && getSkillStatus(s.id) !== status) return false;
    if (q && !s.name.toLowerCase().includes(q)) return false;
    return true;
  });

  return `
    <div class="page">
      <div class="page-header">
        <div>
          <div class="page-eyebrow">Skills</div>
          <h1>Skill library</h1>
          <p class="page-sub">Every skill answers the 10 Why questions before you spend a single hour learning it.</p>
        </div>
      </div>
      <div class="filter-bar">
        <input type="search" id="skills-search" placeholder="Search skills…" value="${esc(filterState.q || "")}" />
        <select id="skills-cat-filter">
          <option value="all">All categories</option>
          ${CATEGORIES.map(c => `<option value="${c.id}" ${c.id === cat ? "selected" : ""}>${esc(c.name)}</option>`).join("")}
        </select>
        <select id="skills-status-filter">
          <option value="all">All statuses</option>
          ${SKILL_STATUS_ORDER.map(s => `<option value="${s}" ${s === status ? "selected" : ""}>${esc(SKILL_STATUS_LABELS[s])}</option>`).join("")}
        </select>
      </div>
      <div class="section-title"><span class="count">${filtered.length} of ${SKILLS.length}</span></div>
      ${filtered.length ? `<div class="card-grid">${filtered.map(skillCardHTML).join("")}</div>` : emptyState("No skills match", "Try clearing a filter or search term.")}
    </div>
  `;
}

function emptyState(title, body) {
  return `<div class="empty-state"><h3>${esc(title)}</h3><p>${esc(body)}</p></div>`;
}

function skillDetailHTML(skill) {
  const why = skill.why;
  const whyPairs = [
    ["What problem does it solve?", why.problem],
    ["Who has this problem?", (why.whoHasProblem || []).join("; ")],
    ["How was it solved before?", why.priorSolution],
    ["What happens if the problem isn't solved?", why.whyNotEnough],
    ["Why is this technology appropriate?", why.whyThisTech],
    ["Could something simpler work?", why.simplerAlternative],
    ["What happens if I don't learn it?", why.ifNotLearned],
    ["What business service can this become?", why.businessService],
    ["How do I prove I know it?", why.proof],
    ["Does it compound with my existing skills?", why.compounds],
  ];
  const prereqs = (skill.prerequisites || []).map(skillById).filter(Boolean);
  const dependents = (skill.dependents || []).map(skillById).filter(Boolean);
  const projects = (skill.projectIds || []).map(projectById).filter(Boolean);
  const services = (skill.serviceIds || []).map(serviceById).filter(Boolean);
  const practice = (skill.practiceIds || []).map(id => PRACTICE.find(p => p.id === id)).filter(Boolean);
  const resources = (skill.resourceIds || []).map(id => RESOURCES.find(r => r.id === id)).filter(Boolean);

  return `
    <div class="card-meta">${categoryTag(skill.category)}${roiTag(skill.roi)}${nowNextPill(skill)}</div>
    <h2 style="margin-top:var(--sp-2)">${esc(skill.name)}</h2>
    <div class="card-meta">
      ${skillStatusSelect(skill.id)}
      <span class="stat-label">${esc(skill.learningTimeHours)}h estimated</span>
    </div>
    ${progressBar(skillProgressPct(skill))}

    <div class="next-action" style="margin-top:var(--sp-5)">
      <div><div class="next-action-label">NEXT ACTION</div>${esc(nextActionForSkill(skill))}</div>
    </div>

    <h3 style="margin-top:var(--sp-6)">The 10 Why questions</h3>
    <div class="why-grid">
      ${whyPairs.map(([q, a]) => `<div class="why-item"><div class="why-q">${esc(q)}</div><div class="why-a">${esc(a || "—")}</div></div>`).join("")}
      <div class="why-item"><div class="why-q">Can I make money with it?</div><div class="why-a">${why.monetizable ? "Yes — see linked services below." : "Not directly — it's an enabling skill for others that are."}</div></div>
    </div>

    <h3 style="margin-top:var(--sp-6)">Prerequisites</h3>
    ${prereqs.length ? `<div class="card-meta">${prereqs.map(p => `<span class="tag" data-action="open-skill" data-id="${p.id}" style="cursor:pointer">${esc(p.name)}</span>`).join("")}</div>` : `<p>None — this is a starting point.</p>`}

    <h3 style="margin-top:var(--sp-6)">Topics</h3>
    <ul>${(skill.topics || []).map(t => `<li>${esc(t)}</li>`).join("")}</ul>

    <h3 style="margin-top:var(--sp-6)">Practice exercises</h3>
    ${practice.length ? `<table class="data-table"><tr><th>Exercise</th><th>Difficulty</th><th>Hours</th></tr>${practice.map(p => `<tr><td>${esc(p.exercise)}</td><td>${esc(p.difficulty)}</td><td>${esc(p.estimatedHours)}</td></tr>`).join("")}</table>` : `<p>No practice exercises logged yet.</p>`}

    <h3 style="margin-top:var(--sp-6)">Projects</h3>
    ${projects.length ? projects.map(p => `<div class="card" data-action="open-project" data-id="${p.id}" style="margin-bottom:var(--sp-2)"><div class="card-title">${esc(p.name)}</div><div class="card-body">${esc(p.businessProblem)}</div></div>`).join("") : `<p>No project linked yet.</p>`}

    <h3 style="margin-top:var(--sp-6)">Portfolio proof</h3>
    <p>${esc(why.proof)}</p>

    <h3 style="margin-top:var(--sp-6)">Monetization &amp; potential services</h3>
    ${services.length ? services.map(s => `<div class="card" data-action="open-service" data-id="${s.id}" style="margin-bottom:var(--sp-2)"><div class="card-title">${esc(s.name)}</div><div class="card-body">${esc(s.priceRange)}</div></div>`).join("") : `<p>No direct service yet — this skill supports other services indirectly.</p>`}

    <h3 style="margin-top:var(--sp-6)">Skill combinations</h3>
    ${dependents.length ? `<div class="card-meta">${dependents.map(d => `<span class="tag" data-action="open-skill" data-id="${d.id}" style="cursor:pointer">${esc(d.name)}</span>`).join("")}</div>` : `<p>Nothing currently depends on this.</p>`}

    <h3 style="margin-top:var(--sp-6)">Resources</h3>
    ${resources.length ? `<ul>${resources.map(r => `<li><a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.title)}</a> — <span class="stat-label">${esc(r.priority === "primary" ? "PRIMARY" : "ALTERNATIVE")}, ${esc(r.cost)}</span></li>`).join("")}</ul>` : `<p>No resources logged yet.</p>`}

    ${noteBlock("skill", skill.id)}
  `;
}

/* ---------------- SKILL TREE ---------------- */

function renderSkillTree() {
  const columns = [
    { title: "Foundations", ids: ["programming-fundamentals", "git-github"] },
    { title: "Core capability", ids: ["api-testing", "playwright", "ci-cd", "python-automation"] },
    { title: "Systems depth", ids: ["cloud-fundamentals", "docker-fundamentals", "performance-testing", "security-testing-basics"] },
    { title: "Specialization", ids: ["ai-fundamentals", "ai-eval-testing"] },
    { title: "Optional / later", ids: ["web3-fundamentals"] },
  ];
  return `
    <div class="page">
      <div class="page-header">
        <div>
          <div class="page-eyebrow">Skill Tree</div>
          <h1>Prerequisite map</h1>
          <p class="page-sub">Click any node to open its detail. Left-to-right roughly tracks dependency order, not calendar time.</p>
        </div>
      </div>
      <div class="tree-wrap">
        <div class="tree-columns">
          ${columns.map(col => `
            <div class="tree-col">
              <div class="stat-label">${esc(col.title).toUpperCase()}</div>
              ${col.ids.map(id => skillById(id)).filter(Boolean).map(s => `
                <div class="tree-node" style="border-left-color:${getComputedColorForStatus(getSkillStatus(s.id))}" data-action="open-skill" data-id="${s.id}">
                  <div class="tree-node-name">${esc(s.name)}</div>
                  <div class="tree-node-meta">${esc(SKILL_STATUS_LABELS[getSkillStatus(s.id)])} · ROI ${s.roi}</div>
                </div>
              `).join("")}
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

/* ---------------- PROJECTS ---------------- */

function renderProjects() {
  return `
    <div class="page">
      <div class="page-header">
        <div>
          <div class="page-eyebrow">Projects</div>
          <h1>Projects</h1>
          <p class="page-sub">Each project is framed as a real business problem, not a tutorial exercise.</p>
        </div>
      </div>
      <div class="card-grid">
        ${PROJECTS.map(p => `
          <div class="card" data-action="open-project" data-id="${p.id}">
            <div class="card-title">${esc(p.name)}</div>
            <div class="card-meta">${projectStatusTag(p.id)}<span class="tag">${esc(p.difficulty)}</span><span class="tag mono">${esc(p.estimatedHours)}h</span></div>
            <div class="card-body">${esc(p.businessProblem)}</div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function projectDetailHTML(p) {
  const stage = stageById(p.stageId);
  const service = p.potentialService ? serviceById(p.potentialService) : null;
  const skills = (p.skillsDemonstrated || []).map(skillById).filter(Boolean);
  const fields = [
    ["Client situation", p.clientSituation],
    ["Requirements", (p.requirements || []).join(" · ")],
    ["Constraints", (p.constraints || []).join(" · ")],
    ["Expected outcome", p.expectedOutcome],
    ["Technical tasks", (p.technicalTasks || []).join(" · ")],
    ["Testing", p.testing],
    ["Deployment", p.deployment],
    ["Documentation", p.documentation],
    ["Portfolio evidence", p.portfolioEvidence],
  ];
  return `
    <div class="card-meta">${stage ? `<span class="tag mono">${esc(stage.title)}</span>` : ""}<span class="tag">${esc(p.difficulty)}</span></div>
    <h2 style="margin-top:var(--sp-2)">${esc(p.name)}</h2>
    <div class="card-meta">${projectStatusSelect(p.id)}<span class="stat-label">${esc(p.estimatedHours)}h estimated</span></div>

    <div class="next-action" style="margin-top:var(--sp-5)">
      <div><div class="next-action-label">BUSINESS PROBLEM</div>${esc(p.businessProblem)}</div>
    </div>

    <table class="data-table" style="margin-top:var(--sp-5)">
      ${fields.map(([k, v]) => `<tr><td style="width:180px"><strong>${esc(k)}</strong></td><td>${esc(v)}</td></tr>`).join("")}
    </table>

    <h3 style="margin-top:var(--sp-6)">Skills demonstrated</h3>
    <div class="card-meta">${skills.map(s => `<span class="tag" data-action="open-skill" data-id="${s.id}" style="cursor:pointer">${esc(s.name)}</span>`).join("") || "—"}</div>

    <h3 style="margin-top:var(--sp-6)">Potential service</h3>
    ${service ? `<div class="card" data-action="open-service" data-id="${service.id}"><div class="card-title">${esc(service.name)}</div><div class="card-body">${esc(service.priceRange)}</div></div>` : `<p>Not tied to a specific service yet.</p>`}

    ${noteBlock("project", p.id)}
  `;
}

/* ---------------- PRACTICE ---------------- */

function renderPractice() {
  return `
    <div class="page">
      <div class="page-header">
        <div>
          <div class="page-eyebrow">Practice</div>
          <h1>Practice tracker</h1>
          <p class="page-sub">Hands-on exercises, not courses. Check off what you've actually done.</p>
        </div>
      </div>
      <table class="data-table">
        <tr><th></th><th>Exercise</th><th>Skill</th><th>Difficulty</th><th>Hours</th><th>Resource</th></tr>
        ${PRACTICE.map(p => {
          const skill = skillById(p.skillId);
          const res = RESOURCES.find(r => r.id === p.resourceId);
          const done = !!STATE.practiceDone[p.id];
          return `
            <tr>
              <td><input type="checkbox" data-practice-toggle="${p.id}" ${done ? "checked" : ""} /></td>
              <td><strong>${esc(p.exercise)}</strong></td>
              <td>${skill ? `<span class="tag" data-action="open-skill" data-id="${skill.id}" style="cursor:pointer">${esc(skill.name)}</span>` : "—"}</td>
              <td>${esc(p.difficulty)}</td>
              <td>${esc(p.estimatedHours)}</td>
              <td>${res ? `<a href="${esc(res.url)}" target="_blank" rel="noopener">${esc(res.title)}</a>` : "—"}</td>
            </tr>
          `;
        }).join("")}
      </table>
    </div>
  `;
}

/* ---------------- RESOURCES ---------------- */

function renderResources() {
  return `
    <div class="page">
      <div class="page-header">
        <div>
          <div class="page-eyebrow">Resources</div>
          <h1>Resource library</h1>
          <p class="page-sub">One primary resource per skill, plus alternatives — deliberately kept short so it doesn't become a collecting habit.</p>
        </div>
      </div>
      <table class="data-table">
        <tr><th></th><th>Title</th><th>Skill</th><th>Type</th><th>Cost</th><th>Priority</th></tr>
        ${RESOURCES.map(r => {
          const skill = skillById(r.skillId);
          const done = !!STATE.resourceDone[r.id];
          return `
            <tr>
              <td><input type="checkbox" data-resource-toggle="${r.id}" ${done ? "checked" : ""} /></td>
              <td><a href="${esc(r.url)}" target="_blank" rel="noopener"><strong>${esc(r.title)}</strong></a></td>
              <td>${skill ? `<span class="tag" data-action="open-skill" data-id="${skill.id}" style="cursor:pointer">${esc(skill.name)}</span>` : "—"}</td>
              <td>${esc(r.type)}</td>
              <td>${esc(r.cost)}</td>
              <td><span class="tag ${r.priority === "primary" ? "tag-status-strong" : ""}">${esc(r.priority)}</span></td>
            </tr>
          `;
        }).join("")}
      </table>
    </div>
  `;
}

/* ---------------- BUSINESS PROBLEMS ---------------- */

function renderBusinessProblems(q = "") {
  const filtered = BUSINESS_PROBLEMS.filter(b => !q || (b.problem + b.customer + b.solution).toLowerCase().includes(q.toLowerCase()));
  return `
    <div class="page">
      <div class="page-header">
        <div>
          <div class="page-eyebrow">Business Problems</div>
          <h1>Think in problems, not technologies</h1>
          <p class="page-sub">Every skill on this roadmap exists because it solves one of these.</p>
        </div>
      </div>
      <div class="filter-bar"><input type="search" id="bp-search" placeholder="Search problems…" value="${esc(q)}" /></div>
      <table class="data-table">
        <tr><th>Problem</th><th>Customer</th><th>Why expensive</th><th>Solution</th><th>Skill</th><th>Service</th></tr>
        ${filtered.map(b => {
          const skill = skillById(b.skillId);
          const service = b.serviceId ? serviceById(b.serviceId) : null;
          return `
            <tr>
              <td><strong>${esc(b.problem)}</strong></td>
              <td>${esc(b.customer)}</td>
              <td>${esc(b.whyExpensive)}</td>
              <td>${esc(b.solution)}</td>
              <td>${skill ? `<span class="tag" data-action="open-skill" data-id="${skill.id}" style="cursor:pointer">${esc(skill.name)}</span>` : "—"}</td>
              <td>${service ? `<span class="tag" data-action="open-service" data-id="${service.id}" style="cursor:pointer">${esc(service.name)}</span>` : "—"}</td>
            </tr>
          `;
        }).join("")}
      </table>

      <h2 style="margin-top:var(--sp-8)">Client Simulator</h2>
      <p class="page-sub">Treat these as real assignments — background, requirements, constraints, deadline, and acceptance criteria included.</p>
      <div class="card-grid">
        ${CLIENT_SIMULATIONS.map(s => `
          <div class="card" data-action="open-simulation" data-id="${s.id}">
            <div class="card-title">${esc(s.company)}</div>
            <div class="card-body">${esc(s.problem)}</div>
            <div class="card-footer"><span class="stat-label">${esc(s.deadline)}</span><span class="stat-label">${esc(s.budget)}</span></div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function simulationDetailHTML(s) {
  const service = s.relatedService ? serviceById(s.relatedService) : null;
  const skills = (s.relatedSkills || []).map(skillById).filter(Boolean);
  return `
    <div class="page-eyebrow">Client Simulator</div>
    <h2>${esc(s.company)}</h2>
    <div class="next-action" style="margin-top:var(--sp-3)"><div><div class="next-action-label">PROBLEM</div>${esc(s.problem)}</div></div>
    <table class="data-table" style="margin-top:var(--sp-5)">
      <tr><td style="width:160px"><strong>Requirements</strong></td><td>${(s.requirements || []).map(esc).join("<br>")}</td></tr>
      <tr><td><strong>Constraints</strong></td><td>${(s.constraints || []).map(esc).join("<br>")}</td></tr>
      <tr><td><strong>Deliverables</strong></td><td>${(s.deliverables || []).map(esc).join("<br>")}</td></tr>
      <tr><td><strong>Deadline</strong></td><td>${esc(s.deadline)}</td></tr>
      <tr><td><strong>Budget</strong></td><td>${esc(s.budget)}</td></tr>
      <tr><td><strong>Acceptance criteria</strong></td><td>${(s.acceptanceCriteria || []).map(esc).join("<br>")}</td></tr>
    </table>
    <h3 style="margin-top:var(--sp-6)">Related skills</h3>
    <div class="card-meta">${skills.map(sk => `<span class="tag" data-action="open-skill" data-id="${sk.id}" style="cursor:pointer">${esc(sk.name)}</span>`).join("") || "—"}</div>
    <h3 style="margin-top:var(--sp-6)">Related service</h3>
    ${service ? `<div class="card" data-action="open-service" data-id="${service.id}"><div class="card-title">${esc(service.name)}</div></div>` : "<p>—</p>"}
    ${noteBlock("simulation", s.id)}
  `;
}

/* ---------------- SERVICES ---------------- */

function renderServices() {
  return `
    <div class="page">
      <div class="page-header">
        <div>
          <div class="page-eyebrow">Services</div>
          <h1>Skills, translated into services</h1>
          <p class="page-sub">Prices shown are a fictional starting range for practice — validate against your own market before quoting a real client.</p>
        </div>
      </div>
      <div class="card-grid">
        ${SERVICES.map(s => `
          <div class="card" data-action="open-service" data-id="${s.id}">
            <div class="card-title">${esc(s.name)}</div>
            <div class="card-body">${esc(s.problem)}</div>
            <div class="card-footer"><span class="tag mono">${esc(s.priceRange)}</span></div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function serviceDetailHTML(s) {
  const skills = (s.relatedSkills || []).map(skillById).filter(Boolean);
  const proof = (s.portfolioProof || []).map(projectById).filter(Boolean);
  return `
    <div class="page-eyebrow">Service</div>
    <h2>${esc(s.name)}</h2>
    <div class="next-action" style="margin-top:var(--sp-3)"><div><div class="next-action-label">PROBLEM SOLVED</div>${esc(s.problem)}</div></div>
    <h3 style="margin-top:var(--sp-6)">Deliverables</h3>
    <ul>${(s.deliverables || []).map(d => `<li>${esc(d)}</li>`).join("")}</ul>
    <table class="data-table" style="margin-top:var(--sp-4)">
      <tr><td style="width:160px"><strong>Price range</strong></td><td>${esc(s.priceRange)}</td></tr>
      <tr><td><strong>Target customer</strong></td><td>${esc(s.targetCustomer)}</td></tr>
      <tr><td><strong>Recurring opportunity</strong></td><td>${esc(s.recurring)}</td></tr>
    </table>
    <h3 style="margin-top:var(--sp-6)">Prerequisite skills</h3>
    <div class="card-meta">${skills.map(sk => `<span class="tag" data-action="open-skill" data-id="${sk.id}" style="cursor:pointer">${esc(sk.name)}</span>`).join("") || "—"}</div>
    <h3 style="margin-top:var(--sp-6)">Portfolio proof</h3>
    ${proof.length ? proof.map(p => `<div class="card" data-action="open-project" data-id="${p.id}"><div class="card-title">${esc(p.name)}</div></div>`).join("") : "<p>Build the linked project to create proof for this service.</p>"}
  `;
}

/* ---------------- FREELANCING ---------------- */

function renderFreelancing() {
  const leadsByStage = {};
  PIPELINE_STAGES.forEach(s => leadsByStage[s] = []);
  STATE.leads.forEach(l => { if (leadsByStage[l.stage]) leadsByStage[l.stage].push(l); });

  return `
    <div class="page">
      <div class="page-header">
        <div>
          <div class="page-eyebrow">Freelancing</div>
          <h1>Freelancing</h1>
          <p class="page-sub">Track real or practice leads through a simple pipeline. Stored locally only.</p>
        </div>
      </div>

      <h3>Platforms</h3>
      <table class="data-table" style="margin-bottom:var(--sp-6)">
        <tr><th>Platform</th><th>Notes</th></tr>
        ${FREELANCE_PLATFORMS.map(p => `<tr><td><strong>${esc(p.name)}</strong></td><td>${esc(p.notes)}</td></tr>`).join("")}
      </table>

      <div class="section-title"><h3>Pipeline</h3></div>
      <form id="lead-form" class="filter-bar" style="align-items:center">
        <input type="text" id="lead-name" placeholder="Lead / opportunity name" required style="min-width:220px" />
        <button class="btn btn-primary" type="submit">Add lead</button>
      </form>
      <div class="pipeline-board">
        ${PIPELINE_STAGES.map(stage => `
          <div class="pipeline-col" data-drop-stage="${esc(stage)}">
            <div class="pipeline-col-title">${esc(stage).toUpperCase()} · ${leadsByStage[stage].length}</div>
            ${leadsByStage[stage].map(l => `
              <div class="pipeline-lead" draggable="true" data-lead-id="${l.id}">
                <div>${esc(l.name)}</div>
                <div class="card-meta" style="margin-top:6px">
                  <select class="status-select" data-lead-stage="${l.id}">
                    ${PIPELINE_STAGES.map(s2 => `<option value="${esc(s2)}" ${s2 === l.stage ? "selected" : ""}>${esc(s2)}</option>`).join("")}
                  </select>
                  <button class="btn btn-ghost btn-sm" data-action="delete-lead" data-id="${l.id}">✕</button>
                </div>
              </div>
            `).join("")}
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

/* ---------------- INCOME ---------------- */

function renderIncome() {
  return `
    <div class="page">
      <div class="page-header">
        <div>
          <div class="page-eyebrow">Income</div>
          <h1>Income milestones</h1>
          <p class="page-sub">A path, not a promise — nothing here implies guaranteed income.</p>
        </div>
      </div>
      <div class="timeline">
        ${INCOME_MILESTONES.map((m, i) => `
          <div class="timeline-stage">
            <div class="timeline-rail">
              <div class="timeline-node"></div>
              ${i === INCOME_MILESTONES.length - 1 ? "" : `<div class="timeline-line"></div>`}
            </div>
            <div class="timeline-content">
              <div class="panel">
                <h3>${esc(m.label)}</h3>
                <p>${esc(m.capability)}</p>
                <table class="data-table">
                  <tr><td style="width:160px"><strong>Portfolio requirement</strong></td><td>${esc(m.portfolio)}</td></tr>
                  <tr><td><strong>Service</strong></td><td>${esc(m.service)}</td></tr>
                  <tr><td><strong>Buyer</strong></td><td>${esc(m.buyer)}</td></tr>
                  <tr><td><strong>Acquisition</strong></td><td>${esc(m.acquisition)}</td></tr>
                  <tr><td><strong>Risks</strong></td><td>${esc(m.risks)}</td></tr>
                </table>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

/* ---------------- CONSULTING ---------------- */

function renderConsulting() {
  return `
    <div class="page">
      <div class="page-header">
        <div>
          <div class="page-eyebrow">Consulting</div>
          <h1>Freelance → Consulting → Productized → Product</h1>
        </div>
      </div>
      <table class="data-table">
        <tr><th>Stage</th><th>Skills</th><th>Business capability</th><th>Sales capability</th><th>Portfolio requirement</th><th>Risks</th></tr>
        ${CONSULTING_STAGES.map(c => `
          <tr>
            <td><strong>${esc(c.stage)}</strong></td>
            <td>${esc(c.skills)}</td>
            <td>${esc(c.business)}</td>
            <td>${esc(c.sales)}</td>
            <td>${esc(c.portfolio)}</td>
            <td>${esc(c.risks)}</td>
          </tr>
        `).join("")}
      </table>
    </div>
  `;
}

/* ---------------- PORTFOLIO ---------------- */

function renderPortfolio() {
  const published = PROJECTS.filter(p => getProjectStatus(p.id) === "portfolio-published");
  const candidates = PROJECTS.filter(p => getProjectStatus(p.id) !== "portfolio-published");
  return `
    <div class="page">
      <div class="page-header">
        <div>
          <div class="page-eyebrow">Portfolio</div>
          <h1>Evidence of solving real problems</h1>
          <p class="page-sub">Mark a project "Portfolio published" on its detail view to move it up here.</p>
        </div>
      </div>
      <div class="section-title"><h2>Published</h2><span class="count">${published.length}</span></div>
      ${published.length ? `<div class="card-grid" style="margin-bottom:var(--sp-8)">${published.map(p => `
        <div class="card" data-action="open-project" data-id="${p.id}">
          <div class="card-title">${esc(p.name)}</div>
          <div class="card-body">${esc(p.businessProblem)}</div>
          <div class="card-footer"><span class="stat-label">${esc(p.potentialService ? serviceById(p.potentialService)?.name || "" : "")}</span></div>
        </div>
      `).join("")}</div>` : emptyState("Nothing published yet", "Complete a project and mark it portfolio-published to feature it here.")}

      <div class="section-title"><h2>Candidates</h2><span class="count">${candidates.length}</span></div>
      <div class="card-grid">
        ${candidates.map(p => `
          <div class="card" data-action="open-project" data-id="${p.id}">
            <div class="card-title">${esc(p.name)}</div>
            ${projectStatusTag(p.id)}
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

/* ---------------- DECISION FRAMEWORK ---------------- */

function renderDecisionFramework() {
  return `
    <div class="page">
      <div class="page-header">
        <div>
          <div class="page-eyebrow">Decision Framework</div>
          <h1>Should I learn this?</h1>
          <p class="page-sub">Not mathematically precise — the point is to make you think critically before committing calendar time.</p>
        </div>
      </div>
      <div class="panel">
        <input type="text" id="decision-name" placeholder="Technology or skill you're evaluating" style="width:100%; margin-bottom:var(--sp-4)" />
        <div class="why-grid">
          ${DECISION_QUESTIONS.map(q => `
            <div class="why-item">
              <div class="why-q">${esc(q.text)}</div>
              <textarea class="note-textarea" style="min-height:50px" data-decision-answer="${q.id}"></textarea>
            </div>
          `).join("")}
        </div>
        <button class="btn btn-primary" id="decision-submit" style="margin-top:var(--sp-4)">Calculate recommendation</button>
        <div id="decision-result" style="margin-top:var(--sp-4)"></div>
      </div>

      <div class="section-title" style="margin-top:var(--sp-8)"><h2>Past evaluations</h2></div>
      <div id="decision-history">${decisionHistoryHTML()}</div>
    </div>
  `;
}

function decisionHistoryHTML() {
  if (!STATE.decisionEntries.length) return emptyState("No evaluations yet", "Run one above to start building a record of your own reasoning.");
  return `<table class="data-table"><tr><th>Technology</th><th>Verdict</th><th>Date</th></tr>${STATE.decisionEntries.slice().reverse().map(e => `
    <tr><td><strong>${esc(e.name)}</strong></td><td>${verdictPill(e.verdict)}</td><td>${esc(new Date(e.createdAt).toLocaleDateString())}</td></tr>
  `).join("")}</table>`;
}

function verdictPill(v) {
  const map = { "LEARN NOW": "pill-now", "LEARN LATER": "pill-next", "OPTIONAL": "pill-optional", "IGNORE FOR NOW": "pill-dont" };
  return `<span class="${map[v] || "pill-later"}">${esc(v)}</span>`;
}

function calculateVerdict(answers) {
  // Lightweight heuristic scoring — deliberately simple, not "mathematically perfect".
  const positiveSignals = ["q7", "q11", "q12", "q13", "q14", "q15"]; // pay / build / demonstrate / sell / compounds / durable
  let score = 0;
  positiveSignals.forEach(id => { if ((answers[id] || "").trim().length > 3) score += 1; });
  const filledTotal = Object.values(answers).filter(a => (a || "").trim().length > 0).length;
  if (filledTotal < 6) return "OPTIONAL";
  if (score >= 5) return "LEARN NOW";
  if (score >= 3) return "LEARN LATER";
  if (score >= 1) return "OPTIONAL";
  return "IGNORE FOR NOW";
}

/* ---------------- DON'T LEARN YET ---------------- */

function renderDontLearnYet() {
  return `
    <div class="page">
      <div class="page-header">
        <div>
          <div class="page-eyebrow">Don't Learn Yet</div>
          <h1>Deliberately postponed</h1>
          <p class="page-sub">Designed to prevent technology rabbit holes — not a judgment on these technologies' value.</p>
        </div>
      </div>
      <div class="card-grid">
        ${DONT_LEARN_YET.map(d => `
          <div class="panel">
            <div class="card-meta"><span class="pill-dont">DON'T LEARN YET</span></div>
            <h3 style="margin-top:var(--sp-2)">${esc(d.name)}</h3>
            <p><strong style="color:var(--text-primary)">Why not now: </strong>${esc(d.whyNotNow)}</p>
            <p><strong style="color:var(--text-primary)">Learn first: </strong>${(d.learnFirst || []).join(", ")}</p>
            <p><strong style="color:var(--text-primary)">Trigger: </strong>${esc(d.trigger)}</p>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

/* ---------------- WEEKLY PLANNER ---------------- */

function weekKey() {
  const stage = currentStage();
  return `${stage.id}`;
}

function renderWeeklyPlan() {
  const key = weekKey();
  const tasks = STATE.weeklyTasks[key] || [];
  const categories = ["Learning", "Coding", "Practice", "Project", "Portfolio", "Business", "Outreach", "Review"];
  return `
    <div class="page">
      <div class="page-header">
        <div>
          <div class="page-eyebrow">Weekly Plan</div>
          <h1>This week</h1>
          <p class="page-sub">Aligned to your current stage: ${esc(currentStage().title)}.</p>
        </div>
      </div>
      <div class="filter-bar">
        <span class="stat-label">HOURS TARGET</span>
        <select id="hours-target">
          ${[10, 15, 20].map(h => `<option value="${h}" ${STATE.weeklyHoursTarget === h ? "selected" : ""}>${h} hrs/week</option>`).join("")}
        </select>
      </div>
      <form id="task-form" class="filter-bar" style="align-items:center">
        <input type="text" id="task-text" placeholder="Task description" required style="min-width:200px" />
        <select id="task-category">${categories.map(c => `<option value="${c}">${c}</option>`).join("")}</select>
        <button class="btn btn-primary" type="submit">Add task</button>
      </form>
      ${tasks.length ? `<div class="panel">${tasks.map(t => `
        <div class="checklist-item ${t.done ? "done" : ""}">
          <input type="checkbox" data-task-toggle="${t.id}" ${t.done ? "checked" : ""} />
          <div class="checklist-text" style="flex:1"><span class="tag" style="margin-right:8px">${esc(t.category)}</span>${esc(t.text)}</div>
          <button class="btn btn-ghost btn-sm" data-action="delete-task" data-id="${t.id}">✕</button>
        </div>
      `).join("")}</div>` : emptyState("No tasks yet", "Add tasks above to plan this week.")}
    </div>
  `;
}

/* ---------------- MONTHLY CHECKPOINTS ---------------- */

function renderMonthlyCheckpoints() {
  return `
    <div class="page">
      <div class="page-header">
        <div>
          <div class="page-eyebrow">Monthly Checkpoints</div>
          <h1>Don't move forward until…</h1>
        </div>
      </div>
      ${MONTHLY_CHECKPOINTS.map(cp => monthlyCheckpointHTML(cp)).join("")}
    </div>
  `;
}

function monthlyCheckpointHTML(cp) {
  const stage = stageById(cp.stageId);
  const state = STATE.monthlyCheckpointsDone[cp.id] || {};
  const rows = [
    ["know", "I should know", cp.know],
    ["build", "I should be able to build", cp.build],
    ["troubleshoot", "I should be able to troubleshoot", cp.troubleshoot],
    ["published", "I should have published", cp.published],
    ["practiced", "I should have practiced", cp.practiced],
    ["sell", "I should be able to sell", cp.sell],
  ];
  return `
    <div class="panel print-section" style="margin-bottom:var(--sp-5)">
      <h3>${esc(stage?.title || cp.id)}</h3>
      ${rows.map(([key, label, value]) => `
        <div class="checklist-item ${state[key] ? "done" : ""}">
          <input type="checkbox" data-checkpoint="${cp.id}" data-checkpoint-field="${key}" ${state[key] ? "checked" : ""} />
          <div class="checklist-text"><strong style="color:var(--text-primary)">${esc(label)}: </strong>${esc(value)}</div>
        </div>
      `).join("")}
      <div class="next-action" style="margin-top:var(--sp-4)">
        <div><div class="next-action-label">DON'T PROCEED UNTIL</div>${esc(cp.dontProceedUntil)}</div>
      </div>
    </div>
  `;
}

/* ---------------- NOTES ---------------- */

function renderNotes() {
  const notes = allNotes();
  const labelFor = (type, id) => {
    if (type === "skill") return skillById(id)?.name;
    if (type === "project") return projectById(id)?.name;
    if (type === "simulation") return CLIENT_SIMULATIONS.find(s => s.id === id)?.company;
    return id;
  };
  return `
    <div class="page">
      <div class="page-header">
        <div>
          <div class="page-eyebrow">Notes</div>
          <h1>All notes</h1>
          <p class="page-sub">Notes live on individual skills, projects, and simulations — this page collects them in one place. Stored locally only.</p>
        </div>
      </div>
      ${notes.length ? notes.map(n => `
        <div class="panel" style="margin-bottom:var(--sp-3)" data-action="open-${n.type}" data-id="${n.id}" role="button" tabindex="0">
          <div class="card-meta"><span class="tag">${esc(n.type)}</span><strong>${esc(labelFor(n.type, n.id) || n.id)}</strong></div>
          <p>${esc(n.text)}</p>
        </div>
      `).join("") : emptyState("No notes yet", "Add a note from any skill, project, or client simulation page.")}
    </div>
  `;
}

/* ---------------- SETTINGS ---------------- */

function renderSettings() {
  return `
    <div class="page">
      <div class="page-header">
        <div>
          <div class="page-eyebrow">Settings</div>
          <h1>Settings</h1>
        </div>
      </div>

      <div class="panel" style="margin-bottom:var(--sp-5)">
        <h3>Theme</h3>
        <div class="theme-toggle">
          <button class="btn ${STATE.theme === 'dark' ? 'btn-primary' : ''}" data-action="set-theme" data-theme="dark">Dark</button>
          <button class="btn ${STATE.theme === 'light' ? 'btn-primary' : ''}" data-action="set-theme" data-theme="light">Light</button>
        </div>
      </div>

      <div class="panel" style="margin-bottom:var(--sp-5)">
        <h3>Your data</h3>
        <p>Everything is stored locally in this browser via <code>localStorage</code>. Nothing is sent anywhere.</p>
        <div class="card-meta">
          <button class="btn" id="export-btn">Export my data</button>
          <label class="btn" style="cursor:pointer">Import my data<input type="file" id="import-input" accept="application/json" style="display:none" /></label>
          <button class="btn btn-danger" id="reset-btn">Reset all data</button>
        </div>
      </div>

      <div class="panel">
        <h3>About this app</h3>
        <p>Career OS is local-first: your roadmap, progress, notes, and leads never leave this browser unless you export them yourself. See the README for architecture details and known limitations.</p>
      </div>
    </div>
  `;
}
