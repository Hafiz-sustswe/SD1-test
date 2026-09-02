# Teaching Notes — CSE-2340, Week 1, Classes 3 and 4

Md Sadman Hafiz, Lecturer, Dept. of CSE, IIUC · Autumn 2026

---

## Before Class 3

- Send students a message the night before: install VS Code, install the Live Server extension, create an empty folder named `my-profile`, and bring one photo of themselves.
- Have `week1-class3-snippets.html` open in one browser tab and `week1-class3-index.html` open in another before the class starts.
- Keep an empty VS Code window ready for the live build. Do not build from the finished file — students learn from watching you type.
- Set the VS Code font size to 18 or larger. Students at the back cannot read the default size.

## Class 3 timing (50 minutes)

| Time | Slides | Activity |
|---|---|---|
| 0–5 | 2 | Recall questions, read today's outcome |
| 5–15 | 3–11 | Concept: semantic HTML and each element, with the snippet file on screen |
| 15–30 | 12–17 | Live build of the profile page in four steps |
| 30–43 | — | Student build: they reproduce and modify |
| 43–48 | 18–19 | Accessibility checklist and debug clinic |
| 48–50 | 20–21 | Assignment Part 1 check and exit questions |

Slides 3–11 are nine slides in ten minutes. Do not read them line by line. Show the snippet file in the browser and use the slide only for the code and the one rule on it.

## Class 3 delivery notes

- **The one big idea:** the browser shows the same thing either way; the meaning is what changes. Repeat this sentence at least three times.
- **Emmet trick:** typing `!` then Tab in an empty `.html` file produces the whole skeleton. Show it once; it saves five minutes of typing every class for the rest of the semester.
- **Break the image on purpose.** Delete one letter from `src` and let students see the alt text appear. This is the fastest way to teach why alt matters.
- **Click a label** to show the input receiving focus. It proves that `for` and `id` are connected.
- **Do not add CSS.** Students will complain that the page looks ugly. Tell them plainly: today we build the skeleton, Week 2 adds the skin. If you add CSS today, Week 2 loses its purpose.
- During the student build (30–43), circulate constantly. Do not sit. Look for: missing closing tags, `src` paths with a wrong folder name, and `id` values that do not match the `href`.

## Common student questions — Class 3

**Why not just use `div` for everything?**
Because a `div` means nothing. A screen reader, a search engine and your teammate all need to know which part is the main content. `div` is still used — for grouping when no semantic tag fits.

**What is the difference between `strong` and `b`?**
`strong` means the content is important, and it happens to look bold. `b` only makes text look bold. Use `strong`.

**Can I have two `h1` tags?**
Technically the page still works, but use one. The `h1` is the title of the page.

**Where does the form data go when I click Send?**
Nowhere yet. Sending data needs a server, which is not in this course. Today the form only collects input. In Week 13 you will handle form input with React.

**Why is `img` not closed?**
Some elements have no content inside them, so they have no closing tag. `img`, `br`, `hr`, `input` and `meta` are the ones you will meet.

**Does the file have to be called `index.html`?**
No, but `index.html` is the default page a web server opens. Use it for the main page of every project this semester.

**My page did not change after I edited it.**
You did not save (Ctrl + S), or Live Server is showing a different file. Check the URL in the browser.

## Expected student output — Class 3

By 43 minutes, a student who has kept up should have a single `index.html` that:

- opens in Live Server with the correct tab title
- has `header`, `nav`, `main`, at least three `section` blocks, and `footer`
- has one `h1` and several `h2` headings in order
- shows a photo, or shows alt text if the photo is missing
- has working nav jump links
- has a form where clicking a label focuses its input

Part 1 of the assignment (a hobbies section plus a nav link) takes a prepared student about three minutes.

---

## Before Class 4

- Ask students the night before to create a GitHub account and verify their email. Account creation in class wastes ten minutes.
- Verify that Git is installed on the lab machines. If it is not, install it before class or ask students to use their own laptops.
- Have one GitHub repository ready to show, and be logged out of GitHub in one browser so you can demonstrate the login screen.
- Have your personal access token ready in a text file so you do not have to generate one live.
- Warning: do not display your own real token on the projector. Generate a throwaway token for the demonstration and delete it afterwards.

## Class 4 timing (50 minutes)

| Time | Slides | Activity |
|---|---|---|
| 0–5 | 2 | Recall, everyone opens the Class 3 folder |
| 5–16 | 3–5 | Concept: version control, Git vs GitHub, the three areas |
| 16–18 | 6 | Install check and one-time config |
| 18–38 | 7–13 | Live build: init → status → add → commit → remote → push |
| 38–43 | 14–15 | .gitignore and the full workflow |
| 43–48 | 16 | Error clinic |
| 48–50 | 17–18 | Assignment Part 1 check and exit questions |

The live build block is long. Do one command, wait for the whole room, then move on. It is better to finish the class with everyone pushed than to finish the slides.

## Class 4 delivery notes

- **Draw the four boxes on the whiteboard** (working directory, staging area, local repository, GitHub) and leave them there for the whole class. Point at them whenever a student is lost.
- **The save-point analogy** works better than any technical explanation: a commit is a save point in a game.
- **The basket analogy** answers the "why two commands" question: `add` puts items in the basket, `commit` pays at the counter.
- **`origin` is just a nickname** for the GitHub URL. Say this explicitly — students assume it is a magic keyword.
- **Teach the vim escape early**: `Esc` then `:q!` then Enter. At least three students will run `git commit` without `-m`.
- **Do not tick "Add a README"** when creating the GitHub repository. It creates a commit on GitHub that the local repository does not have, and the first push is rejected. This one setting causes most of the errors in this class.
- **Do not teach branches, merges or conflicts today.** They are scheduled for Week 8. If a student asks, say it is coming and move on.
- Keep a printed copy of the error table (slide 16) at the front desk. Students hitting the same error can read it while you help someone else.

## Common student questions — Class 4

**Are Git and GitHub the same thing?**
No. Git is a program on your computer. GitHub is a website that stores Git repositories. Git is the camera, GitHub is the online album.

**Why do I need `add` and `commit`? Why not one command?**
Because you often change five files but only want to save three of them together as one meaningful change. `add` lets you choose.

**Why is my password not working?**
GitHub stopped accepting account passwords for Git operations. Use a personal access token as the password.

**What happens if I delete the `.git` folder?**
Your files stay, but the entire history is gone permanently. Never delete it.

**Can I use GitHub Desktop or the VS Code buttons instead?**
Yes, later. For now use the commands, because you need to understand what the buttons do before you trust them. Mini-project evaluation may ask you to explain a command.

**I pushed a password by mistake. Can I just delete the file?**
Deleting the file does not remove it from the history. Change the password or key immediately, then come and see me. This is exactly why `.gitignore` exists.

**Do I need a new repository for every project?**
Yes. One project, one repository. You will create six of them for the mini projects.

## Expected student output — Class 4

By 48 minutes, each student should be able to show:

- a public GitHub repository named `my-profile`
- `index.html` visible on the GitHub page
- at least one commit with a readable message
- a `.gitignore` file in the repository

Verify Part 1 by looking at the repository URL on the student's screen. Do not accept a screenshot of the terminal — the file must be visible on GitHub.

---

## Assessment summary for both classes

| Class | Part 1 (in class, last 5 min) | Part 2 (home, before next class) | Total |
|---|---|---|---|
| C3 | Add a hobbies section with a working nav link — 2 marks | Complete the profile page, add `aside` and `about.html` — 3 marks | 5 |
| C4 | Push the profile page to GitHub with a `.gitignore` — 2 marks | Add README.md and at least three more commits — 3 marks | 5 |

These marks feed the continuous-assessment component and prepare students directly for Mini Project 1 (Week 3, C4), which is submitted as a repository link plus a deployed URL.

## Link forward

- Week 2 C1 (Navigation, forms and tables) extends the same profile page — students should keep the folder.
- Week 2 C2 (Accessibility essentials) reuses the Class 3 accessibility checklist as its starting point.
- Week 3 C4 (Mini Project 1 evaluation) assumes every student can push to GitHub without help.
- Week 8 C3 introduces branches and pull requests on top of today's commands.
