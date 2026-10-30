# Randy Mark — Engineering Portfolio

Long-term personal repository for projects, research, experiments, reports, and software applications.

**Live site goal:** Static site hosted on Vercel (or GitHub Pages).

## Quick Start (local)

Just open `index.html` in a browser, or serve the folder:

```bash
# Python
python -m http.server 8000

# or Node
npx serve .
```

Then visit http://localhost:8000

## How to add a new project

1. Open `data/projects.json`
2. Add a new object at the top of the array:

```json
{
  "title": "Project Name",
  "description": "Short description of what it does and why it matters.",
  "stack": "python · flask · ...",
  "url": "https://example.com",          // optional
  "linkLabel": "example.com",            // optional, nicer link text
  "status": "live / in-progress / archive"
}
```

3. Save. The projects section updates automatically.

## How to add research / papers / reports

1. Open `data/research.json`
2. Add entries the same way:

```json
{
  "title": "Title of paper or report",
  "description": "One or two sentences about the work.",
  "type": "report / paper / experiment log",
  "year": "2026",
  "url": "https://...",                  // optional
  "linkLabel": "pdf / repo"
}
```

## Folder structure

```
ran_dev.portfolio/
├── index.html          # main page
├── css/style.css       # terminal / matrix aesthetic
├── js/main.js          # matrix rain + data loading
├── data/
│   ├── projects.json   # ← edit this to add projects
│   └── research.json   # ← edit this to add research
├── assets/             # images, favicon, etc. (future)
├── .gitignore
└── README.md
```

## Design notes

- Pure static HTML/CSS/JS — no backend required.
- Matrix rain + scanlines + vignette kept for the engineering/hacker identity.
- JetBrains Mono throughout.
- Easy to maintain and expand throughout university and beyond.

## Contact placeholders

Update the contact section in `index.html` with your real email and LinkedIn URL.

---

Lantame Randy Mark · Computer Engineering · KNUST, Kumasi
