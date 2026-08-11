# RBSMUN Website — Content Editing Guide

This guide covers every place where you need to add real text, images, and data to the website.
**No coding knowledge is required** — just find the right file and replace the placeholder text.

---

## Table of Contents

1. [General Rules](#1-general-rules)
2. [Images — Where to Put Them](#2-images--where-to-put-them)
3. [Committees Data](#3-committees-data)
4. [Committee Dais Members](#4-committee-dais-members)
5. [Teams Data](#5-teams-data)
6. [Home Page](#6-home-page)
7. [About Page](#7-about-page)
8. [Conference Page](#8-conference-page)
9. [Logo](#9-logo)
10. [Quick Reference Table](#10-quick-reference-table)

---

## 1. General Rules

- **All data files are in `src/data/`** — these are the only files you need to edit for content
- All images go in `public/images/` (see section 2)
- After editing any file, save it and the browser will auto-refresh (dev server must be running)
- To start the dev server: open a terminal in the project folder and run `npm run dev`
- **JSON rules:** use double quotes `"` for strings, don't leave trailing commas after the last item

---

## 2. Images — Where to Put Them

### Folder structure inside `public/images/`:

```
public/images/
├── logo.webp                        ← The main RBSMUN logo (top-left of nav)
├── miscellaneous/
│   ├── PMS01512.webp                ← HOME PAGE hero background image
│   ├── About+us+pg+background.webp  ← ABOUT PAGE hero background
│   ├── committees.webp              ← COMMITTEES PAGE hero background
│   └── RBS+MUN+Posts+Bg.webp        ← TEAM PAGE hero background
├── committees/
│   ├── ecofin/
│   │   ├── chair.webp               ← Chairperson photo
│   │   ├── vice-chair.webp          ← Vice Chairperson photo
│   │   ├── moderator.webp           ← Moderator photo
│   │   ├── logo.webp                ← Committee logo shown as bg on detail page
│   │   └── eb-group.webp            ← Group photo shown at top of committee page
│   └── (same structure for every committee folder)
└── team/
    ├── secretariat/
    │   ├── sg.webp                  ← Secretary-General photo
    │   ├── dsg1.webp
    │   ├── dsg2.webp
    │   └── cd.webp                  ← Crisis Director photo
    └── (same pattern for: logistics, it, art, media, photography)
```

> **Important:** Image filenames are **case-sensitive**. `Chair.webp` ≠ `chair.webp`. Use lowercase.
> Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`

---

## 3. Committees Data

**File:** `src/data/committees.json`

This file controls the list of committees shown on the Committees page, including each committee's name and mandate text.

### Structure

```json
[
    {
        "id": "ecofin",
        "acronym": "ECOFIN",
        "fullname": "Economic and Financial Committee",
        "mandate": "Full committee mandate text... Use <br><br> for new paragraphs.",
        "agenda": "The global impact of cryptocurrency",
        "email": "ecofin@ratobangala.edu.np",
        "study_guide": "https://link-to-google-drive.com/or-custom-url"
    }
]
```

| Field | What it does |
|---|---|
| `id` | Lowercase key — must match the folder name in `public/images/committees/` |
| `acronym` | The short name shown on the committee card (e.g. `ECOFIN`) |
| `fullname` | The full committee name shown on the committee detail page |
| `mandate` | Committee mandate text (use `<br>` or `<br><br>` for paragraph breaks) |
| `agenda` | (Optional) The agenda of the committee, displayed in the header. |
| `email` | (Optional) The specific email address for this committee. Defaults to the generic one if empty. |
| `study_guide` | (Optional) A custom external link (like Google Drive) to the study guide. If left blank, it defaults to the local PDF at `public/pdfs/[committee-id]-background-guide.pdf`. |

### Adding a new committee
1. Copy an existing block in `committees.json` and update all fields
2. Add the committee to `committee-dais.json` (see section 4)
3. Create `public/images/committees/NEWID/` with the appropriate images

---

## 4. Committee Dais Members

**File:** `src/data/committee-dais.json`

This file controls the executive board members shown on each committee's detail page.

### Structure

```json
{
    "ecofin": [
        {
            "name": "Shivansh Bhattarai",
            "role": "Chairperson",
            "img": "chair.webp",
            "desc": "Bio paragraph here..."
        },
        {
            "name": "Sarhana Sharma",
            "role": "Vice Chairperson",
            "img": "vice-chair.webp",
            "desc": "Bio paragraph here..."
        }
    ],
    "jcc": [
        { "name": "To be announced", "role": "Chairperson", "img": "chair.webp", "desc": "" }
    ]
}
```

| Field | What it does |
|---|---|
| The key (e.g. `"ecofin"`) | Must match the `id` in `committees.json` |
| `name` | Person's full name |
| `role` | Their role (e.g. `Chairperson`, `Vice Chairperson`, `Moderator`) |
| `img` | Photo filename inside `public/images/committees/COMMITTEE_ID/` |
| `desc` | Bio text shown when their card is clicked (can be left as `""`) |

> **Committees not listed** in this file will use the default dais (Chairperson, Vice Chairperson, Moderator — all "To be announced").

---

## 5. Teams Data

**File:** `src/data/teams.json`

This file controls team descriptions and all member info shown on the Teams pages.

### Structure

```json
{
    "secretariat": {
        "id": "secretariat",
        "title": "Secretariat",
        "desc": "Description of this team shown on the team detail page...",
        "heads": [
            {
                "name": "To be announced",
                "role": "Secretary-General",
                "img": "sg.webp",
                "desc": "Optional bio text"
            }
        ],
        "core": []
    }
}
```

| Field | What it does |
|---|---|
| The key (e.g. `"secretariat"`) | Must match the team `id` |
| `title` | Team name shown on the card and detail page |
| `desc` | Description paragraph shown on the team detail page |
| `heads` | Array of leadership/heads of the team |
| `core` | Array of core team members (can be `[]` if none) |

For each person:
- `img` filename must exist in `public/images/team/TEAM_ID/`
- `desc` is the bio shown when you click their card (can be `""`)

---

## 6. Home Page

**File:** `src/pages/index.astro`

### Hero Background Image
Replace `public/images/miscellaneous/PMS01512.webp` with your photo (keep the filename).

### Stats Numbers
Search for `data-target` and change the numbers:
```astro
<span class="stat-number" data-target="21">0</span>   ← Change 21
<span class="stat-label">Iterations</span>              ← Change label
```

### About Blurb & SG Letter
Edit the `<p>` paragraphs in the About and Letter sections directly in the file.

---

## 7. About Page

**File:** `src/pages/about.astro`

Edit the history paragraph and timeline items directly in the HTML. Each timeline entry:

```astro
<div class="timeline-item">
    <div class="timeline-year">2005</div>
    <div class="timeline-content">
        <h3>The Beginning</h3>
        <p>Description text here...</p>
    </div>
</div>
```

---

## 8. Conference Page

**File:** `src/pages/conference.astro`

### Coming Soon Toggle

At the very top of the file (line 7) there is a single variable that controls whether the page shows the **"Coming Soon"** screen or the **full conference details**:

```js
// Set to true  → visitors see the "Coming Soon" card
// Set to false → visitors see the hero, bento info cards, and schedule tables
const showComingSoon = true;
```

To **publish the full schedule**, change `true` to `false`, save the file, and deploy:

```js
const showComingSoon = false;
```

To **bring the Coming Soon screen back**, change it back to `true`.

> **No other changes are needed.** Both layouts live in the same file — the toggle simply switches between them at build time.

### Editing the Schedule

When `showComingSoon` is `false`, edit the schedule table rows (times and events) and the bento info cards (Venue, Dress Code, Registration) directly in the HTML below the toggle.
Update the Google Forms registration link when ready.

---

## 9. Logo

**File:** `public/images/logo.webp`

Replace this file with your new logo (keep the filename as `logo.webp`).
It appears in the top-left of the navigation bar on every page.

---

## 10. Quick Reference Table

| What to change | File to edit |
|---|---|
| Committee names & mandate text | `src/data/committees.json` |
| Committee dais (EB members, bios) | `src/data/committee-dais.json` |
| Team descriptions & member names | `src/data/teams.json` |
| Home page text & SG letter | `src/pages/index.astro` |
| Stats numbers | `src/pages/index.astro` |
| About page text & timeline | `src/pages/about.astro` |
| Conference schedule & Coming Soon toggle | `src/pages/conference.astro` (change `showComingSoon`) |
| Logo | `public/images/logo.webp` |
| Committee member photos | `public/images/committees/COMMITTEE_ID/` |
| Team member photos | `public/images/team/TEAM_ID/` |
| Page hero backgrounds | `public/images/miscellaneous/` |


