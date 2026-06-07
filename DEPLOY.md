# Deploy to GitHub Pages (free, permanent URL)

## Steps — takes about 3 minutes

### 1. Create a GitHub repo named exactly:
```
itsmittalharshit.github.io
```
Go to: https://github.com/new
- Name: `itsmittalharshit.github.io`
- Keep it Public
- Do NOT add README / .gitignore
- Click "Create repository"

### 2. Open Terminal on your Mac and run these commands:

```bash
cd ~/Claude/Projects/Portfolio\ Website

git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/itsmittalharshit/itsmittalharshit.github.io.git
git push -u origin main
```

### 3. That's it!
Your portfolio will be live at:
**https://itsmittalharshit.github.io**

GitHub Pages auto-deploys on every push. Takes ~60 seconds after first push.

---

## To update later:
```bash
cd ~/Claude/Projects/Portfolio\ Website
git add .
git commit -m "Update portfolio"
git push
```
