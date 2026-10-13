# Wheels on Fire

Wheels on Fire is a responsive, multi-page website for car enthusiasts. It presents John O’Reilly’s car collection, an About page, an archived community event, and a contact-form demonstration. Built by the RDE Team with HTML, CSS, and vanilla JavaScript, the project focuses on clear navigation, responsive layouts, and accessible browser interactions.

## Key features

- **Car collection:** Three vehicle cards with photographs, model names, model years, fuel types, and prices, alongside a brand-logo gallery.
- **Collection filters:** Search by make, model, and price range. Model options update with the selected make; results include a count, an empty-state message, and a reset action.
- **Video introduction:** A muted, looping hero video with a link to the collection.
- **About page:** Background information about the collector and the community behind the website.
- **Events archive:** Details of the Dublin car meet dated 26 November 2025, clearly marked as a past event with a closed offer.
- **Contact validation demo:** Required-field, whitespace, and email checks with field-specific errors and a validation status message.
- **Shared page layout:** Consistent navigation and footers, with the footer reaching the viewport bottom on short pages and scrolling below content on longer pages.
- **Legacy URL support:** `events_offers.html` redirects to the current Offers page and provides a fallback link.

## Tech stack

| Technology | Purpose |
| --- | --- |
| HTML5 | Page structure, semantic landmarks, forms, and embedded video |
| CSS | Shared styling, Grid and Flexbox layouts, media queries, and focus states |
| Vanilla JavaScript | DOM-based car filtering and client-side form validation |
| Local media | JPEG photographs, PNG/SVG logos, an SVG favicon, and MP4 video |
| Git | Version history and team collaboration |

The site has no framework, package dependencies, build step, backend, or database. Python is optional tooling for the local server described below; it is not part of the website runtime.

## Project structure

```text
WebDev_Project_RDE/
├── index.html                 # Home page and car collection
├── events_offers.html         # Redirect to the Offers archive
├── pages/
│   ├── about.html
│   ├── contact.html
│   └── offers.html
├── css/
│   └── style.css              # Shared styles and responsive layouts
├── script/
│   └── main.js                # Car filters and contact validation
├── media/
│   ├── audi-7.svg
│   ├── BMW.svg.png
│   ├── favicon.svg
│   ├── ferrari-4.svg
│   ├── hero-short.mp4
│   ├── jaguar-cars.svg
│   ├── kia.jpg
│   ├── kia.svg
│   ├── land copy.svg
│   ├── land-rover.jpg
│   ├── land.svg
│   ├── lexus.svg
│   ├── mazda.jpg
│   ├── mazda.svg
│   └── offers-background.jpg
├── 2ndEmail.docx
├── 3rdEmail.docx
├── CA5_email.docx
├── Email to client .docx
└── README.md
```

The Word documents are supporting project documents, not website runtime files. Some SVG assets are retained in the media folder without being referenced by the current pages.

## Getting started

Use a modern web browser. To serve the site locally with the command below, install Python 3. Git is needed only if you clone the repository rather than download it.

1. Clone your team's repository or fork, then open its `WebDev_Project_RDE` directory. If you already have a checkout, use that directory.
2. From the project root, start a local static server:

   ```sh
   python3 -m http.server 8000 --bind 127.0.0.1
   ```

3. Open [the local home page](http://127.0.0.1:8000/index.html) in your browser.
4. Stop the server with `Ctrl+C` when finished.

No installation command, environment variables, credentials, or build process is required. Keep the folder structure intact so relative asset and navigation paths resolve correctly. You can also use another static server rooted at the project directory.

To explore the implementation, start with [index.html](index.html), [the shared stylesheet](css/style.css), and [the JavaScript](script/main.js).

## Responsive design and accessibility

- **Responsive layouts:** Media queries adapt navigation, filters, grids, typography, and contact-form dimensions for narrow, tablet, and desktop viewports.
- **Footer placement:** A column Flexbox page layout uses `100vh` as a fallback for `100dvh`, with a flexible main element. Footers stay in normal document flow rather than overlaying content.
- **Keyboard navigation:** Each main page has a visible-on-focus skip link, a focusable main landmark, and explicit focus indicators. Scroll spacing helps keep focused content clear of the sticky header, which becomes static on narrow or short viewports.
- **Page orientation:** Descriptive titles, labelled navigation landmarks, and `aria-current="page"` identify the current page.
- **Form feedback:** Labels are associated with controls; error descriptions, `aria-invalid`, and polite status announcements communicate validation results. Invalid submissions focus the first field requiring attention.
- **Control contrast:** Select, input, and textarea borders use `#767676`, providing approximately **4.54:1** contrast against white.
- **Media handling:** Collection and logo images have alternative text, explicit dimensions, and native lazy loading.
- **Reduced motion:** Decorative transitions and transforms are reduced, and search results scroll immediately when reduced motion is requested. The hero video is an exception, noted below.
- **JavaScript fallback:** The full collection remains visible without JavaScript. Filtering and the contact check button remain disabled, with explanatory messages.

These are implemented improvements, not a claim of complete accessibility conformance.

## Testing and QA

Development regression checks covered the Home, About, Contact, and Offers pages in desktop Chrome at **375px, 768px, and 1440px** viewport widths. Checks included responsive layout, footer placement, filtering, form validation, keyboard focus, asset loading, and the legacy Offers redirect. These viewport checks do not establish support across all browsers or physical devices.

The repository does not include an automated test runner or committed QA scripts. To repeat the main checks, serve the site locally and use browser developer tools to test each width:

| Area | Checks and expected results |
| --- | --- |
| Layout | No horizontal overflow or clipped content. The footer ends at the document bottom, reaches the viewport bottom on short pages, and does not overlap content. |
| Navigation | Main navigation, Back to Home, the collection anchor, and the legacy Offers redirect reach their intended destinations. |
| Filters | Kia → Sportage returns one car; a price range of €0–€20,000 returns no cars; Reset restores all three cards. Changing make clears an incompatible model selection. |
| Contact form | Empty and whitespace-only fields show errors. An invalid email is rejected. Valid details produce a message explicitly stating that nothing was sent or saved. |
| Keyboard | Tab reveals the skip link and visible focus indicators. Enter activates the skip link; focused controls remain visible. |
| Motion and fallback | Reduced-motion settings remove decorative transitions and smooth search scrolling. With JavaScript disabled, the full collection and explanatory messages remain available. |
| Assets and console | Images, styles, scripts, favicon, and video load without missing-resource errors or JavaScript exceptions. |

Before submitting changes, check for whitespace errors:

```sh
git diff --check
```

## Screenshots

No website screenshots are currently committed to this repository. The following are placeholders for future captures; the files in `media/` are site assets rather than page screenshots.

| Planned screenshot | Status |
| --- | --- |
| Desktop home page and collection at 1440px | To be added |
| Mobile collection and filters at 375px | To be added |
| About page footer at 768px | To be added |
| Contact form with validation feedback | To be added |
| Archived event page | To be added |

## Team collaboration and contributions

The website identifies its creators as the **RDE Team**. The Git history records contributions from multiple authors and provides attribution for individual changes; this README does not assign unverified roles or responsibilities.

When contributing, keep changes focused, reuse the shared stylesheet and script where appropriate, and check all four pages at the documented viewport widths. Include the purpose of the change and relevant validation results in the team's review process.

To inspect contributions locally:

```sh
git shortlog -sn HEAD
git log --oneline
```

## Known limitations

- **The contact form is a demo.** It validates details in the browser only. There is no delivery service or application storage, and no message is sent or saved by the site.
- **The collection is static.** Filtering uses the three cards and their `data-*` attributes in `index.html`; there is no inventory API or database.
- **Location filtering is unavailable.** The location control is intentionally disabled and accompanied by an explanation.
- **Events and offers are archived.** Ticket purchases and calendar downloads are unavailable for the past event.
- **Social names are placeholders.** Footer social items are text, not working profile links.
- **The hero video autoplays and loops without a pause control.** It continues playing under reduced-motion preferences.
- **Browser coverage is limited.** The documented Chrome checks are not a full cross-browser, assistive-technology, or accessibility audit.
