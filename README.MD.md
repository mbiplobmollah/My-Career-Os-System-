# MASTER PROMPT — Turn My Technical Career Roadmap Into an Interactive Career OS

You are acting as a **senior frontend engineer, UX designer, technical documentation engineer, information architect, and product designer**.

I have a large technical career roadmap covering:

* QA
* Test automation
* Programming
* Software engineering
* APIs/backend
* databases
* cloud
* DevOps
* AI
* cybersecurity
* performance engineering
* Web3/blockchain
* freelancing
* consulting
* business development
* portfolio building
* client acquisition
* income milestones

I want you to turn this roadmap into a **professional, interactive, searchable personal Career OS**.

This is NOT just a static HTML page.

It should behave like a small web application that helps me:

* understand what to learn
* understand WHY I am learning it
* track progress
* understand prerequisites
* practice
* build projects
* build portfolio evidence
* identify monetization opportunities
* prepare for freelancing
* eventually prepare for consulting

---

# 1. IMPORTANT — DO NOT CREATE ONE GIANT FILE

Do NOT put everything into one enormous:

```text
index.html
```

Create a proper maintainable project.

Use a structure similar to:

```text
career-os/
│
├── index.html
├── README.md
├── package.json
│
├── src/
│   ├── css/
│   │   ├── variables.css
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   ├── dashboard.css
│   │   ├── roadmap.css
│   │   ├── skills.css
│   │   ├── projects.css
│   │   ├── resources.css
│   │   ├── business.css
│   │   ├── print.css
│   │   └── responsive.css
│   │
│   ├── js/
│   │   ├── app.js
│   │   ├── state.js
│   │   ├── storage.js
│   │   ├── navigation.js
│   │   ├── search.js
│   │   ├── filters.js
│   │   ├── progress.js
│   │   ├── roadmap.js
│   │   ├── skills.js
│   │   ├── projects.js
│   │   ├── resources.js
│   │   └── business.js
│   │
│   └── data/
│       ├── roadmap.json
│       ├── skills.json
│       ├── projects.json
│       ├── resources.json
│       ├── services.json
│       └── milestones.json
│
├── tests/
│
└── docs/
```

You may improve this architecture if you have a better solution.

The important principle is:

**CONTENT SHOULD BE SEPARATED FROM PRESENTATION AND LOGIC.**

Do not hardcode hundreds of roadmap entries directly into HTML.

---

# 2. FIRST — ANALYZE MY ROADMAP

Before writing code, inspect the roadmap content I provide.

Identify:

* sections
* categories
* skills
* technologies
* prerequisites
* learning stages
* projects
* resources
* practice platforms
* business problems
* services
* client types
* monetization paths
* income milestones
* certifications
* freelance platforms
* decision points

Convert this information into structured data.

Do NOT lose information merely because the roadmap is large.

If something does not fit the UI immediately, put it into the appropriate JSON/data structure rather than deleting it.

---

# 3. CORE PHILOSOPHY OF THE APPLICATION

The central philosophy is:

```text
PROBLEM
↓
BUSINESS VALUE
↓
SOLUTION
↓
MINIMUM NECESSARY TECHNOLOGY
↓
LEARNING
↓
PRACTICE
↓
PROJECT
↓
PROOF
↓
SERVICE
↓
CLIENT
↓
PAYMENT
↓
REPEATABILITY
↓
CONSULTING
↓
PRODUCTIZATION
```

The application should make this relationship visible.

I do NOT want a website that says:

> Learn Python → Learn Docker → Learn AWS → Learn Kubernetes.

Instead it should help answer:

> Why am I learning Python?

> What problems can Python help me solve?

> Who has those problems?

> How can I practice?

> What can I build?

> How can I prove I know it?

> Could someone pay me for this capability?

---

# 4. DESIGN DIRECTION

Create a **premium technical dashboard**.

Think:

* modern developer tool
* engineering dashboard
* knowledge management system
* career planning application
* technical documentation platform

Avoid:

* generic corporate websites
* excessive gradients
* cheesy motivational graphics
* stock photography
* excessive animations
* unnecessary 3D
* childish gamification

Use:

* excellent typography
* clear hierarchy
* cards
* tables
* badges
* progress indicators
* timelines
* expandable sections
* side navigation
* command/search interface
* subtle animations
* dark/light themes
* responsive layout

The application should feel useful after months of use.

---

# 5. MAIN NAVIGATION

Create a sidebar/navigation system with:

```text
Dashboard

My Roadmap

Skills

Skill Tree

Projects

Practice

Resources

Business Problems

Services

Freelancing

Income

Consulting

Portfolio

Decision Framework

Don't Learn Yet

Weekly Plan

Monthly Checkpoints

Notes

Settings
```

On mobile, convert this to a mobile-friendly navigation.

---

# 6. DASHBOARD

Create a dashboard showing:

## Current Stage

Example:

> Phase 2 — Automation Engineering

## Current Focus

Example:

> Playwright + API Testing + CI/CD

## Overall Progress

Show:

* percentage
* completed skills
* projects completed
* portfolio projects
* practice hours
* milestones

## Current Month

Show:

* learning objectives
* project
* practice
* business objective
* portfolio objective

## Current Week

Show:

* tasks
* estimated hours
* completion

## Next Milestone

Example:

> Complete first client simulation.

## Current Skills

Show skill cards with:

* skill
* level
* progress
* prerequisites
* next action

## Business Readiness

Show:

* technical readiness
* portfolio readiness
* client readiness
* sales readiness

Do NOT make this misleading.

It should be a personal tracking system, not a fake certification score.

---

# 7. ROADMAP PAGE

Create a visual timeline.

Allow:

* 3-month view
* 6-month view
* 12-month view
* Year 2
* Year 3

Each stage should show:

```text
WHY
↓
SKILLS
↓
PRACTICE
↓
PROJECT
↓
PROOF
↓
MONETIZATION
```

Each roadmap item should be expandable.

---

# 8. SKILL PAGE

Every skill should have a detailed view.

Example:

# Playwright

### Why does this exist?

### What problem does it solve?

### Who has the problem?

### How was the problem solved before?

### Why wasn't that enough?

### Why use Playwright?

### Could something simpler work?

### Prerequisites

### Learning time

### Topics

### Practice exercises

### Projects

### Portfolio proof

### Monetization

### Potential services

### Potential clients

### Skill combinations

### ROI score

### Current progress

### Next action

---

# 9. THE 10 WHY QUESTIONS

Every major skill must expose these questions:

```text
1. What problem does this solve?

2. Who has this problem?

3. How was it solved before?

4. What happens if the problem isn't solved?

5. Why is this technology appropriate?

6. What happens if I don't learn it?

7. What business service can this become?

8. How do I prove I know it?

9. Can I make money with it?

10. Does it compound with my existing skills?
```

Make this a reusable UI component.

---

# 10. SKILL TREE

Create an interactive prerequisite graph.

Example:

```text
Programming
     │
     ├── Python
     │     │
     │     ├── API automation
     │     │
     │     └── AI automation
     │
     ├── JavaScript/TypeScript
     │       │
     │       └── Playwright
     │
     └── Git
             │
             └── CI/CD
```

Nodes should be clickable.

Each node shows:

* status
* prerequisites
* dependent skills
* ROI
* projects
* services

Use a lightweight approach.

Do not introduce an enormous dependency just to draw a graph unless necessary.

---

# 11. SKILL STATUS

Every skill should support:

```text
Not Started
Learning
Practicing
Built Project
Portfolio Ready
Commercially Ready
Strong
```

Allow me to change status.

Persist this locally.

---

# 12. PROGRESS TRACKING

Track:

* skill completion
* project completion
* resource completion
* practice tasks
* roadmap stages
* monthly checkpoints
* weekly goals

Store progress using:

**localStorage**

unless there is a strong reason to introduce a backend.

I want this application to work offline/local-first.

---

# 13. PROJECTS PAGE

Each project should show:

### Business Problem

### Client Situation

### Requirements

### Constraints

### Expected Outcome

### Technical Tasks

### Testing

### Deployment

### Documentation

### Portfolio Evidence

### Skills Demonstrated

### Potential Service

### Estimated Time

### Difficulty

### Status

Allow:

```text
Not Started
Planning
Building
Testing
Complete
Portfolio Published
```

---

# 14. REAL BUSINESS SIMULATIONS

Create a dedicated section called:

# Client Simulator

It should contain fictional client problems.

Examples:

### SaaS Startup

Problem:

Regression testing takes 12 hours.

### E-commerce

Problem:

Checkout failures.

### AI Startup

Problem:

AI responses are inconsistent.

### Fintech

Problem:

API reliability/security.

### Web3

Problem:

Smart contract/dApp reliability.

Each simulation should provide:

* client background
* business problem
* requirements
* constraints
* expected deliverables
* deadline
* budget
* acceptance criteria

I should be able to treat these as real consulting assignments.

---

# 15. PRACTICE PAGE

Create a practice tracker.

For each skill:

* exercise
* difficulty
* estimated time
* completed
* notes
* link/resource
* evidence

Include practical challenges rather than only courses.

---

# 16. RESOURCES PAGE

Organize resources by:

* skill
* type
* free/paid
* difficulty
* priority

Types:

* documentation
* course
* video
* book
* lab
* practice platform
* GitHub repository
* article

Show:

```text
PRIMARY RESOURCE
ALTERNATIVES
```

Do not make the UI encourage collecting hundreds of resources.

---

# 17. BUSINESS PROBLEMS PAGE

This is one of the most important pages.

Create a searchable database:

| Problem | Customer | Why Expensive | Solution | Skill | Service |
| ------- | -------- | ------------- | -------- | ----- | ------- |

Examples:

```text
Manual regression
↓
QA team
↓
Expensive employee time
↓
Automation
↓
Playwright
↓
Automation implementation
```

Another:

```text
Slow application
↓
SaaS company
↓
Customer churn
↓
Performance testing
↓
k6
↓
Performance audit
```

This page should teach me to think in **problems rather than technologies**.

---

# 18. SERVICES PAGE

Translate skills into actual services.

Example:

### Automation Audit

Problem:

Regression testing is slow.

Deliverables:

* test audit
* automation strategy
* framework recommendation
* implementation plan

Potential price:

Show the range from the roadmap.

Also include:

* target customer
* prerequisites
* portfolio proof
* related skills
* recurring opportunity

---

# 19. FREELANCING PAGE

Create sections for:

* platforms
* services
* profile strategy
* outreach
* proposal
* sales
* pricing
* client discovery
* retainers

Create a pipeline:

```text
Lead
↓
Contacted
↓
Conversation
↓
Proposal
↓
Negotiation
↓
Won
↓
Delivery
↓
Retainer
```

Allow me to track opportunities locally.

---

# 20. INCOME PAGE

Create a milestone system:

```text
Learning
↓
First $100
↓
$500
↓
$1,000/month
↓
$3,000/month
↓
$5,000+/month
↓
Consulting
↓
Productized Service
↓
Product/SaaS
```

Each milestone should show:

* capability required
* portfolio requirement
* service
* buyer
* acquisition strategy
* risks
* next milestone

Do not imply guaranteed income.

---

# 21. CONSULTING PAGE

Show the path:

```text
Freelance
↓
Specialized Service
↓
Repeatable Service
↓
Retainer
↓
Consulting
↓
Productized Service
↓
SaaS/Product
```

For each stage show:

* skills
* business capability
* sales capability
* portfolio requirements
* client requirements
* risks

---

# 22. PORTFOLIO PAGE

Show my selected portfolio projects.

Each project should have:

* business problem
* solution
* architecture
* technology
* results
* screenshots/demo
* GitHub link
* case study
* service demonstrated

Make the portfolio focused on:

> **Evidence of solving real problems.**

---

# 23. DECISION FRAMEWORK

Create an interactive decision checklist.

When I encounter a new technology, I should be able to enter it and answer:

```text
What problem does it solve?

Who has the problem?

How is it solved today?

Why isn't that enough?

Why is this technology better?

Could something simpler work?

Do businesses pay for this?

How competitive is it?

How long will it take to learn?

What are the prerequisites?

Can I build something real?

Can I demonstrate it?

Can I sell a service?

Does it compound with my skills?

Is it durable?

What is the opportunity cost?

What happens if I don't learn it?
```

Then calculate/display:

* ROI
* priority
* recommended status

Possible result:

```text
LEARN NOW
LEARN LATER
OPTIONAL
IGNORE FOR NOW
```

This does not need to be mathematically perfect.

The purpose is to make me think critically.

---

# 24. DON'T LEARN YET

Create a prominent page:

# Don't Learn Yet

This should contain technologies that I should deliberately postpone.

Each item must explain:

### Why not now?

### What should I learn first?

### What condition makes this worth learning?

Example:

```text
Kubernetes

Why not now:
Docker/cloud fundamentals aren't strong enough.

Learn first:
Linux
Docker
Networking
Cloud deployment

Trigger:
Once I can deploy and troubleshoot containerized applications.
```

This is designed to prevent technology rabbit holes.

---

# 25. WEEKLY PLANNER

Create a weekly planner.

Support:

* 10 hours/week
* 15 hours/week
* 20 hours/week

Categories:

```text
Learning
Coding
Practice
Project
Portfolio
Business
Outreach
Review
```

Allow tasks to be checked off.

---

# 26. MONTHLY CHECKPOINT

Every month should have:

### I should know

### I should be able to build

### I should be able to troubleshoot

### I should have published

### I should have practiced

### I should be able to sell

### I should NOT move forward until...

Allow me to mark checkpoints complete.

---

# 27. SEARCH

Create global search.

Search across:

* skills
* technologies
* projects
* resources
* business problems
* services
* milestones
* roadmap

Support keyboard shortcut:

```text
Ctrl/Cmd + K
```

Display search results with category labels.

---

# 28. FILTERING

Allow filtering by:

* stage
* skill category
* difficulty
* ROI
* status
* monetization
* prerequisite
* free/paid
* project type

---

# 29. NOTES

Allow notes on:

* skills
* projects
* resources
* roadmap stages
* business problems

Use localStorage.

Do not create a backend unless required.

---

# 30. DARK MODE / LIGHT MODE

Provide both.

Remember the selected theme.

Use accessible contrast.

---

# 31. RESPONSIVE DESIGN

It must work properly on:

* desktop
* laptop
* tablet
* mobile

Do not simply shrink the desktop design.

Create appropriate mobile layouts.

---

# 32. ACCESSIBILITY

Use:

* semantic HTML
* keyboard navigation
* visible focus states
* accessible labels
* appropriate contrast
* reduced motion support
* ARIA only where appropriate

---

# 33. PERFORMANCE

Keep the application lightweight.

Avoid unnecessary libraries.

Do not introduce React/Vue/etc. automatically.

If vanilla HTML/CSS/JS is sufficient, use it.

If the project genuinely benefits from a framework, explain why before introducing it.

---

# 34. DATA ARCHITECTURE

Keep roadmap content in structured JSON.

For example:

```json
{
  "id": "playwright",
  "name": "Playwright",
  "category": "automation",
  "status": "learning",
  "roi": 9,
  "problem": "...",
  "whoHasProblem": ["SaaS", "ecommerce"],
  "whyLearn": "...",
  "prerequisites": ["javascript", "http"],
  "projects": ["project-automation-01"],
  "services": ["automation-audit"],
  "monetization": {
    "direct": true,
    "indirect": true
  }
}
```

Create appropriate schemas for:

* skills
* projects
* resources
* services
* milestones
* problems
* roadmap stages

---

# 35. LOCAL STORAGE

Persist:

* progress
* statuses
* notes
* weekly tasks
* monthly checkpoints
* freelance leads
* selected theme
* preferences

Create an export/import feature.

Allow:

### Export My Data

Download JSON.

### Import My Data

Restore progress.

This ensures I don't lose years of progress.

---

# 36. PDF / PRINT VERSION

This is extremely important.

Create a professional:

```text
print.css
```

The web application should have a clean printable version.

When I choose:

**Print / Export PDF**

the result should produce a professional document.

Optimize:

* page breaks
* typography
* tables
* headings
* margins
* headers/footers
* avoiding split cards
* avoiding awkward blank pages
* hiding interactive controls

Do NOT simply screenshot the website.

The printed document should look intentionally designed for PDF.

---

# 37. PDF GENERATION

If practical, create a script using a browser automation tool such as **Playwright** to generate the PDF.

For example:

```text
npm run pdf
```

should:

1. Start the application if necessary.
2. Open the print-friendly route.
3. Wait for content.
4. Generate the PDF.
5. Save it into:

```text
dist/career-roadmap.pdf
```

Make this reproducible.

---

# 38. TESTING

Because I am a QA engineer, make the project itself demonstrate good QA practices.

Include tests for:

* navigation
* search
* filters
* progress tracking
* localStorage
* import/export
* theme switching
* responsive behavior
* PDF generation

Use Playwright where appropriate.

Create:

```text
npm test
```

and:

```text
npm run test:e2e
```

if appropriate.

---

# 39. CI/CD

Create a simple GitHub Actions workflow.

It should:

```text
Push
↓
Install dependencies
↓
Lint/check
↓
Run tests
↓
Build
↓
Generate artifact
```

If deployment is appropriate, configure it for a simple static hosting platform.

Do not overengineer this.

---

# 40. DOCUMENTATION

Create a strong README explaining:

* project purpose
* architecture
* installation
* development
* build
* testing
* PDF generation
* deployment
* data structure
* customization
* backup/export

Also document major architectural decisions.

---

# 41. SECURITY

Since this may eventually contain personal information, avoid sending data anywhere unnecessarily.

Default to local storage.

Do not add:

* analytics
* tracking
* unnecessary third-party services
* external APIs

unless explicitly needed.

Explain any external dependency.

---

# 42. UX PRINCIPLE — SHOW THE NEXT ACTION

The application should not overwhelm me with information.

Every major page should answer:

> **What should I do next?**

Examples:

```text
Current skill:
Playwright

Next action:
Complete API + browser integration project.

Current project:
Automation Framework

Next action:
Implement authentication test flow.

Current business goal:
First freelance client

Next action:
Create automation audit service page.
```

Always surface the next actionable step.

---

# 43. PREVENT INFORMATION OVERLOAD

The roadmap is large.

Do NOT show everything at once.

Use:

* collapsible sections
* progressive disclosure
* tabs
* filters
* search
* "current focus"
* "up next"
* "later"

The UI should distinguish:

### NOW

### NEXT

### LATER

### OPTIONAL

### DON'T LEARN YET

---

# 44. VISUALIZE THE CAREER PATH

Create a visual path:

```text
QA
 ↓
Automation
 ↓
Quality Engineering
 ↓
Software Engineering
 ↓
AI / Security / Cloud / Performance
 ↓
Specialization
 ↓
Freelancing
 ↓
Consulting
 ↓
Productized Service
 ↓
Product / SaaS
```

Allow me to click each stage.

Show:

* skills
* problems
* projects
* services
* income opportunities

---

# 45. BUSINESS OUTCOME VISUALIZATION

For every major skill, show:

```text
Skill
↓
Capability
↓
Problem solved
↓
Business outcome
↓
Service
↓
Potential buyer
```

Example:

```text
Playwright
↓
Automated browser testing
↓
Reduce manual regression
↓
Faster releases / fewer escaped bugs
↓
Test automation implementation
↓
SaaS companies
```

This should be one of the defining features of the application.

---

# 46. NO FAKE GAMIFICATION

Do NOT add:

* meaningless XP
* fake badges
* streak pressure
* childish animations

If you use gamification, it must reflect actual progress.

For example:

```text
Skill demonstrated
Project completed
Portfolio published
First client contacted
First client won
```

These are meaningful milestones.

---

# 47. VISUAL STYLE

Use a professional color system.

Suggested concept:

### Dark

* deep charcoal/navy background
* subtle borders
* white/gray text
* one primary accent
* green for completed
* amber for warning
* red for blocked
* blue/purple for information

### Light

* off-white background
* dark text
* subtle gray borders
* restrained accent colors

Do not use excessive gradients.

---

# 48. ICONS

Use an icon library only if useful.

Keep icons consistent.

Do not use random emoji everywhere.

---

# 49. CONTENT QUALITY

Do not rewrite the roadmap into generic motivational language.

Preserve useful technical detail.

If the original roadmap says:

> "Learn API testing because businesses need reliable APIs."

The application should preserve the explanation of:

* HTTP
* status codes
* authentication
* authorization
* schema validation
* negative testing
* contract testing
* automation
* CI integration

Likewise, preserve the WHY and monetization information.

---

# 50. DO NOT INVENT MARKET DATA

If the roadmap contains market information:

* preserve the source
* preserve the date
* preserve citations

Do not fabricate salaries, freelance prices, job counts, or market demand.

If data is outdated, flag it.

---

# 51. TECHNICAL QUALITY STANDARD

Write production-quality code.

Use:

* reusable components
* clear naming
* modular JavaScript
* CSS variables
* consistent spacing
* maintainable structure
* comments only where useful
* error handling
* empty states
* loading states where necessary

Avoid:

* giant functions
* duplicated markup
* inline styles everywhere
* magic numbers
* unnecessary dependencies
* inaccessible controls

---

# 52. DEVELOPMENT PROCESS

Do NOT try to generate the entire project blindly in one step.

Work in phases.

## PHASE 1 — Architecture

Inspect the roadmap.

Create:

* project structure
* data model
* page structure
* component strategy
* technical decisions

Then explain the plan briefly.

## PHASE 2 — Foundation

Build:

* HTML structure
* CSS system
* navigation
* responsive layout
* theme

## PHASE 3 — Data

Convert roadmap content into structured data.

## PHASE 4 — Core Features

Build:

* dashboard
* roadmap
* skills
* skill tree
* projects
* resources
* business problems

## PHASE 5 — Career/Business

Build:

* services
* freelancing
* income
* consulting
* portfolio
* decision framework
* don't-learn-yet

## PHASE 6 — Productivity

Build:

* search
* filtering
* notes
* progress
* weekly planning
* monthly checkpoints
* import/export

## PHASE 7 — PDF

Build:

* print stylesheet
* PDF route
* automated PDF generation

## PHASE 8 — QA

Write:

* unit tests where useful
* E2E tests
* accessibility checks
* responsive checks

## PHASE 9 — CI/CD

Create GitHub Actions.

## PHASE 10 — POLISH

Improve:

* UX
* performance
* accessibility
* visual consistency
* empty states
* error handling

---

# 53. IMPORTANT — WORK WITH THE FILESYSTEM

You are working in a real project environment.

Before creating files:

1. Inspect the existing repository.
2. Determine what already exists.
3. Do not overwrite unrelated work.
4. Reuse useful existing configuration.
5. Create files incrementally.
6. Test after major changes.
7. Fix errors instead of merely reporting them.

Do not just give me code in chat.

Actually create and modify the project files where your environment permits.

---

# 54. IF THE CONTENT IS TOO LARGE

Do NOT truncate the roadmap.

Do NOT say:

> "The content is too long."

Instead:

1. Break the content into data files.
2. Generate sections incrementally.
3. Keep IDs consistent.
4. Reference data rather than duplicating it.
5. Continue until the full roadmap is represented.

For example:

```text
skills-01.json
skills-02.json
skills-03.json
```

is acceptable if necessary.

---

# 55. FINAL ACCEPTANCE CRITERIA

Do not consider the project complete until:

### Content

* Full roadmap represented
* WHY questions included
* Business problems included
* Skills included
* Projects included
* Resources included
* Monetization included

### Functionality

* Navigation works
* Search works
* Filters work
* Progress works
* Notes work
* Import/export works
* Theme works
* Responsive layout works

### Career logic

* Prerequisites work
* Skill tree works
* NOW/NEXT/LATER works
* Don't Learn Yet works
* Business Problem → Skill → Service connection works

### Business

* Services
* Freelancing
* Consulting
* Income milestones
* Portfolio

### PDF

* Print layout works
* PDF generation works
* Page breaks are sensible

### QA

* Tests exist
* Tests pass
* No major console errors
* No broken navigation
* No obvious accessibility problems

### Code quality

* Modular
* Maintainable
* Documented
* No unnecessary dependencies

---

# 56. FINAL OUTPUT

When the application is complete, give me:

## 1. Project structure

Show the final structure.

## 2. How to run

Exact commands.

## 3. How to test

Exact commands.

## 4. How to generate PDF

Exact command.

## 5. How to deploy

Simple deployment instructions.

## 6. What was implemented

Short summary.

## 7. Known limitations

Be honest.

## 8. Recommended next improvements

Prioritized list.

---

# MOST IMPORTANT PRODUCT PRINCIPLE

This is not simply a career-planning website.

It is my **Career Operating System**.

It should help me repeatedly move through:

```text
UNDERSTAND
↓
LEARN
↓
PRACTICE
↓
BUILD
↓
PROVE
↓
SOLVE
↓
SELL
↓
DELIVER
↓
REPEAT
↓
SPECIALIZE
↓
CONSULT
↓
PRODUCTIZE
```

The application should constantly remind me:

> **Do not learn technology merely because it exists.**

Instead:

> **Find the problem first. Understand the business value. Learn the minimum technology necessary. Build something real. Prove it. Then determine whether someone will pay for the capability.**

Build the application around that philosophy.
