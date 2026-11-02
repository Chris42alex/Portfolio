# Chris Alex — Portfolio

A personal portfolio site built with plain **HTML, CSS and JavaScript**. There's no framework and no build step: open `index.html` in a browser and it runs.

## Folder structure

```
portfolio/
├── index.html            Page structure (all sections, in order)
├── css/
│   ├── base.css          Colours, fonts, reset, top menu, grid-paper background
│   ├── loader.css        "CHRIS DESIGNS" loading screen
│   ├── desk.css          About desk: ID badge, music player, résumé card, LED tiles, code editor, terminal
│   ├── about.css         Sticky note + "I build with AI" line
│   ├── work.css          Work window: folders, project READMEs, gallery, full-screen viewer
│   ├── contact.css       Contact section and sticky-note form
│   └── responsive.css    Tablet / phone layouts (keep this one last)
├── js/
│   ├── config.js         ★ YOUR CONTENT: text, links, projects, designs
│   ├── core.js           Shared helper ($), name/role, ID badge tilt, scroll reveal
│   ├── loader.js         Loading-screen animation
│   ├── desk.js           Terminal typing, Figma/Claude LED tiles, résumé card, palette, code editor
│   ├── music.js          Lo-fi music player (sound generated in the browser)
│   ├── work.js           Work window: folders, READMEs, Web Design links, gallery + viewer
│   └── contact.js        Contact form steps, social buttons
└── assets/
    ├── images/chris.jpg  ID badge photo
    └── graphic/          Graphic Design images (+ thumbs/ for small previews)
```

**Rule of thumb:** to change *what* the site says, edit `js/config.js`. To change *how it looks*, edit the matching CSS file. To change *how it behaves*, edit the matching JS file.

## Common edits (all in `js/config.js`)

### Change your name, role or links
```js
name: "Chris Alex",
initials: "CA",
role: "Frontend Developer · UI/UX Designer · Graphic Designer",
resume: "https://drive.google.com/...",
links: { LinkedIn:"https://...", GitHub:"https://...", Behance:"https://...", Email:"mailto:you@example.com" },
```

### Add a project (Projects folder → README)
Add an item to the `items` list of the `"Projects"` folder:
```js
{ title:"My New App",
  desc:"One or two sentences about what it does.",
  tags:["React","Node.js"],
  features:["Real-time chat","Dark mode"],   // optional → "Highlights" section
  link:"https://my-app.com" }                // optional → "View project ↗" button
```

### Add a website (Web Design folder)
```js
{ title:"Client Name", link:"https://client-site.com" }
```

### Add a design (Graphic Design gallery)
1. Save the image as **WebP** in `assets/graphic/`, for example `my-poster.webp` (about 1600px on the long side).
2. Save a small copy with the same name in `assets/graphic/thumbs/` (about 640px).
3. Add a line to the Graphic Design `items` list:
```js
{ f:"my-poster", t:"My Poster Title", c:"Events" }   // c = filter group: "Banners", "Events" or "People"
```
Use a new `c` value and a new filter button appears automatically. Items in `"Banners"` are shown wide.

### Change the terminal lines, contact details or palette
Edit `terminal`, `card` (contact lines on the résumé card) or `swatches` / `tools` in `config.js`.

### Change the ID badge photo
Replace `assets/images/chris.jpg` with a new photo of the same name.

## Change colours and fonts
All colours and fonts are variables at the top of `css/base.css`:
```css
:root{
  --ink:#1f1f1f;  --paper:#f4f2ee;  --accent:#f4b942;  ...
}
```
Change `--accent` and every gold highlight updates.

## Adding a new section
1. Add the markup to `index.html`, for example `<section id="skills">…</section>`, between the existing sections.
2. Create `css/skills.css` and link it in `<head>` **before** `responsive.css`.
3. If it needs behaviour, create `js/skills.js` and add `<script src="js/skills.js" defer></script>` after `core.js`.
4. Add `<a href="#skills">Skills</a>` to the `<nav>`.
5. Put any text the section needs in `config.js` so it stays easy to edit.

## Notes for developers
- Scripts are classic scripts loaded with `defer`, in the order listed in `index.html`. They share globals such as `$`, `CONFIG` and `startReveals`, so **`config.js` and `core.js` must load first**. Classic scripts were used instead of ES modules so the site works when opened directly from disk (`file://`).
- Elements with the class `reveal` fade in when they scroll into view. The loader starts this after it finishes (`startReveals()` in `core.js`).
- Breakpoints live in `responsive.css`: at **≤1080px** the desk collage stacks into a column, and at **≤760px** (phones) only the ID badge and terminal remain and a Résumé button appears in the menu.
- The contact form has no server. It opens the visitor's email app with the message pre-filled (`js/contact.js`). To receive messages directly, point the form at a service such as Formspree.

## Publish
Drag the `portfolio` folder onto **app.netlify.com/drop**, or import it as a project on **vercel.com**. Any static host works.
