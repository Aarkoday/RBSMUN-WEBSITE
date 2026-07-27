# RBSMUN Website — Content Editing Guide

This guide covers every place where you need to add real text, images, and data to the website.
No coding knowledge is required for most of these edits — just find the right file and replace the placeholder text.

---

## Table of Contents

1. [General Rules](#1-general-rules)
2. [Images — Where to Put Them](#2-images--where-to-put-them)
3. [Home Page](#3-home-page)
4. [About Page](#4-about-page)
5. [Committees Page](#5-committees-page)
6. [Committee Dais Members](#6-committee-dais-members)
7. [Conference Page](#7-conference-page)
8. [Team Page](#8-team-page)
9. [Team Members Data](#9-team-members-data)
10. [Logo](#10-logo)
11. [Quick Reference Table](#11-quick-reference-table)

---

## 1. General Rules

- All page files are in `src/pages/`
- All images go in `public/images/` (see section 2)
- After editing any file, save it and the browser will auto-refresh (dev server must be running)
- To start the dev server: open a terminal in the project folder and run `npm run dev`

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
│   └── (any other misc photos)
├── committees/
│   ├── jcc/                         ← Photos for JCC committee dais
│   │   ├── chair.jpg                ← Chairperson photo
│   │   ├── vice-chair.jpg           ← Vice Chairperson photo
│   │   ├── moderator.jpg            ← Moderator photo
│   │   └── eb-group.webp             ← Group photo shown in committee overlay header
│   ├── disec/                       ← Same structure for every committee
│   ├── ecofin/
│   ├── ... (one folder per committee)
│   └── ipc/
│       ├── editor-in-chief.jpg
│       ├── editor1.jpg
│       ├── editor2.jpg
│       └── editor3.jpg
└── team/
    ├── secretariat/                 ← Photos for Secretariat team members
    │   ├── sg.jpg                   ← Secretary-General photo
    │   ├── dsg1.jpg                 ← Deputy SG 1 photo
    │   ├── dsg2.jpg                 ← Deputy SG 2 photo
    │   └── cd.jpg                   ← Crisis Director photo
    ├── logistics/
    │   ├── head1.webp
    │   ├── head2.webp
    │   ├── core1.webp
    │   └── ... (see section 9 for exact filenames)
    ├── it/
    ├── art/
    ├── media/
    └── photography/
```

> **Important:** Image filenames are **case-sensitive**. `Chair.jpg` ≠ `chair.jpg`. Use lowercase.
> Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`

---

## 3. Home Page

**File:** `src/pages/index.astro`

### Hero Background Image
The large photo behind "RBSMUN 2026" is `public/images/miscellaneous/PMS01512.webp`.
To change it, replace that file with your new photo (keep the same filename), **or** edit line 29 in `index.astro`:

```astro
style={`background-image: url('${base}/images/miscellaneous/YOUR-NEW-IMAGE.webp'); ...`}
```

### Stats Numbers
Around lines 48–68, find the `data-target` attributes and change the numbers:

```astro
<span class="stat-number" data-target="21">0</span>   ← Change 21 to correct number
<span class="stat-label">Iterations</span>              ← Change label text
```

### About Blurb (3 paragraphs on home page)
Around lines 86–97, edit the three `<p>` paragraphs directly.

### Secretary-General Letter
Around lines 115–130:

```astro
<p class="letter-greeting">Dearest Delegates and Faculty Advisors,</p>
<p class="letter-text">It is with great pride...</p>
```

Update the signature block with the real name:

```astro
<p class="signature-name">The Secretary-General</p>  ← Put SG's real name here
<p class="signature-title">RBSMUN 2026</p>
```

---

## 4. About Page

**File:** `src/pages/about.astro`

### Main History Paragraph
Around lines 47–60, the long paragraph about RBSMUN history. Edit the text inside the `<p>` tags directly.

### Timeline (History Section)
Look for `<div class="timeline">`. Each entry follows this pattern:

```astro
<div class="timeline-item">
    <div class="timeline-year">2005</div>
    <div class="timeline-content">
        <h3>The Beginning</h3>
        <p>Description text here...</p>
    </div>
</div>
```

Add, edit, or remove timeline items by copying this pattern.

---

## 5. Committees Page

**File:** `src/pages/committees.astro`

### Committee Cards (the clickable tiles in the grid)
Each committee is a block starting around line 51. Here's a full example:

```astro
<div
    class="glass-card committee-logo-card"
    data-committee="jcc"
    data-fullname="Joint Crisis Committee"
    data-guide-url="https://your-link-to-background-guide.pdf"
    style="--bg-url: url('https://images.unsplash.com/...');"
>
    <div class="card-glow"></div>
    <h2 class="committee-massive-acronym">JCC</h2>
</div>
```

| Attribute | What it does |
|---|---|
| `data-committee` | Lowercase key — must match the folder in `public/images/committees/` |
| `data-fullname` | Full committee name shown in the overlay panel |
| `data-guide-url` | URL to the committee's Background Guide PDF |
| `data-mandate1` | First paragraph of the Committee Mandate shown inside the expanded overlay panel |
| `data-mandate2` | Optional second paragraph of the Committee Mandate shown in the overlay panel |
| `<h2>` text | The acronym displayed on the card |

**To add a new committee:**
1. Copy an existing block
2. Update all the attributes above
3. Create `public/images/committees/NEWKEY/`
4. Add the dais member data in `Layout.astro` (see section 6)

---

## 6. Committee Dais Members

**File:** `src/layouts/Layout.astro`  
**Location:** Around **line 517** — search for `committeeDaisData`

### Default Dais (used by all committees not specifically listed)

```js
const defaultDais = [
    { name: "To be announced", role: "Chairperson",      img: "chair.jpg",      desc: "Write a short bio here" },
    { name: "To be announced", role: "Vice Chairperson", img: "vice-chair.jpg", desc: "Write a short bio here" },
    { name: "To be announced", role: "Moderator",        img: "moderator.jpg",  desc: "Write a short bio here" }
];
```

Replace `"To be announced"` with real names when ready.

### Committee-Specific Dais (for committees with different roles)

```js
const committeeDaisData = {
    ipc: [
        { name: "Firstname Lastname", role: "Editor in Chief", img: "editor-in-chief.jpg", desc: "Bio here" },
        { name: "Firstname Lastname", role: "Editor",          img: "editor1.jpg",         desc: "Bio here" },
    ],

    // To override a committee's default dais, add it here:
    jcc: [
        { name: "Firstname Lastname", role: "Chairperson",      img: "chair.jpg",      desc: "" },
        { name: "Firstname Lastname", role: "Vice Chairperson", img: "vice-chair.jpg", desc: "" },
        { name: "Firstname Lastname", role: "Moderator",        img: "moderator.jpg",  desc: "" }
    ],
};
```

The `img` filename must match a file inside `public/images/committees/COMMITTEE_KEY/`.

---

## 7. Conference Page

**File:** `src/pages/conference.astro`

Edit the schedule table (dates, times, events) and any venue/location information directly in the HTML.
Look for the Google Forms link and update it:

```astro
href="https://docs.google.com/forms/..."
```

---

## 8. Team Page

**File:** `src/pages/team.astro`

### Department Cards (the tiles you click to expand)
Each department card has a description attribute. Find the card by its `data-team` value:

```astro
<div
    class="glass-card team-card"
    data-team="secretariat"
    data-team-title="Secretariat"
    data-team-desc="Write a description of this team here. It will appear in the expanded panel when the card is clicked."
>
```

Edit `data-team-desc` with a real description for each department.

---

## 9. Team Members Data

**File:** `src/layouts/Layout.astro`  
**Location:** Around **line 633** — search for `teamMembersData`

### Full structure

```js
const teamMembersData = {

    secretariat: {
        heads: [
            { name: "Firstname Lastname", role: "Secretary-General",        img: "sg.jpg",   desc: "Bio text here" },
            { name: "Firstname Lastname", role: "Deputy Secretary-General", img: "dsg1.jpg", desc: "" },
            { name: "Firstname Lastname", role: "Deputy Secretary-General", img: "dsg2.jpg", desc: "" },
            { name: "Firstname Lastname", role: "Crisis Director",          img: "cd.jpg",   desc: "" }
        ],
        core: []  // Secretariat has no core members
    },

    logistics: {
        heads: [
            { name: "Firstname Lastname", role: "Head of Logistics", img: "head1.webp", desc: "" },
            { name: "Firstname Lastname", role: "Head of Logistics", img: "head2.webp", desc: "" },
        ],
        core: [
            { name: "Firstname Lastname", role: "Core Logistics", img: "core1.webp", desc: "" },
            { name: "Firstname Lastname", role: "Core Logistics", img: "core2.webp", desc: "" },
            // Add more core members here
        ]
    },

    it:          { heads: [...], core: [...] },
    art:         { heads: [...], core: [...] },
    media:       { heads: [...], core: [...] },
    photography: { heads: [...], core: [...] }

};
```

### Photo path logic
`img: "head1.webp"` → resolves to `public/images/team/TEAM_KEY/head1.webp`

For example, `secretariat` → `sg.jpg` → `public/images/team/secretariat/sg.jpg`

### Adding more members
Add more objects to the `core` array. Each needs a unique `img` filename with a corresponding file in the correct folder.

---

## 10. Logo

**File:** `public/images/logo.webp`

Replace this file with your new logo (keep the filename as `logo.webp`).
It appears in the top-left of the navigation bar on every page.

---

## 11. Quick Reference Table

| What to change | File | Location |
|---|---|---|
| Hero background (home) | `public/images/miscellaneous/PMS01512.webp` | Replace the file |
| Home page text & SG letter | `src/pages/index.astro` | Lines 86–130 |
| Stats numbers | `src/pages/index.astro` | Lines 48–68 |
| About page text & timeline | `src/pages/about.astro` | Lines 40+ |
| Committee cards (name, PDF) | `src/pages/committees.astro` | Lines 51+ |
| Committee dais members | `src/layouts/Layout.astro` | Line ~517 |
| Team department descriptions | `src/pages/team.astro` | `data-team-desc` attributes |
| Team member names & photos | `src/layouts/Layout.astro` | Line ~633 |
| Logo | `public/images/logo.webp` | Replace file |
| Committee member photos | `public/images/committees/KEY/filename.jpg` | Add image files |
| Team member photos | `public/images/team/KEY/filename.jpg` | Add image files |
