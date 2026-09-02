# Git Cheat Sheet — CSE-2340 Software Development 1

**Week 1, Class 4**
Md Sadman Hafiz, Lecturer, Dept. of CSE, IIUC

Keep this file open while you work. Every command you need this semester is here.

---

## 1. One-time setup (do this once on your laptop)

| Command | What it does |
|---|---|
| `git --version` | Checks that Git is installed |
| `git config --global user.name "Your Name"` | Sets the name shown on your commits |
| `git config --global user.email "you@example.com"` | Sets the email shown on your commits |
| `git config --list` | Shows what is currently configured |

Use the **same email as your GitHub account**.

---

## 2. The three areas

```
Working Directory  --git add-->  Staging Area  --git commit-->  Local Repository  --git push-->  GitHub
   (your folder)                 (the basket)                    (.git folder)                   (online)
```

Whenever you are confused, ask: **which area is my file in right now?** Then run `git status`.

---

## 3. Daily commands

| Command | What it does |
|---|---|
| `git status` | Shows what changed. Run this all the time |
| `git add index.html` | Stages one file |
| `git add .` | Stages every changed file in this folder |
| `git commit -m "message"` | Saves the staged files as one save point |
| `git push` | Sends your commits to GitHub |
| `git log --oneline` | Shows the list of commits, newest first |
| `git diff` | Shows exactly what text you changed |
| `git restore index.html` | Throws away unsaved changes in that file |

**The daily loop:** `status` → `add` → `commit` → `push`

---

## 4. Starting a new project

```bash
cd my-profile                 # go into the project folder
git init                      # create the repository (.git folder)
git add .                     # stage everything
git commit -m "Initial commit: semantic profile page"
git branch -M main            # name the branch main
git remote add origin https://github.com/YOUR-USERNAME/my-profile.git
git push -u origin main       # first push only
```

After the first push, this is all you need:

```bash
git add .
git commit -m "Add hobbies section"
git push
```

---

## 5. Working with a repository that already exists

```bash
git clone https://github.com/YOUR-USERNAME/my-profile.git
cd my-profile
```

`git clone` downloads the project **and** its whole history. You do not run `git init` after cloning.

---

## 6. .gitignore

Create a file named exactly `.gitignore` in the project root, before your first commit.

```
# Dependencies
node_modules/

# Secret keys and passwords
.env
.env.local

# Build output
dist/
build/

# Operating system files
.DS_Store
Thumbs.db

# Editor settings
.vscode/
.idea/

# Logs
*.log
```

Rules:

- One rule per line
- `folder/` ignores a whole folder
- `*.log` ignores every file ending in `.log`
- A `#` starts a comment

**Never push** API keys, passwords, `.env` files, or `node_modules/`.

---

## 7. Writing commit messages

Good:

- `Add contact form to profile page`
- `Fix broken image path in about section`
- `Add skills and education sections`

Bad:

- `update`
- `asdf`
- `final final v2`

Rule: say **what changed**, in present tense, in one short line.

---

## 8. Troubleshooting

| Message you see | What it means | Fix |
|---|---|---|
| `fatal: not a git repository` | You are outside the project folder, or you never ran `git init` | `cd` into the folder, then `git init` if needed |
| `Authentication failed` | You typed your GitHub password | Use a personal access token instead (see below) |
| `nothing to commit, working tree clean` | Nothing is staged, or nothing changed | Run `git add .` first |
| `Updates were rejected` | GitHub has a commit your computer does not have | `git pull origin main --rebase` then `git push` |
| `src refspec main does not match any` | No commit yet, or your branch is `master` | Commit first, then `git branch -M main` |
| Git opens a strange editor | You ran `git commit` without `-m` | Press `Esc`, type `:q!`, press Enter. Then use `-m` |
| `Permission denied (publickey)` | You are using an SSH URL without SSH keys | Use the HTTPS URL instead |

---

## 9. Creating a personal access token (GitHub login)

1. GitHub → click your profile picture → **Settings**
2. Scroll down → **Developer settings**
3. **Personal access tokens** → **Tokens (classic)** → **Generate new token (classic)**
4. Note: `CSE-2340`. Expiration: choose the end of the semester
5. Tick the **repo** checkbox
6. Click **Generate token** and **copy it immediately** — GitHub shows it only once
7. When Git asks for a password during `git push`, paste the token

Save the token in a private text file on your laptop. Do **not** put it in your repository.

---

## 10. Commands we do NOT use yet

You will meet these in Week 8 and Week 15. Do not use them now without asking.

`git branch` · `git checkout` · `git merge` · `git rebase` · `git reset --hard` · `git revert`

`git reset --hard` deletes work permanently. Never run it because a website told you to.
