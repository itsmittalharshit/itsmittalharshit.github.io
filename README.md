# Harshit Mittal — Portfolio Website

Personal portfolio for **Harshit Mittal**, MSc Advanced Computer Science student at the University of Leeds. Built as a single-file static site — no framework, no build step, no dependencies.

🌐 **Live:** [itsmittalharshit.github.io](https://itsmittalharshit.github.io)

---

## Sections

| Section | Content |
|---|---|
| **Hero** | Name, tagline, thesis stats card, social links |
| **About** | Bio, badges, links to LinkedIn / GitHub / Resume |
| **Education** | MSc at University of Leeds, thesis details |
| **Experience** | USIC&T (AI Research Intern), CFEES DRDO (Project Trainee) |
| **Projects** | AdaptAttend & ShopHandBook (featured, hardcoded) |
| **Research** | SAPNeXt thesis, ORCID profile, benchmark metrics |
| **Skills** | Languages, AI/ML, Mobile, Backend, Data, Concepts |
| **Contact** | Contact info + mailto form (no backend needed) |

---

## Features

- **Zero dependencies** — pure HTML, CSS, and vanilla JS
- **Dark mode** — orbital orb toggle with full-page ripple transition + particle burst; auto-detects system preference and persists via `localStorage`
- **Scroll animations** — `IntersectionObserver`-based fade-up reveals
- **Progress bar** — gradient reading indicator fixed at top
- **Contact form** — opens pre-filled `mailto:` link; visitor fills form, one click sends
- **Resume download** — `HMResume.pdf` served directly
- **ORCID** — linked in Research section (`0000-0002-4960-4660`)
- **Fully responsive** — mobile hamburger menu, stacked layouts on small screens

---

## File Structure

```
Portfolio Website/
├── index.html      # Entire site — HTML + CSS + JS in one file
├── HMResume.pdf    # Resume (linked for download)
├── README.md       # This file
└── DEPLOY.md       # GitHub Pages deployment steps
```

---

## Local Preview

Just open `index.html` in any browser — no server required.

```bash
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

---

## Deploy to GitHub Pages

See [`DEPLOY.md`](./DEPLOY.md) for the exact steps. Short version:

```bash
cd "Portfolio Website"
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/itsmittalharshit/itsmittalharshit.github.io.git
git push -u origin main
```

Site goes live at `https://itsmittalharshit.github.io` within ~60 seconds.

To update after changes:

```bash
git add .
git commit -m "Update"
git push
```

---

## Contact

- **Email:** mittalharshit99@gmail.com
- **LinkedIn:** [linkedin.com/in/theharshitmittal](https://linkedin.com/in/theharshitmittal)
- **GitHub:** [github.com/itsmittalharshit](https://github.com/itsmittalharshit)
- **ORCID:** [0000-0002-4960-4660](https://orcid.org/0000-0002-4960-4660)
