/* ============================================================
   script.js — builds the page from data.js and pulls the
   project list + language counts live from GitHub.
   No libraries, no build step.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- icons (inline SVG, 24x24) ---------- */
  var S = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
          'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
  var BOX = '<rect x="3" y="3" width="18" height="18" rx="4"/>';
  var TX = function (t, size) {
    return '<text x="12" y="12" text-anchor="middle" dominant-baseline="central" ' +
           'font-family="Inter, Arial, sans-serif" font-size="' + size + '" font-weight="700" ' +
           'stroke="none" fill="currentColor">' + t + '</text>';
  };

  var ICONS = {
    linkedin: S + BOX + TX("in", 8.5) + "</svg>",
    github: S + '<circle cx="6" cy="6" r="2.4"/><circle cx="6" cy="18" r="2.4"/>' +
            '<circle cx="18" cy="6.5" r="2.4"/><path d="M6 8.4v7.2"/>' +
            '<path d="M18 8.9v1.6a4 4 0 0 1-4 4H9"/></svg>',
    youtube: S + '<rect x="2.5" y="5" width="19" height="14" rx="4"/>' +
             '<path d="M10.5 9.4l4.6 2.6-4.6 2.6z"/></svg>',
    email: S + '<rect x="2.5" y="4.5" width="19" height="15" rx="3"/>' +
           '<path d="M3.5 7.5l7.4 5.1a2 2 0 0 0 2.2 0l7.4-5.1"/></svg>',
    hackerrank: S + BOX + '<path d="M8.5 9.5l2.6 2.5-2.6 2.5"/><path d="M13 15h3"/></svg>',
    orcid: S + '<circle cx="12" cy="12" r="9"/>' + TX("iD", 7.5) + "</svg>",
    researchgate: S + BOX + TX("RG", 8) + "</svg>",
    link: S + '<path d="M10 13.5a4 4 0 0 0 5.7 0l2.6-2.6a4 4 0 1 0-5.7-5.7l-1.2 1.2"/>' +
          '<path d="M14 10.5a4 4 0 0 0-5.7 0l-2.6 2.6a4 4 0 1 0 5.7 5.7l1.2-1.2"/></svg>'
  };

  /* ---------- tiny helpers ---------- */
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) { node.className = className; }
    if (text !== undefined && text !== null) { node.textContent = text; }
    return node;
  }

  function byId(id) { return document.getElementById(id); }

  function isExternal(url) { return /^https?:/i.test(url); }

  function iconFor(name) { return ICONS[name] || ICONS.link; }

  function safeList(value) { return Array.isArray(value) ? value : []; }

  if (typeof DATA === "undefined") {
    console.error("data.js did not load — check that it sits next to index.html.");
    return;
  }

  /* ---------- intro ---------- */
  function renderIntro() {
    document.title = DATA.name + " — " + DATA.role;

    byId("intro-name").textContent = DATA.name;
    byId("intro-role").textContent = DATA.role;
    byId("intro-location").textContent = DATA.location || "";
    byId("intro-tagline").textContent = DATA.tagline || "";

    var topbarName = document.querySelector(".topbar-name");
    if (topbarName) { topbarName.textContent = DATA.name; }

    var intro = document.querySelector(".intro");
    if (intro) { intro.classList.add("fade-in"); }

    // Actions
    var actions = byId("intro-actions");
    var email = findLink("email");
    if (email) {
      var mail = el("a", "button", "Email me");
      mail.href = email.url;
      actions.appendChild(mail);
    }
    if (DATA.resumeUrl) {
      var cv = el("a", "button secondary", "Download CV");
      cv.href = DATA.resumeUrl;
      cv.setAttribute("download", "");
      actions.appendChild(cv);
    }
    var gh = findLink("github");
    if (gh) {
      var ghBtn = el("a", "button secondary", "View GitHub");
      ghBtn.href = gh.url;
      ghBtn.target = "_blank";
      ghBtn.rel = "noopener";
      actions.appendChild(ghBtn);
    }

    // About paragraphs
    var about = byId("about-body");
    safeList(DATA.about).forEach(function (para) {
      about.appendChild(el("p", null, para));
    });

    // Contact line
    var contact = byId("contact-line");
    if (contact) {
      contact.textContent =
        "The quickest way to reach me is email. I'm also on the platforms below — " +
        "happy to talk about roles, research or anything on this page.";
    }

    // Footer
    byId("footer-name").textContent =
      "© " + new Date().getFullYear() + " " + DATA.name;
    byId("footer-note").textContent = DATA.footerNote || "";
  }

  function findLink(iconName) {
    var found = null;
    safeList(DATA.links).forEach(function (item) {
      if (!found && item.icon === iconName) { found = item; }
    });
    return found;
  }

  /* ---------- links ---------- */
  function renderLinks(containerId) {
    var list = byId(containerId);
    if (!list) { return; }
    list.textContent = "";

    safeList(DATA.links).forEach(function (item) {
      var li = el("li");
      var a = el("a");
      a.href = item.url;
      a.setAttribute("aria-label", item.label + " — " + (item.handle || item.url));
      if (isExternal(item.url)) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }

      var iconWrap = el("span");
      iconWrap.innerHTML = iconFor(item.icon);
      a.appendChild(iconWrap.firstChild);

      a.appendChild(el("span", null, item.label));
      if (item.handle) { a.appendChild(el("span", "handle", item.handle)); }

      li.appendChild(a);
      list.appendChild(li);
    });
  }

  /* ---------- timelines ---------- */
  function renderTimeline(containerId, items, fields) {
    var list = byId(containerId);
    if (!list) { return; }
    list.textContent = "";

    safeList(items).forEach(function (item) {
      var li = el("li", "entry");

      var top = el("div", "entry-top");
      top.appendChild(el("h3", "entry-title", item[fields.title]));
      top.appendChild(el("p", "entry-dates", item.dates));
      li.appendChild(top);

      li.appendChild(el("p", "entry-sub", item[fields.sub]));
      if (item.place) { li.appendChild(el("p", "entry-place", item.place)); }

      var points = safeList(item.points);
      if (points.length) {
        var ul = el("ul", "entry-points");
        points.forEach(function (point) { ul.appendChild(el("li", null, point)); });
        li.appendChild(ul);
      }

      list.appendChild(li);
    });
  }

  /* ---------- focus tags ---------- */
  function renderFocus() {
    var list = byId("focus-tags");
    if (!list) { return; }
    list.textContent = "";
    safeList(DATA.focus).forEach(function (name) {
      list.appendChild(el("li", "tag", name));
    });
  }

  /* ---------- posts ---------- */
  function renderPosts() {
    var list = byId("posts-list");
    if (!list) { return; }
    list.textContent = "";

    var posts = safeList(DATA.posts);

    if (!posts.length) {
      var note = el("p", "state",
        "I post write-ups on LinkedIn and record walkthroughs on YouTube. " +
        "The latest of both live on my profiles:");
      list.appendChild(note);

      ["linkedin", "youtube"].forEach(function (key) {
        var link = findLink(key);
        if (!link) { return; }
        var card = el("a", "card");
        card.href = link.url;
        card.target = "_blank";
        card.rel = "noopener noreferrer";
        var top = el("div", "card-top");
        top.appendChild(el("h3", "card-title", link.label));
        top.appendChild(el("span", "card-flag", "Profile"));
        card.appendChild(top);
        card.appendChild(el("p", "card-desc", link.handle || link.url));
        list.appendChild(card);
      });
      return;
    }

    posts.forEach(function (post) {
      var card = el("a", "card");
      card.href = post.url;
      card.target = "_blank";
      card.rel = "noopener noreferrer";

      var top = el("div", "card-top");
      top.appendChild(el("h3", "card-title", post.title));
      if (post.source) { top.appendChild(el("span", "card-flag", post.source)); }
      card.appendChild(top);

      if (post.blurb) { card.appendChild(el("p", "card-desc", post.blurb)); }
      if (post.date) {
        var meta = el("div", "card-meta");
        meta.appendChild(el("span", null, post.date));
        card.appendChild(meta);
      }
      list.appendChild(card);
    });
  }

  /* ---------- publications ---------- */
  function renderPublications() {
    var section = byId("publications");
    var list = byId("publications-list");
    var items = safeList(DATA.publications);
    if (!section || !list) { return; }

    if (!items.length) { section.hidden = true; return; }
    section.hidden = false;
    list.textContent = "";

    items.forEach(function (item) {
      var card = el(item.url ? "a" : "div", "card");
      if (item.url) {
        card.href = item.url;
        card.target = "_blank";
        card.rel = "noopener noreferrer";
      }
      var top = el("div", "card-top");
      top.appendChild(el("h3", "card-title", item.title));
      if (item.year) { top.appendChild(el("span", "card-flag", item.year)); }
      card.appendChild(top);
      if (item.venue) { card.appendChild(el("p", "card-desc", item.venue)); }
      list.appendChild(card);
    });
  }

  /* ---------- avatar ---------- */
  function renderAvatar() {
    var img = byId("avatar");
    var user = DATA.github && DATA.github.username;
    if (!img || !user) { return; }

    img.alt = DATA.name;
    img.onload = function () { img.hidden = false; };
    img.onerror = function () { img.hidden = true; };
    img.src = "https://github.com/" + encodeURIComponent(user) + ".png?size=200";
  }

  /* ---------- GitHub ---------- */
  function prettyDate(iso) {
    var d = new Date(iso);
    if (isNaN(d.getTime())) { return ""; }
    return d.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
  }

  function titleCase(name) {
    return name.replace(/[-_]+/g, " ").trim();
  }

  function loadGitHub() {
    var cfg = DATA.github || {};
    var user = cfg.username;
    var list = byId("projects-list");
    if (!user || !list) { return; }

    var url = "https://api.github.com/users/" + encodeURIComponent(user) +
              "/repos?per_page=100&sort=updated";

    fetch(url, { headers: { Accept: "application/vnd.github+json" } })
      .then(function (res) {
        if (!res.ok) { throw new Error("GitHub replied with " + res.status); }
        return res.json();
      })
      .then(function (repos) {
        if (!Array.isArray(repos)) { throw new Error("Unexpected response"); }
        renderRepos(repos, cfg);
        renderLanguages(repos, cfg);
      })
      .catch(function (err) {
        console.warn("GitHub list unavailable:", err.message);
        renderRepoFallback(cfg);
        renderLanguageFallback();
      });
  }

  function filterRepos(repos, cfg) {
    var exclude = safeList(cfg.exclude).map(function (n) { return String(n).toLowerCase(); });
    return repos.filter(function (repo) {
      if (repo.private) { return false; }
      if (!cfg.showForks && repo.fork) { return false; }
      if (repo.archived) { return false; }
      return exclude.indexOf(String(repo.name).toLowerCase()) === -1;
    });
  }

  function sortRepos(repos, cfg) {
    var featured = safeList(cfg.featured).map(function (n) { return String(n).toLowerCase(); });
    return repos.slice().sort(function (a, b) {
      var ai = featured.indexOf(String(a.name).toLowerCase());
      var bi = featured.indexOf(String(b.name).toLowerCase());
      if (ai !== -1 || bi !== -1) {
        if (ai === -1) { return 1; }
        if (bi === -1) { return -1; }
        return ai - bi;
      }
      var stars = (b.stargazers_count || 0) - (a.stargazers_count || 0);
      if (stars !== 0) { return stars; }
      return new Date(b.pushed_at || b.updated_at) - new Date(a.pushed_at || a.updated_at);
    });
  }

  function renderRepos(repos, cfg) {
    var list = byId("projects-list");
    var visible = filterRepos(repos, cfg);
    var total = visible.length;
    var featured = safeList(cfg.featured).map(function (n) { return String(n).toLowerCase(); });
    var limit = cfg.maxRepos || 9;

    list.textContent = "";

    if (!total) {
      list.appendChild(el("p", "state", "No public repositories to show right now."));
      return;
    }

    sortRepos(visible, cfg).slice(0, limit).forEach(function (repo) {
      var card = el("a", "card");
      card.href = repo.html_url;
      card.target = "_blank";
      card.rel = "noopener noreferrer";

      var top = el("div", "card-top");
      top.appendChild(el("h3", "card-title", titleCase(repo.name)));
      if (featured.indexOf(String(repo.name).toLowerCase()) !== -1) {
        top.appendChild(el("span", "card-flag", "Featured"));
      }
      card.appendChild(top);

      card.appendChild(el("p", "card-desc",
        repo.description || "Read the code and notes on GitHub."));

      var meta = el("div", "card-meta");
      if (repo.language) {
        var lang = el("span");
        lang.appendChild(el("i", "dot"));
        lang.appendChild(el("span", null, repo.language));
        meta.appendChild(lang);
      }
      if (repo.stargazers_count) {
        meta.appendChild(el("span", null,
          repo.stargazers_count + (repo.stargazers_count === 1 ? " star" : " stars")));
      }
      var when = prettyDate(repo.pushed_at || repo.updated_at);
      if (when) { meta.appendChild(el("span", null, "Updated " + when)); }
      card.appendChild(meta);

      list.appendChild(card);
    });

    var more = byId("projects-more");
    if (more) {
      more.textContent = "";
      var link = el("a", null, "See all " + total + " repositories on GitHub →");
      link.href = "https://github.com/" + encodeURIComponent(cfg.username);
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      more.appendChild(link);
      more.hidden = false;
    }
  }

  function renderRepoFallback(cfg) {
    var list = byId("projects-list");
    if (!list) { return; }
    list.textContent = "";
    list.appendChild(el("p", "state",
      "GitHub is not responding at the moment. These are the repositories worth a look:"));

    safeList(cfg.fallback).forEach(function (name) {
      var card = el("a", "card");
      card.href = "https://github.com/" + encodeURIComponent(cfg.username) + "/" +
                  encodeURIComponent(name);
      card.target = "_blank";
      card.rel = "noopener noreferrer";
      var top = el("div", "card-top");
      top.appendChild(el("h3", "card-title", titleCase(name)));
      card.appendChild(top);
      list.appendChild(card);
    });

    showAllReposLink(cfg.username);
  }

  function showAllReposLink(user) {
    var more = byId("projects-more");
    if (!more || !user) { return; }
    more.textContent = "";
    var link = el("a", null, "See all repositories on GitHub \u2192");
    link.href = "https://github.com/" + encodeURIComponent(user);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    more.appendChild(link);
    more.hidden = false;
  }

  function renderLanguages(repos, cfg) {
    var list = byId("lang-tags");
    if (!list) { return; }

    var counts = {};
    filterRepos(repos, cfg).forEach(function (repo) {
      if (!repo.language) { return; }
      counts[repo.language] = (counts[repo.language] || 0) + 1;
    });

    var names = Object.keys(counts).sort(function (a, b) {
      if (counts[b] !== counts[a]) { return counts[b] - counts[a]; }
      return a.localeCompare(b);
    });

    list.textContent = "";

    if (!names.length) { renderLanguageFallback(); return; }

    names.forEach(function (name) {
      var li = el("li", "tag");
      li.appendChild(el("i", "dot"));
      li.appendChild(el("span", null, name));
      li.appendChild(el("span", "count",
        counts[name] + (counts[name] === 1 ? " repo" : " repos")));
      list.appendChild(li);
    });
  }

  function renderLanguageFallback() {
    var list = byId("lang-tags");
    if (!list) { return; }
    list.textContent = "";
    var li = el("li", "tag tag-quiet", "Language counts load from GitHub — see the profile link above.");
    list.appendChild(li);
  }

  /* ---------- nav highlighting ---------- */
  function watchSections() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".topbar-nav a"));
    if (!links.length || !("IntersectionObserver" in window)) { return; }

    var map = {};
    links.forEach(function (link) {
      var id = link.getAttribute("href").slice(1);
      var section = byId(id);
      if (section) { map[id] = link; }
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        links.forEach(function (link) { link.classList.remove("current"); });
        var active = map[entry.target.id];
        if (active) { active.classList.add("current"); }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    Object.keys(map).forEach(function (id) { observer.observe(byId(id)); });
  }

  /* ---------- go ---------- */
  function init() {
    renderIntro();
    renderLinks("link-list");
    renderLinks("contact-links");
    renderAvatar();
    renderFocus();
    renderTimeline("experience-list", DATA.experience, { title: "title", sub: "org" });
    renderTimeline("education-list", DATA.education, { title: "school", sub: "qualification" });
    renderPosts();
    renderPublications();
    loadGitHub();
    watchSections();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
