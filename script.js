/* =====================================================================
   SITE LOGIC
   Reads everything from SITE_DATA (js/data.js) and renders it into
   the page. You shouldn't need to edit this file to update content —
   edit js/data.js instead. This file is only for changing behavior.
   ===================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  renderHero();
  renderExperience();
  renderGitHubDrivenSections(); // fetches repos ONCE, feeds both Skills and Projects
  renderLinkedInPosts();
  renderContact();
  renderFooter();
  initTabHighlighting();

  // YOUTUBE EMBED LOGIC — see full instructions below.
  renderYouTube();
});

/* ---------------------------------------------------------------
   HERO / ID BADGE
   --------------------------------------------------------------- */
function renderHero() {
  const { identity, resumeUrl, links } = SITE_DATA;

  document.title = `${identity.fullName} — ${identity.title}`;

  setText("badgeName", identity.fullName);
  setText("badgeTitle", identity.title);
  setText("badgeStatus", identity.status);
  setText("heroTagline", identity.tagline);
  setText("badgeRef", identity.refNo || "");
  setText("badgeLocation", identity.location || "");

  const photo = document.getElementById("badgePhoto");
  if (photo && identity.photo) photo.src = identity.photo;

  const resumeBtn = document.getElementById("resumeBtn");
  if (resumeBtn) resumeBtn.href = resumeUrl;

  // Social links row — only renders links that are actually filled in
  const socialRow = document.getElementById("socialRow");
  const items = [
    ["GitHub", links.github],
    ["LinkedIn", links.linkedin],
    ["YouTube", links.youtube],
    ["HackerRank", links.hackerrank],
    ["ORCID", links.orcid],
    ["ResearchGate", links.researchgate],
    ["Twitter / X", links.twitter],
    ["Website", links.website]
  ].filter(([, url]) => url);

  socialRow.innerHTML = items
    .map(([label, url]) => `<a href="${url}" target="_blank" rel="noopener">${label} ↗</a>`)
    .join("");
}

/* ---------------------------------------------------------------
   SKILLS — static fallback renderer.
   Only used if the live GitHub fetch fails or is switched off; see
   renderGitHubDrivenSections() below for the live version, which
   derives skills from your actual GitHub languages/topics instead.
   --------------------------------------------------------------- */
function renderSkillsFromData() {
  const container = document.getElementById("skillGroups");
  container.innerHTML = SITE_DATA.skillGroups
    .map(group => `
      <div class="skill-group">
        <h3>${group.group}</h3>
        <ul>
          ${group.skills.map(skill => `<li>${skill}</li>`).join("")}
        </ul>
      </div>
    `)
    .join("");
}

/* ---------------------------------------------------------------
   GITHUB-DRIVEN: SKILLS + PROJECTS
   Fetches your public repos ONE time and uses that single response
   to power both sections:
     - Projects: your most recently updated repos, as cards
     - Skills: auto-derived from each repo's primary language and
       topics (the little tags you can set on a GitHub repo under
       "About" → gear icon → Topics), ranked by frequency.
   This means skills stay in sync with what you actually build,
   with no manual list to maintain.
   --------------------------------------------------------------- */
async function renderGitHubDrivenSections() {
  const { github } = SITE_DATA;

  if (!github.useLiveGitHub) {
    renderSkillsFromData();
    renderProjectsFromManualList();
    return;
  }

  const projectsStatus = document.getElementById("projectsStatus");
  projectsStatus.textContent = "Loading latest repositories from GitHub…";

  try {
    // Fetch more repos than we'll display, so the skills breakdown
    // reflects a broader slice of activity than just the project cards.
    const url = `https://api.github.com/users/${github.username}/repos?sort=${github.sortBy}&per_page=100`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);
    const repos = await res.json();

    if (!Array.isArray(repos) || repos.length === 0) {
      projectsStatus.textContent = "No public repositories found yet.";
      renderSkillsFromData();
      return;
    }

    projectsStatus.textContent = "";
    renderProjectsFromRepos(repos.slice(0, github.repoCount));
    renderSkillsFromRepos(repos);
  } catch (err) {
    // Falls back gracefully if the API call fails (offline, rate-limited,
    // or wrong GitHub username in data.js)
    console.warn("Could not load GitHub data live, showing fallbacks instead:", err);
    projectsStatus.textContent = "Showing a saved project list (live GitHub data unavailable).";
    renderProjectsFromManualList();
    renderSkillsFromData();
  }
}

function renderSkillsFromRepos(repos) {
  const container = document.getElementById("skillGroups");

  // Count how many repos use each primary language
  const languageCounts = {};
  repos.forEach(repo => {
    if (!repo.language) return;
    languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
  });

  // Count how many repos are tagged with each topic
  const topicCounts = {};
  repos.forEach(repo => {
    (repo.topics || []).forEach(topic => {
      topicCounts[topic] = (topicCounts[topic] || 0) + 1;
    });
  });

  const topLanguages = Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  const topTopics = Object.entries(topicCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const groups = [];

  if (topLanguages.length) {
    groups.push({
      title: "Languages",
      subtitle: "by repos on GitHub",
      items: topLanguages.map(([name, count]) => `${name} · ${count} repo${count > 1 ? "s" : ""}`)
    });
  }

  if (topTopics.length) {
    groups.push({
      title: "Topics & Tools",
      subtitle: "tagged on GitHub repos",
      items: topTopics.map(([name]) => name)
    });
  }

  if (!groups.length) {
    // No languages or topics detected at all (e.g. empty/new account) — fall back
    renderSkillsFromData();
    return;
  }

  container.innerHTML = groups
    .map(group => `
      <div class="skill-group">
        <h3>${group.title} <span class="skill-group-subtitle">— ${group.subtitle}</span></h3>
        <ul>
          ${group.items.map(item => `<li>${item}</li>`).join("")}
        </ul>
      </div>
    `)
    .join("");
}

/* ---------------------------------------------------------------
   EXPERIENCE TIMELINE
   --------------------------------------------------------------- */
function renderExperience() {
  const container = document.getElementById("timeline");
  container.innerHTML = SITE_DATA.experience
    .map(item => `
      <div class="timeline-item">
        <p class="timeline-period">${item.period}</p>
        <h3 class="timeline-role">${item.role}</h3>
        <p class="timeline-org">${item.org}</p>
        <p class="timeline-summary">${item.summary}</p>
      </div>
    `)
    .join("");
}

/* ---------------------------------------------------------------
   PROJECTS — rendering helpers. The actual fetch happens once in
   renderGitHubDrivenSections() above (shared with Skills); these
   two functions just paint the results.
   --------------------------------------------------------------- */
function renderProjectsFromRepos(repos) {
  const grid = document.getElementById("projectGrid");
  grid.innerHTML = repos
    .map(repo => projectCardHTML({
      name: repo.name,
      description: repo.description || "No description provided.",
      url: repo.html_url,
      tags: [repo.language, repo.stargazers_count ? `★ ${repo.stargazers_count}` : null].filter(Boolean)
    }))
    .join("");
}

function renderProjectsFromManualList() {
  const grid = document.getElementById("projectGrid");
  grid.innerHTML = SITE_DATA.manualProjects.map(projectCardHTML).join("");
}

function projectCardHTML(project) {
  return `
    <div class="project-card">
      <h3>${project.name}</h3>
      <p>${project.description}</p>
      <div class="project-tags">
        ${(project.tags || []).map(tag => `<span class="project-tag">${tag}</span>`).join("")}
      </div>
      <a class="project-link" href="${project.url}" target="_blank" rel="noopener">View on GitHub ↗</a>
    </div>
  `;
}

/* ---------------------------------------------------------------
   LINKEDIN POSTS
   Renders a live embed if embedSrc is filled in, otherwise a
   simple text card using fallbackText. See the instructions in
   js/data.js for how to grab a real embed URL from LinkedIn.
   --------------------------------------------------------------- */
function renderLinkedInPosts() {
  const grid = document.getElementById("postGrid");
  grid.innerHTML = SITE_DATA.linkedinPosts
    .map(post => {
      const body = post.embedSrc
        ? `<iframe src="${post.embedSrc}" loading="lazy" title="LinkedIn post"></iframe>`
        : `
          <div class="post-card-text">
            <p class="post-date">${post.date}</p>
            <p>${post.fallbackText}</p>
            <a class="project-link" href="${post.url}" target="_blank" rel="noopener">View on LinkedIn ↗</a>
          </div>
        `;
      return `<div class="post-card">${body}</div>`;
    })
    .join("");
}

/* ---------------------------------------------------------------
   YOUTUBE EMBED LOGIC
   ---------------------------------------------------------------
   This function is inert unless SITE_DATA.youtube.enabled is true
   in js/data.js. It looks for an element with id="videoWrap" —
   which only exists once you uncomment the <section id="video">
   block in index.html. Until then, this simply does nothing.

   TO ACTIVATE:
     1. In data.js: set youtube.enabled = true and youtube.videoId
     2. In index.html: uncomment the <section id="video"> block
     3. In index.html: uncomment the "Video" nav tab
   Nothing in this function needs to change.
   --------------------------------------------------------------- */
function renderYouTube() {
  const { youtube } = SITE_DATA;
  const wrap = document.getElementById("videoWrap");

  if (!youtube.enabled || !youtube.videoId || !wrap) return;

  setText("videoTitle", youtube.sectionTitle || "Featured Video");
  wrap.innerHTML = `
    <iframe
      src="https://www.youtube.com/embed/${youtube.videoId}"
      title="${youtube.sectionTitle || "Featured video"}"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      loading="lazy">
    </iframe>
  `;
}

/* ---------------------------------------------------------------
   CONTACT
   --------------------------------------------------------------- */
function renderContact() {
  const { identity } = SITE_DATA;
  setText("contactEmail", identity.email);
  const emailBtn = document.getElementById("emailBtn");
  if (emailBtn) emailBtn.href = `mailto:${identity.email}`;
}

/* ---------------------------------------------------------------
   FOOTER
   --------------------------------------------------------------- */
function renderFooter() {
  const year = new Date().getFullYear();
  setText("footerNote", `© ${year} ${SITE_DATA.identity.fullName} — ${SITE_DATA.footerNote}`);
}

/* ---------------------------------------------------------------
   TAB NAV — highlights the tab for the section currently in view
   --------------------------------------------------------------- */
function initTabHighlighting() {
  const tabs = Array.from(document.querySelectorAll(".tab"));
  const sections = tabs
    .map(tab => document.querySelector(tab.getAttribute("href")))
    .filter(Boolean);

  if (!("IntersectionObserver" in window) || sections.length === 0) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        tabs.forEach(tab => tab.classList.toggle("active", tab.getAttribute("href") === id));
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach(section => observer.observe(section));
}

/* ---------------------------------------------------------------
   SMALL HELPER
   --------------------------------------------------------------- */
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}
