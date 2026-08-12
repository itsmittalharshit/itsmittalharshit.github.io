/* ============================================================
   data.js — the only file you normally need to edit.
   Change anything here and the whole site updates.
   Keep the commas and quotes exactly as they are.
   ============================================================ */

const DATA = {
  /* ---------- 1. WHO YOU ARE ---------- */
  name: "Harshit Mittal",
  role: "AI Engineer · Data Science",
  location: "Leeds, United Kingdom",
  tagline:
    "MSc Advanced Computer Science at the University of Leeds, working on deep learning for medical imaging.",

  // Short intro. Each string is its own paragraph. Write like you speak.
  about: [
    "I build machine learning systems and care most about the part where they meet real users — clinicians looking at a scan, a shopkeeper closing the day's books, a team that needs a model to run on a phone with no signal.",
    "My master's thesis, SAFViT, is a hierarchical encoder–decoder architecture for cell segmentation that improves detection of minority dead-cell classes on the PanNuke dataset. Before Leeds, I worked on medical AI research and a 3D facial recognition pipeline at DRDO.",
    "Right now I'm looking for AI engineering and data science roles in the UK and India."
  ],

  // Optional. Leave as "" to hide the résumé button.
  resumeUrl: "HMResumeGo.pdf",

  /* ---------- 2. LINKS (icons are matched by the "icon" key) ---------- */
  // Available icon keys: linkedin, github, youtube, email, hackerrank, orcid, researchgate
  links: [
    { label: "LinkedIn",     handle: "in/theharshitmittal",     url: "https://www.linkedin.com/in/theharshitmittal/",        icon: "linkedin" },
    { label: "GitHub",       handle: "itsmittalharshit",        url: "https://github.com/itsmittalharshit",                  icon: "github" },
    { label: "Email",        handle: "mittalharshit99@gmail.com", url: "mailto:mittalharshit99@gmail.com",                   icon: "email" },
    { label: "YouTube",      handle: "@hmbugs",                 url: "https://www.youtube.com/@hmbugs",                      icon: "youtube" },
    { label: "ORCID",        handle: "0000-0002-4960-4660",     url: "https://orcid.org/0000-0002-4960-4660",                icon: "orcid" },
    { label: "ResearchGate", handle: "Harshit-Mittal-10",       url: "https://www.researchgate.net/profile/Harshit-Mittal-10", icon: "researchgate" },
    { label: "HackerRank",   handle: "mittalharshit99",         url: "https://www.hackerrank.com/profile/mittalharshit99",   icon: "hackerrank" }
  ],

  /* ---------- 3. EDUCATION (from your CV — edit here when it changes) ---------- */
  education: [
    {
      school: "University of Leeds",
      qualification: "MSc Advanced Computer Science — First Class",
      place: "Leeds, United Kingdom",
      dates: "Sep 2025 — Aug 2026",
      points: [
        "Thesis: SAFViT, a hierarchical encoder–decoder architecture using Spatial Adaptive Fusion over a sliding-window backbone, outperforming CellViT on minority dead-cell classes in the PanNuke dataset.",
        "Coursework: Algorithms, Machine Learning, Deep Learning, Data Mining and Text Analysis, Data Science."
      ]
    },
    {
      school: "Maharaja Agrasen Institute of Technology",
      qualification: "B.Tech Computer Science and Engineering — First Class",
      place: "Delhi, India",
      dates: "Aug 2021 — May 2025",
      points: [
        "Coursework: Data Structures, Algorithms, Machine Learning, Data Science, Natural Language Processing, Software Development."
      ]
    }
  ],

  /* ---------- 4. EXPERIENCE (from your CV — edit here when it changes) ---------- */
  experience: [
    {
      org: "USIC&T",
      title: "AI Research Intern",
      place: "Delhi, India",
      dates: "Jan 2025 — May 2025",
      points: [
        "Developed medical AI activation and class-balancing techniques that cut information loss to 7% and raised accuracy by up to 10% across peer-reviewed frameworks (Springer / IEEE).",
        "Built containerised ML pipelines with Docker and Git so results could be reproduced across teams."
      ]
    },
    {
      org: "CFEES, DRDO",
      title: "Project Trainee",
      place: "Delhi, India",
      dates: "Aug 2023 — Oct 2023",
      points: [
        "Built and deployed a peer-reviewed 3D facial recognition pipeline that converted CCTV footage into point clouds, used in the department's active security setup.",
        "Improved performance of a cross-platform Flutter application and set code standards through disciplined Git history and documentation."
      ]
    }
  ],

  /* ---------- 5. FOCUS AREAS (the LinkedIn side of your skills) ----------
     Everything else on the Skills row is counted live from your GitHub repos. */
  focus: [
    "Deep learning",
    "Computer vision",
    "Medical imaging",
    "Vision transformers",
    "On-device ML",
    "Data analysis",
    "MLOps & Docker",
    "Flutter"
  ],

  /* ---------- 6. POSTS & VIDEOS ----------
     LinkedIn has no public feed, so posts are listed here by hand.
     Copy a post's link (••• → Copy link to post) and add a row below.
     source can be "LinkedIn" or "YouTube". Leave the list empty ( posts: [] )
     and the section turns into simple links to your profiles instead. */
  posts: [
    // { title: "Why dead cells break most segmentation models", url: "https://www.linkedin.com/posts/...", source: "LinkedIn", date: "Jul 2026", blurb: "A short note on class imbalance in PanNuke." },
    // { title: "Building an offline face-recognition attendance app", url: "https://www.youtube.com/watch?v=...", source: "YouTube", date: "Jun 2026", blurb: "Walkthrough of the TFLite pipeline." }
  ],

  /* ---------- 7. PUBLICATIONS ----------
     Add papers here; the section hides itself while the list is empty. */
  publications: [
    // { title: "Paper title", venue: "Springer / IEEE", year: "2025", url: "https://doi.org/..." }
  ],

  /* ---------- 8. GITHUB (projects + language skills, pulled live) ---------- */
  github: {
    username: "itsmittalharshit",
    maxRepos: 9,                       // how many repositories to show
    featured: ["SAFViT", "MealWeDeal", "HRGoggle", "adaptattend"], // these appear first
    exclude: ["itsmittalharshit", "itsmittalharshit.github.io"],   // profile README + this site
    showForks: false,
    // Shown only if GitHub can't be reached (no invented descriptions — just links).
    fallback: [
      "SAFViT",
      "MealWeDeal",
      "HRGoggle",
      "adaptattend",
      "ShopHandBook",
      "HexapodLocomotionBioComp",
      "UK_City_Livability_Analysis",
      "Combinations_of_Activation_Functions",
      "DataScienceUOLeeds"
    ]
  },

  /* ---------- 9. FOOTER ---------- */
  footerNote: "Built as a static site — plain HTML, CSS and JavaScript."
};
