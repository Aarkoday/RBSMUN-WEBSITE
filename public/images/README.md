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
    │   ├── jcc/                        # Joint Crisis Committee
    │   │   ├── logo.png                # Official Committee Crest / Logo
    │   │   ├── card-bg.jpg             # Card background photo on committee grid
    │   │   ├── eb-group.jpg            # Executive Board Group Photo
    │   │   ├── chair.jpg               # Chairperson photo
    │   │   ├── vice-chair.jpg          # Vice Chairperson photo
    │   │   └── moderator.jpg           # Moderator photo
    │   │
    │   ├── disec/                      # DISEC Committee
    │   │   ├── logo.png
    │   │   ├── card-bg.jpg
    │   │   ├── eb-group.jpg
    │   │   ├── chair.jpg
    │   │   ├── vice-chair.jpg
    │   │   └── moderator.jpg
    │   │
    │   ├── ecofin/                     # ECOFIN Committee
    │   ├── icj/                        # ICJ Committee
    │   ├── irc/                        # Imperial Romanov Court (IRC)
    │   ├── who/                        # World Health Organization (WHO)
    │   ├── hor/                        # House of Representatives (HoR)
    │   ├── gcmr/                       # Grand Convocation of the Mythical Realms (GCMR)
    │   ├── unsc/                       # UN Security Council (UNSC)
    │   ├── picc/                       # Paris International Conference on Cambodia (PICC)
    │   ├── unwomen/                    # UN Women
    │   ├── hrc/                        # Human Rights Council (HRC)
    │   ├── uscc/                       # US Senate (USCC)
    │   ├── sochum/                     # SOCHUM
    │   └── ipc/                        # International Press Corps (IPC)
    │
    └── team/                           # Department & Team Member Folders
        ├── secretariat/                # Executive Leadership & Secretariat Team
        │   ├── card-bg.jpg             # Department cover photo
        │   ├── sec-gen.jpg             # Secretary General photo
        │   ├── director-gen.jpg        # Director General photo
        │   ├── deputy-sec-gen.jpg      # Deputy Secretary General photo
        │   └── team-group.jpg          # Secretariat Group Photo
        │
        ├── logistics/                  # Logistics Department
        │   ├── card-bg.jpg
        │   ├── head.jpg                # Head of Logistics photo
        │   └── team-group.jpg          # Full Logistics Team Group Photo
        │
        ├── it/                         # Information Technology (IT) Department
        │   ├── card-bg.jpg
        │   ├── head.jpg                # Head of IT photo
        │   └── team-group.jpg          # Full IT Team Group Photo
        │
        ├── art/                        # Art & Design Department
        │   ├── card-bg.jpg
        │   ├── head.jpg                # Head of Art photo
        │   └── team-group.jpg          # Full Art Team Group Photo
        │
        ├── media/                      # Media & Communications Department
        │   ├── card-bg.jpg
        │   ├── head.jpg                # Head of Media photo
        │   └── team-group.jpg          # Full Media Team Group Photo
        │
        └── photography/                # Photography Department
            ├── card-bg.jpg
            ├── head.jpg                # Head of Photography photo
            └── team-group.jpg          # Full Photography Team Group Photo
```

---

## Committee Assets Preset Naming Table

| Asset Type | File Name | Format | Target Path |
| :--- | :--- | :--- | :--- |
| **Committee Logo / Crest** | `logo.png` | PNG / WebP / SVG | `public/images/committees/[id]/logo.png` |
| **EB Group Photo** | `eb-group.jpg` | JPG / WebP | `public/images/committees/[id]/eb-group.jpg` |
| **Chairperson** | `chair.jpg` | JPG / WebP | `public/images/committees/[id]/chair.jpg` |
| **Vice Chairperson** | `vice-chair.jpg` | JPG / WebP | `public/images/committees/[id]/vice-chair.jpg` |
| **Moderator** | `moderator.jpg` | JPG / WebP | `public/images/committees/[id]/moderator.jpg` |
| **Grid Card BG** | `card-bg.jpg` | JPG / WebP | `public/images/committees/[id]/card-bg.jpg` |

> **Note on Background Guides**: Study guides are linked to external URLs (e.g., Google Drive / PDF links) via the `data-guide-url="..."` attribute on each committee card in `committees.astro`, so local PDF files are not stored in the image directory.

---

## Department & Team Assets Preset Naming Table

| Department | Head Photo | Group Photo | Department Folder |
| :--- | :--- | :--- | :--- |
| **Secretariat** | `sec-gen.jpg`, `director-gen.jpg` | `team-group.jpg` | `public/images/team/secretariat/` |
| **Logistics** | `head.jpg` | `team-group.jpg` | `public/images/team/logistics/` |
| **Information Technology** | `head.jpg` | `team-group.jpg` | `public/images/team/it/` |
| **Art & Design** | `head.jpg` | `team-group.jpg` | `public/images/team/art/` |
| **Media & Communications** | `head.jpg` | `team-group.jpg` | `public/images/team/media/` |
| **Photography** | `head.jpg` | `team-group.jpg` | `public/images/team/photography/` |
