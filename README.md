# Personal Portfolio Site

A personal portfolio site built with plain HTML, CSS, and JavaScript —
no frameworks, no build step. Designed to look like a professional
"dossier" / ID-badge personnel file: warm paper background, folder-tab
navigation, and a resume-style layout.

## Structure

```
index.html            → page structure (edit rarely)
css/style.css          → all styling / design tokens (edit to re-theme)
js/data.js              → ALL YOUR CONTENT — edit this file to update the site
js/script.js            → rendering logic (edit rarely)
assets/resume/          → put your resume.pdf here
assets/img/              → put your profile photo here (profile.jpg)
```

## 1. Add your content

Open **`js/data.js`**. It's a single file with clearly labeled sections
for your name, title, resume link, social links, skills, experience,
GitHub username, and LinkedIn posts. Every field has a comment
explaining what it does. This is the only file you need to edit for
day-to-day updates.

## 2. Add your resume

Drop your PDF into `assets/resume/` and name it `resume.pdf` (replacing
the placeholder text file there). The "Download Résumé" button already
points to that path — no other change needed. To update your resume
later, just replace that file.

If you'd rather link to a resume hosted elsewhere (Google Drive,
Dropbox, etc.), paste that URL into `resumeUrl` in `data.js` instead.

## 3. Add your photo

Replace `assets/img/profile.jpg` with your own photo, keeping the same
filename. A square image works best.

## 4. Projects & Skills (both driven by GitHub)

By default the site pulls your **public repositories live** from the
GitHub API — just set your username in `data.js`:

```js
github: {
  username: "your-username",
  useLiveGitHub: true,
  repoCount: 6,
  sortBy: "updated"
}
```

This single fetch powers two sections:

- **Projects** — your most recently updated repos, shown as cards.
- **Skills** — auto-generated, not hand-typed. The site counts each
  repo's primary language and any **topics** you've tagged on GitHub
  (repo page → gear icon next to "About" → Topics), then ranks them
  by frequency. Add topics like `machine-learning` or `flutter` to
  your repos on GitHub and they'll show up here automatically next
  time the page loads.

No manual maintenance needed for either section. If you'd rather
hand-pick projects instead, set `useLiveGitHub: false` and fill in
the `manualProjects` and `skillGroups` lists, which are used as the
fallback whenever live GitHub data is turned off or unavailable.

## 5. LinkedIn posts

LinkedIn has no public API for pulling posts automatically, so this
section is manually curated (takes ~2 minutes per post):

1. Open the post on LinkedIn.
2. Click **•••** → **Embed this post**.
3. Copy the `src="..."` URL from the snippet LinkedIn gives you.
4. Paste it into `embedSrc` for that post in `data.js`.

If you skip this, the site shows a plain text summary card instead
(using `fallbackText`), so nothing looks broken either way.

## 6. Adding a YouTube video later

Everything's ready to go, just switched off:

1. In `js/data.js`, set `youtube.enabled = true` and paste your
   `youtube.videoId` (the part after `v=` in a YouTube URL).
2. In `index.html`, uncomment the `<section id="video">` block
   (search for `YOUTUBE SECTION`).
3. In `index.html`, uncomment the "Video" nav tab (search for
   `YouTube tab`).

The embed logic in `js/script.js` (search for `YOUTUBE EMBED LOGIC`)
is already written and needs no changes.

## 7. Publish on GitHub Pages

1. Create a new GitHub repository (e.g. `your-username.github.io` for
   a root domain, or any name for a project site).
2. Push this folder's contents to the repo:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo.git
   git push -u origin main
   ```
3. In the repo on GitHub: **Settings → Pages → Source** → select the
   `main` branch and `/ (root)` folder → **Save**.
4. Your site will be live at:
   - `https://your-username.github.io/` (if the repo is named
     `your-username.github.io`), or
   - `https://your-username.github.io/your-repo/` (any other repo name)

GitHub Pages usually takes 1–2 minutes to go live after the first push.

## Notes

- No build tools, no `npm install` — just static files.
- Works fully offline except for two things that need internet: Google
  Fonts and the live GitHub repo fetch (both fail gracefully if
  unavailable).
- Everything is responsive down to mobile and respects
  `prefers-reduced-motion`.
