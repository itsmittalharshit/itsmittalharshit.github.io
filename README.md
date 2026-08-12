# Harshit Mittal — portfolio

A static personal site. Plain HTML, CSS and JavaScript: no framework, no build step, no dependencies.

```
index.html      page structure
styles.css      all styling (sky blue + white)
script.js       renders the page and pulls live GitHub data
data.js         ← the only file you normally edit
HMResumeGo.pdf  linked by the "Download CV" button
.nojekyll       tells GitHub Pages to serve the files as-is
```

## Put it online with GitHub Pages

You already own `github.com/itsmittalharshit/itsmittalharshit.github.io`, so use that repo — it publishes at `https://itsmittalharshit.github.io` with no extra config.

1. Copy every file in this folder into the repo (keep the file names).
2. Commit and push to the `main` branch.
3. In the repo, open **Settings → Pages**, set **Source** to *Deploy from a branch*, branch `main`, folder `/ (root)`, then **Save**.
4. Wait about a minute and open `https://itsmittalharshit.github.io`.

To preview locally before pushing, open a terminal in this folder and run `python3 -m http.server 8000`, then visit `http://localhost:8000`. Opening `index.html` by double-clicking also works, though some browsers block the GitHub request on `file://` URLs.

## What updates by itself, and what doesn't

**GitHub — fully automatic.** The Projects list and the language counts under Skills are read from `https://api.github.com/users/itsmittalharshit/repos` every time someone loads the page. Push a new repo, rename one, or edit a repo description on GitHub, and this site shows the change on the next refresh. Nothing to redeploy.

Two things worth knowing: the API allows 60 unauthenticated requests per hour per visitor IP, which is far more than a portfolio needs, and repository descriptions are what visitors read here — several of your repos have none, so they currently fall back to generic text. Adding a one-line description on GitHub is the single highest-value edit you can make.

**LinkedIn — not automatic, and this isn't a limitation of the code.** LinkedIn has no public API or feed for personal profiles. Reading your profile or posts requires their Partner Program, and scraping is against their terms and gets blocked. Any site claiming to mirror a LinkedIn profile is either using a paid third-party service or a copy that someone updates by hand.

So the practical setup is this: your education, experience, focus areas and posts live in `data.js`. When something changes on LinkedIn, change the matching line in `data.js` and push. It's one file, plain English, and takes under a minute.

If you'd rather not edit the file yourself, two options exist: pay for a service like Proxycurl to fetch your profile on a schedule, or embed individual LinkedIn posts as iframes using the embed URL LinkedIn provides (post → ••• → **Embed this post**), which keeps each embedded post's content live even though the list of posts is still manual.

## Editing `data.js`

Open it in any text editor. Everything is labelled and the sections are numbered. The rules:

- Keep the quotes and the commas exactly where they are.
- To remove an entry, delete it from its `[ ... ]` list.
- Empty a list (`posts: []`, `publications: []`) and that section either hides itself or falls back to a link to your profile.

Common edits:

| You want to change | Edit |
| --- | --- |
| Job title, intro, location | fields 1 at the top |
| A new role or degree | `experience` / `education` |
| Featured projects, how many to show | `github.featured`, `github.maxRepos` |
| Skills shown as focus areas | `focus` |
| Add a LinkedIn post or YouTube video | `posts` |
| Add a paper | `publications` (the section appears once it isn't empty) |

## Checks already done

- `node --check` passes on `script.js` and `data.js`.
- The page was rendered in a headless DOM and produced no console errors, in three conditions: GitHub responding normally, GitHub returning a rate-limit error, and no network at all. Each falls back cleanly.
- Every `#anchor` in the nav points at a section that exists; every element the script looks for is present in the HTML.
- Balanced CSS, responsive to 320px, visible keyboard focus, a skip link, `prefers-reduced-motion` respected, and a print stylesheet.
