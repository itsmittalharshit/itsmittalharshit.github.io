/* =====================================================================
   SITE DATA — edit everything in this file to make the site yours.
   You do NOT need to touch index.html, style.css, or script.js
   unless you want to change layout or design.
   ===================================================================== */

const SITE_DATA = {

  /* ---------------------------------------------------------------
     1. IDENTITY — shows in the hero "ID badge" and browser tab
     --------------------------------------------------------------- */
  identity: {
    fullName: "Harshit Mittal",
    title: "AI/ML Engineer & Software Developer",
    tagline: "I build on-device ML and computer vision systems — from hierarchical encoder-decoder architectures to fully offline mobile apps.",
    location: "Leeds, United Kingdom",
    status: "Open to opportunities",        // shown as a small "stamp" badge
    email: "mittalharshit99@gmail.com",
    photo: "assets/img/profile.jpg",        // replace this file with your own headshot (square works best)
    refNo: ""                               // cosmetic "file number" detail, change or delete freely
  },

  /* ---------------------------------------------------------------
     2. RESUME — the button in the hero + About section links here.
     EASIEST WAY TO UPDATE: replace the file at assets/resume/resume.pdf
     with your own PDF, keeping the same filename. The link below
     never needs to change if you do that.
     If you'd rather link to Google Drive/Dropbox instead of hosting
     a file in this repo, just paste that URL here instead.
     --------------------------------------------------------------- */
  resumeUrl: "assets/resume/resume.pdf",

  /* ---------------------------------------------------------------
     3. SOCIAL / PROFILE LINKS
     --------------------------------------------------------------- */
  links: {
    github: "https://github.com/itsmittalharshit",
    linkedin: "https://www.linkedin.com/in/theharshitmittal/",
    youtube: "https://www.youtube.com/@hmbugs",
    hackerrank: "https://www.hackerrank.com/profile/mittalharshit99",
    orcid: "https://orcid.org/0000-0002-4960-4660",
    researchgate: "https://www.researchgate.net/profile/Harshit-Mittal-10",
    twitter: "",     // leave blank ("") to hide any of these icons
    website: ""
  },

  /* ---------------------------------------------------------------
     4. GITHUB PROJECTS
     Set githubUsername and the site will AUTOMATICALLY pull your
     public repos live from the GitHub API — nothing to keep in sync.
     If you'd rather hand-pick projects, set useLiveGitHub to false
     and fill in the "manualProjects" list below instead.
     --------------------------------------------------------------- */
  github: {
    username: "itsmittalharshit",
    useLiveGitHub: true,
    repoCount: 6,             // how many repos to show
    sortBy: "updated"         // "updated" | "created" | "pushed" | "full_name"
  },

  manualProjects: [
    // Only used if github.useLiveGitHub is set to false above.
    {
      name: "Example Project",
      description: "A short description of what this project does and why it matters.",
      url: "https://github.com/your-username/example-project",
      tags: ["JavaScript", "API"]
    }
  ],

  /* ---------------------------------------------------------------
     5. SKILLS
     Per your request, skills are NOT hand-typed from a resume — they
     are generated automatically from your GitHub profile: the
     programming languages and repo topics across your public repos
     (see "renderSkills" in js/script.js for exactly how). This stays
     in sync automatically as you push new code.

     "skillGroups" below is ONLY a fallback — it's shown if the GitHub
     API call fails (offline, rate-limited, etc.) or if
     github.useLiveGitHub is set to false. Feel free to leave it as-is
     as a safety net, or fill in your own manual list.
     --------------------------------------------------------------- */
  skillGroups: [
    {
      group: "Languages",
      skills: ["Python", "Dart", "C++", "JavaScript"]
    },
    {
      group: "Focus Areas",
      skills: ["Machine Learning", "Computer Vision", "On-device ML", "Flutter"]
    }
  ],

  /* ---------------------------------------------------------------
     6. EXPERIENCE — rendered as a dossier-style timeline
     --------------------------------------------------------------- */
  experience: [
    {
      role: "MSc Advanced Computer Science (First Class)",
      org: "University of Leeds",
      period: "Sep 2025 — Aug 2026",
      summary: "Thesis: designed SAFViT, a hierarchical encoder-decoder architecture integrating Spatial Adaptive Fusion over a sliding-window backbone, outperforming models like CellViT on minority dead cells in the PanNuke dataset."
    },
    {
      role: "AI Research Intern",
      org: "USIC&T, Delhi",
      period: "Jan 2025 — May 2025",
      summary: "Developed medical AI activation and class-balancing techniques, cutting information loss to 7% and boosting accuracy up to 10% across peer-reviewed (Springer/IEEE) frameworks. Built containerized ML pipelines with Docker and Git for reproducible, version-controlled deployments."
    },
    {
      role: "Project Trainee",
      org: "CFEES, DRDO, Delhi",
      period: "Aug 2023 — Oct 2023",
      summary: "Built a peer-reviewed 3D facial recognition pipeline converting CCTV footage into point-clouds for active production security use. Optimized a cross-platform Flutter application's performance and maintained rigorous Git-based documentation standards."
    },
    {
      role: "BTech, Computer Science and Engineering (First Class)",
      org: "Maharaja Agrasen Institute of Technology, Delhi",
      period: "Aug 2021 — May 2025",
      summary: "Coursework in Data Structures, Algorithms, Machine Learning, Data Science, and Natural Language Processing."
    }
  ],

  /* ---------------------------------------------------------------
     7. LINKEDIN POSTS
     LinkedIn doesn't offer a public API for pulling posts automatically,
     so this section is manually curated — but it's a two-minute job:

     HOW TO ADD A POST:
       1. Open the LinkedIn post in your browser.
       2. Click the "•••" (more) icon on the post → "Embed this post".
       3. LinkedIn gives you an <iframe ...> snippet — copy the "src" URL
          from inside that snippet (looks like https://www.linkedin.com/embed/feed/update/...).
       4. Paste that src URL as "embedSrc" below. That's it.

     If you'd rather not embed live posts, just fill in "fallbackText"
     for a simple text summary card instead — leave embedSrc as "".
     --------------------------------------------------------------- */
  linkedinPosts: [
    {
      embedSrc: "",
      fallbackText: "Excited to share that our team shipped the new self-serve analytics dashboard this quarter — replace this with your own LinkedIn post summary or an embed link.",
      date: "Jul 2026",
      url: "https://www.linkedin.com/in/your-profile"
    },
    {
      embedSrc: "",
      fallbackText: "Reflecting on a year of cross-functional projects — swap this card out for a real post via the embed instructions above.",
      date: "Mar 2026",
      url: "https://www.linkedin.com/in/your-profile"
    }
  ],

  /* ---------------------------------------------------------------
     8. YOUTUBE — OFF by default. See the fully-commented block in
     index.html (search for "YOUTUBE SECTION") and script.js
     (search for "YOUTUBE EMBED LOGIC") for exactly what to uncomment.
     Once you're ready, just fill in a video ID here and flip
     "enabled" to true — no other file needs manual edits.
     --------------------------------------------------------------- */
  youtube: {
    enabled: false,
    videoId: "",          // the part after "v=" in a YouTube URL, e.g. "dQw4w9WgXcQ"
    sectionTitle: "Featured Video"
  },

  /* ---------------------------------------------------------------
     9. CONTACT / FOOTER
     --------------------------------------------------------------- */
  footerNote: "Built with HTML, CSS & JavaScript — no frameworks."
};
