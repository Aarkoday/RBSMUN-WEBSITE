# RBSMUN Website Image Assets Directory Guide

Organize all website images in this directory (`public/images/`). Follow the exact folder naming and file naming conventions below so photos display automatically across the site without changing any code.

---

## Directory Skeleton

```
public/
└── images/
    ├── logo.webp                       # Main Website Logo (top navbar & footer)
    │
    ├── miscellaneous/                  # Hero Page Background Images
    │   ├── PMS01512.webp               # Home Page Hero Background Image
    │   ├── About+us+pg+background.webp # About Us Hero Background Image
    │   ├── PMS01025.webp               # Conference Details Hero Background Image
    │   ├── committees.webp             # Committees Hero Background Image
    │   ├── RBS+MUN+Posts+Bg.webp       # Our Team Hero Background Image
    │   └── hero-bg.png
    │
    ├── committees/                     # Committee Specific Folders (15 Committees)
    │   ├── ipc/                        # International Press Corps (IPC)
    │   │   ├── logo.webp                # Official Committee Crest / Logo
    │   │   ├── card-bg.jpg             # Card background photo on committee grid
    │   │   ├── eb-group.webp            # Executive Board Group Photo
    │   │   ├── editor-in-chief.jpg     # 1 Editor in Chief photo
    │   │   ├── editor1.jpg             # Editor 1 photo
    │   │   ├── editor2.jpg             # Editor 2 photo
    │   │   └── editor3.jpg             # Editor 3 photo
    │   │
    │   ├── [other_committees]/         # e.g., jcc, disec, etc.
    │   │   ├── logo.webp
    │   │   ├── card-bg.jpg
    │   │   ├── eb-group.webp
    │   │   ├── chair.jpg               # Chairperson photo
    │   │   ├── vice-chair.jpg          # Vice Chairperson photo
    │   │   └── moderator.jpg           # Moderator photo
    │   │
    │   └── ...
    │
    └── team/                           # Department & Team Member Folders
        ├── secretariat/                # Executive Leadership & Secretariat Team
        │   ├── card-bg.jpg             # Department cover photo
        │   ├── sg.jpg                  # Secretary General photo
        │   ├── dsg1.jpg                # Deputy Secretary General 1 photo
        │   ├── dsg2.jpg                # Deputy Secretary General 2 photo
        │   ├── cd.jpg                  # Crisis Director photo
        │   └── team-group.webp          # Secretariat Group Photo
        │
        ├── logistics/                  # Logistics Department (3 Heads, 5 Core members)
        │   ├── card-bg.jpg
        │   ├── head1.webp               # Head of Logistics 1
        │   ├── head2.webp               # Head of Logistics 2
        │   ├── head3.webp               # Head of Logistics 3
        │   ├── core1.webp               # Core Logistics member 1
        │   ├── core2.webp               # Core Logistics member 2
        │   ├── core3.webp               # Core Logistics member 3
        │   ├── core4.webp               # Core Logistics member 4
        │   ├── core5.webp               # Core Logistics member 5
        │   └── team-group.webp          # Full Logistics Team Group Photo
        │
        ├── it/                         # Information Technology (IT) Department (1 Head, 2 Core members)
        │   ├── card-bg.jpg
        │   ├── head.webp                # Head of IT
        │   ├── core1.webp               # Core IT member 1
        │   ├── core2.webp               # Core IT member 2
        │   └── team-group.webp          # Full IT Team Group Photo
        │
        ├── art/                        # Art & Design Department (3 Heads)
        │   ├── card-bg.jpg
        │   ├── head1.webp               # Head of Art 1
        │   ├── head2.webp               # Head of Art 2
        │   ├── head3.webp               # Head of Art 3
        │   └── team-group.webp          # Full Art Team Group Photo
        │
        ├── media/                      # Media & Communications Department (3 Heads)
        │   ├── card-bg.jpg
        │   ├── head1.webp               # Head of Media 1
        │   ├── head2.webp               # Head of Media 2
        │   ├── head3.webp               # Head of Media 3
        │   └── team-group.webp          # Full Media Team Group Photo
        │
        └── photography/                # Photography Department (1 Head, 4 team members)
            ├── card-bg.jpg
            ├── head.webp                # Head of Photography
            ├── core1.webp               # Photography Team member 1
            ├── core2.webp               # Photography Team member 2
            ├── core3.webp               # Photography Team member 3
            ├── core4.webp               # Photography Team member 4
            └── team-group.webp          # Full Photography Team Group Photo
```

---

## Committee Assets Preset Naming Table

| Committee | Asset Type | File Name | Format | Target Path |
| :--- | :--- | :--- | :--- | :--- |
| **IPC** | **Editor in Chief** | `editor-in-chief.jpg` | JPG / WebP | `public/images/committees/ipc/editor-in-chief.jpg` |
| **IPC** | **Editors** | `editor1.jpg`, `editor2.jpg`, `editor3.jpg` | JPG / WebP | `public/images/committees/ipc/editor[1-3].jpg` |
| **Others** | **Chairperson** | `chair.jpg` | JPG / WebP | `public/images/committees/[id]/chair.jpg` |
| **Others** | **Vice Chairperson** | `vice-chair.jpg` | JPG / WebP | `public/images/committees/[id]/vice-chair.jpg` |
| **Others** | **Moderator** | `moderator.jpg` | JPG / WebP | `public/images/committees/[id]/moderator.jpg` |
| **All** | **Committee Logo / Crest** | `logo.webp` | PNG / WebP / SVG | `public/images/committees/[id]/logo.webp` |
| **All** | **EB Group Photo** | `eb-group.webp` | JPG / WebP | `public/images/committees/[id]/eb-group.webp` |
| **All** | **Grid Card BG** | `card-bg.jpg` | JPG / WebP | `public/images/committees/[id]/card-bg.jpg` |

---

## Department & Team Assets Preset Naming Table

| Department | Head Photo(s) | Core Member / Team Photo(s) | Target Path |
| :--- | :--- | :--- | :--- |
| **Secretariat** | `sec-gen.jpg`, `director-gen.jpg` | `deputy-sec-gen.jpg` | `public/images/team/secretariat/` |
| **Logistics** | `head1.webp`, `head2.webp`, `head3.webp` | `core1.webp`, ..., `core5.webp` | `public/images/team/logistics/` |
| **IT** | `head.webp` | `core1.webp`, `core2.webp` | `public/images/team/it/` |
| **Art & Design** | `head1.webp`, `head2.webp`, `head3.webp` | (None) | `public/images/team/art/` |
| **Media & Comm.** | `head1.webp`, `head2.webp`, `head3.webp` | (None) | `public/images/team/media/` |
| **Photography** | `head.webp` | `core1.webp`, ..., `core4.webp` | `public/images/team/photography/` |
