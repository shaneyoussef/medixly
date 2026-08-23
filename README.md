# Medixly — Patient Portal

The patient-facing web surface for **Medixly**, a pharmacy management platform
built for Old Park Pharmacy (1442 Bloor Street West, Toronto).

Patients can refill or transfer a prescription, message a pharmacist, start a
minor ailment assessment, book a vaccine and apply for copayment assistance —
all online, with a pharmacist reviewing every request the same day.

**Live site:** https://shaneyoussef.github.io/medixly/

---

## What's in here

| Folder | What it is |
|---|---|
| `docs/` | **The website.** Plain HTML, CSS and JavaScript. Responsive — works on phone, tablet and desktop. This is what GitHub Pages publishes. |
| `design/` | **The original mockups.** Claude Design canvas artboards (`.dc.html`) plus the Medixly design system tokens. Reference material, not part of the published site. |

Nothing needs to be installed or compiled.

---

## Pages

| Page | File |
|---|---|
| Home | `docs/index.html` |
| Sign in / create account / reset password | `docs/signin.html` |
| Message a pharmacist | `docs/chat.html` |
| Your profile | `docs/profile.html` |
| Prescriptions | `docs/prescriptions.html` |
| Pharmacy clinic | `docs/clinic.html` |

---

## Responsive behaviour

The layout adapts at two breakpoints:

| Screen | Navigation | Service cards | Page layout |
|---|---|---|---|
| **Phone** (under 640px) | Bottom tab bar | Shingled stack — cards tuck under one another | Single column |
| **Tablet** (640–1023px) | Bottom tab bar | 2-column grid | Single column, wider gutters |
| **Desktop** (1024px and up) | Left side rail | 3-column grid | Two columns with a sticky sidebar |

Headings scale fluidly with `clamp()` rather than jumping at breakpoints, so the
big "Hello" fits a 320px phone and a 1440px monitor without a separate rule for
each. Safe-area insets are respected on notched phones, and no page scrolls
sideways at any width.

---

## Design system

Colours, type, spacing, radius and shadows are CSS custom properties defined at
the top of `docs/assets/css/medixly.css`. They mirror the tokens in
`design/_ds/.../tokens/`. Change a value there and it updates everywhere.

| Token | Value | Used for |
|---|---|---|
| `--paper-1` | `#F3F2EF` | Page background |
| `--ink-1` | `#1C1D1B` | Primary text, buttons |
| `--sand` | `#D9BF9F` | Prescription cards |
| `--sage` | `#96A28E` | Transfers, insurance |
| `--amber` | `#E0A971` | Copayment |
| `--clay` | `#C28B79` | Refills |
| `--mist` | `#E1E1DE` | Minor ailment |
| `--slate-blue` | `#9AA7B4` | Vaccines |

Typeface is [Archivo](https://fonts.google.com/specimen/Archivo) via Google
Fonts, falling back to Helvetica Neue / Arial.

---

## Compliance notes

Every patient form in this product is a regulated artefact. The design carries
that in the layout, not as a footnote:

- **Canada — PIPEDA.** Secure delivery via Hushmail for Healthcare.
- **USA — HIPAA.** Secure delivery via Paubox.
- A **mandatory consent checkbox** gates submission on every form.
- A **lock-icon trust badge** sits beside every submit button.

Keep both when adding new forms.

---

## Running it locally

Any static file server works. With Python installed:

```
cd docs
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

Opening the files directly by double-clicking mostly works, but browsers block
JavaScript modules on `file://`, so use the server above if the cards don't
appear.

---

## Publishing

The site is served by GitHub Pages straight from the `docs/` folder — no build,
no workflow. To turn it on: **Settings → Pages → Source: Deploy from a branch →
Branch: `main`, folder: `/docs` → Save.**

Every push to `main` republishes automatically.

---

## Editing content

Card content lives in a small JavaScript array at the bottom of each page — the
title, the subtitle, the colour, and what shows in the detail sheet when you tap
it. To change a service, edit that array. No templating language, no build step.

```js
{
  tone: 'clay',                          // colour: sand sage amber mist clay slate
  icon: 'refresh',                       // icon name
  title: 'Refill a prescription',
  meta: 'Online or by phone',
  detail: {
    kicker: 'Prescription service',
    title: 'Refill a prescription',
    meta: 'Running low? Refill your existing medications online or by phone.',
    rows: [['Typical turnaround', 'Same day']],
    actionLabel: 'Start a refill',
    href: 'prescriptions.html'
  }
}
```

---

## The mockups in `design/`

These are Claude Design canvas artboards. They run in a browser but need
`support.js` alongside them, and they render inside a fixed iPhone frame
(402 × 874) — they are not responsive by design. They are kept as the visual
source of truth for the rebuild in `docs/`.

`design/Sign In Sign Up.dc.html` is an exploration board showing four sign-in
layout directions. The published site uses direction **1b — split screen with
brand panel**, collapsing to the stacked mobile layout below 1024px.

---

## Licence

MIT — see [LICENSE](LICENSE).
