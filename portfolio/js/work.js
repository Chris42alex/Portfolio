/* Work section: Finder window, Projects READMEs, Web Design links, Graphic Design gallery + lightbox */

/* Finder */
const folderSVG = c => `<svg viewBox="0 0 96 78"><path d="M4 12a6 6 0 0 1 6-6h24l8 8h44a6 6 0 0 1 6 6v6H4z" fill="${c}" opacity=".75"/><rect x="4" y="20" width="88" height="54" rx="7" fill="${c}"/><rect x="4" y="20" width="88" height="6" fill="#fff" opacity=".2"/></svg>`;
const ROOT = "~/" + CONFIG.name.split(" ")[0].toLowerCase() + "/projects";
const THUMBS = ["linear-gradient(135deg,#6366f1,#22d3ee)","linear-gradient(135deg,#f97316,#facc15)",
                "linear-gradient(135deg,#10b981,#3b82f6)","linear-gradient(135deg,#ec4899,#8b5cf6)"];
const THUMB_COLORS = ["#7c8ee0","#e8a35c","#5fbf9a","#d97bb4","#8f7be0"];
const GALLERY_DIR = "assets/graphic/"; // full-size designs; small previews live in GALLERY_DIR + "thumbs/"
let openName = null, openItem = null;

function setActive(name){ document.querySelectorAll("#side button").forEach(b => b.classList.toggle("active", b.dataset.name === name)); }

function showRoot(){
  openName = openItem = null; setActive("All"); $("backBtn").disabled = true; $("finderPath").textContent = ROOT;
  $("main").innerHTML = `<div class="folders view"></div>`;
  CONFIG.folders.forEach(f => {
    const b = document.createElement("button"); b.className = "folder";
    b.innerHTML = folderSVG(f.color) + `<div>${f.name}</div><div class="count">${f.items.length} item${f.items.length>1?"s":""}</div>`;
    b.onclick = () => openFolder(f.name); $("main").firstChild.appendChild(b);
  });
}
function openFolder(name, quiet){
  const f = CONFIG.folders.find(x => x.name === name), gh = f.type === "github";
  openName = name; openItem = null; setActive(name); $("backBtn").disabled = false; $("finderPath").textContent = `${ROOT}/${name}`;
  if (gh){ // Projects: one sub-folder per repo, each opens a README
    $("main").innerHTML = `<div class="view" ${quiet ? 'style="animation:none"' : ""}>
                  <div class="view-head"><h3>${f.name}</h3></div>
      <div class="subfolders"></div></div>`;
    f.items.forEach((it, i) => {
      const b = document.createElement("button"); b.className = "folder"; b.style.animationDelay = (quiet ? 0 : i*70) + "ms";
            b.innerHTML = folderSVG(THUMB_COLORS[i % THUMB_COLORS.length]) + `<div>${it.title}</div>`;
      b.onclick = () => openReadme(name, it);
      $("main").querySelector(".subfolders").appendChild(b);
    });
    return;
  }
  if (f.type === "sites"){ // Web Design: folders link straight to the live sites
    $("main").innerHTML = `<div class="view" ${quiet ? 'style="animation:none"' : ""}>
      <div class="view-head"><h3>${f.name}</h3></div>
      <div class="subfolders">${f.items.map((it, i) => `<a class="folder" href="${it.link}" target="_blank" rel="noopener"
        style="text-decoration:none;animation-delay:${i*70}ms" title="Open ${it.title}">${folderSVG(THUMB_COLORS[(i+1) % THUMB_COLORS.length])}
        <div>${it.title} ↗</div><div class="count">${new URL(it.link).hostname.replace("www.","")}</div></a>`).join("")}</div></div>`;
    return;
  }
  if (f.type === "gallery"){ renderGallery(f, "All", quiet); return; }
  const cards = f.items.map((it, i) => {
    const initials = it.title.split(/\s+/).map(w => w[0]).join("").slice(0,2).toUpperCase();
    const thumb = it.image ? `background-image:url('${it.image}')` : `background:${THUMBS[i % THUMBS.length]}`;
    return `<a class="file" href="${it.link}" target="_blank" rel="noopener" style="animation-delay:${quiet ? 0 : i*60}ms">
      <div class="thumb" style="${thumb}">${it.image ? "" : initials}<span class="kind">✦ design</span>
        <div class="cta"><span>View project</span><span>↗</span></div></div>
      <div class="info"><h4>${it.title}</h4><p>${it.desc}</p>
        <div class="tags">${(it.tags||[]).map(t => `<span>${t}</span>`).join("")}</div></div></a>`;
  }).join("");
  const more = f.more ? `<a class="file more" href="${f.more}" target="_blank" rel="noopener">See more on Behance ↗
    <small>${f.more.replace("https://","").replace("www.","")}</small></a>` : "";
  $("main").innerHTML = `<div class="view" ${quiet ? 'style="animation:none"' : ""}>
    <div class="view-head"><h3>${f.name}</h3><p>${f.desc}</p></div>
    <div class="files">${cards}${more}</div></div>`;
}
// Graphic Design gallery: filter chips, wide banners + poster grid, lightbox on click.
// Only the first GALLERY_PREVIEW designs show until "Show all" is pressed (the order comes from config.js).
const GALLERY_PREVIEW = 4;
let lbList = [], lbIndex = 0;
function renderGallery(f, filter, quiet, expanded = false){
  const groups = ["All", ...new Set(f.items.map(it => it.c))];
  const shown = f.items.filter(it => filter === "All" || it.c === filter);
  const visible = expanded ? shown : shown.slice(0, GALLERY_PREVIEW);
  lbList = shown; // the full-screen viewer can still step through every design in this filter
  const tile = (it, i) => `<button class="gtile${it.c === "Banners" ? " wide" : ""}" data-i="${i}" style="animation-delay:${quiet ? 0 : Math.min(i, 12)*40}ms">
      <img src="${GALLERY_DIR}thumbs/${it.f}.webp" alt="${it.t}" loading="lazy"
        onerror="this.onerror=null;this.src='${GALLERY_DIR}${it.f}.webp'"><span>${it.t}</span></button>`;
  const banners = visible.map((it, i) => [it, i]).filter(([it]) => it.c === "Banners");
  const posters = visible.map((it, i) => [it, i]).filter(([it]) => it.c !== "Banners");
  const toggle = shown.length > GALLERY_PREVIEW
    ? `<button class="show-all" id="showAll">${expanded ? "Show less ↑" : `Show all <small>${shown.length}</small> ↓`}</button>` : "";
  $("main").innerHTML = `<div class="view" ${quiet ? 'style="animation:none"' : ""}>
    <div class="view-head"><h3>${f.name}</h3></div>
    <div class="chips">${groups.map(g => `<button class="${g === filter ? "on" : ""}" data-g="${g}">${g}<small>${g === "All" ? f.items.length : f.items.filter(it => it.c === g).length}</small></button>`).join("")}
      ${f.more ? `<a class="all-link" href="${f.more}" target="_blank" rel="noopener">More on Behance ↗</a>` : ""}</div>
    ${banners.length ? `<div class="gbanners">${banners.map(([it, i]) => tile(it, i)).join("")}</div>` : ""}
    ${posters.length ? `<div class="gposters">${posters.map(([it, i]) => tile(it, i)).join("")}</div>` : ""}
    ${toggle}</div>`;
  $("main").querySelector(".chips").onclick = e => { const b = e.target.closest("[data-g]"); if (b) renderGallery(f, b.dataset.g, true); };
  $("main").querySelectorAll(".gtile").forEach(t => t.onclick = () => openLightbox(+t.dataset.i));
  if (toggle) $("showAll").onclick = () => {
    renderGallery(f, filter, true, !expanded);
    if (expanded) document.querySelector(".finder").scrollIntoView({ behavior:"smooth" }); // collapsing: jump back up
  };
}
function openLightbox(i){
  lbIndex = (i + lbList.length) % lbList.length;
  const it = lbList[lbIndex];
  $("lbImg").src = `${GALLERY_DIR}${it.f}.webp`; $("lbImg").alt = it.t;
  $("lbImg").classList.toggle("wide", it.c === "Banners");
  $("lbTitle").textContent = it.t; $("lbMeta").textContent = `${it.c} · ${lbIndex + 1} / ${lbList.length}`;
  $("lightbox").classList.add("open"); document.body.style.overflow = "hidden";
}
function closeLightbox(){ $("lightbox").classList.remove("open"); document.body.style.overflow = ""; }
const lbOpen = () => $("lightbox").classList.contains("open");
$("lbPrev").onclick = e => { e.stopPropagation(); openLightbox(lbIndex - 1); };
$("lbNext").onclick = e => { e.stopPropagation(); openLightbox(lbIndex + 1); };
$("lbClose").onclick = closeLightbox;
$("lightbox").onclick = e => { if (e.target.id === "lightbox" || e.target.classList.contains("lb-stage")) closeLightbox(); };
addEventListener("keydown", e => {
  if (!lbOpen()) return;
  if (e.key === "ArrowLeft") openLightbox(lbIndex - 1);
  if (e.key === "ArrowRight") openLightbox(lbIndex + 1);
  if (e.key === "Escape"){ closeLightbox(); e.stopImmediatePropagation(); } // don't also leave the folder
});
let swipeX = null; // swipe left/right on phones
$("lightbox").addEventListener("pointerdown", e => swipeX = e.clientX);
$("lightbox").addEventListener("pointerup", e => { if (swipeX !== null && Math.abs(e.clientX - swipeX) > 50) openLightbox(lbIndex + (e.clientX < swipeX ? 1 : -1)); swipeX = null; });

// A project's README: short description, tech stack, optional highlights; a "View project" button only if it has a link
function openReadme(name, it, quiet){
  openName = name; openItem = it; $("backBtn").disabled = false;
  const slug = it.title.replace(/\s+/g, "-");
  $("finderPath").textContent = `${ROOT}/${name}/${slug}`;
  const parts = [
    `<h1><span class="hash">#</span>${it.title}</h1>`,
    `<p>${it.desc}</p>`,
    it.tags && it.tags.length ? `<h2><span class="hash">##</span>Tech stack</h2><div>${it.tags.map(t => `<code>${t}</code>`).join("")}</div>` : "",
    it.features && it.features.length ? `<h2><span class="hash">##</span>Highlights</h2><ul>${it.features.map(x => `<li>${x}</li>`).join("")}</ul>` : "",
    `<div class="doc-cta">${it.link ? `<a class="cta-main" href="${it.link}" target="_blank" rel="noopener">View project <span>↗</span></a>` : ""}
      <button class="pg-btn ghost cta-back" id="readmeBack">← Back to ${name}</button></div>`
  ].filter(Boolean);
  $("main").innerHTML = `<div class="view" ${quiet ? 'style="animation:none"' : ""}><div class="doc">
    <div class="doc-tab">📄 README.md<span>projects/${slug}</span></div>
    <div class="doc-body">${parts.map((p, i) => quiet ? p : p.replace(/^<(\w+)/, `<$1 style="animation-delay:${i*70}ms"`)).join("")}</div>
  </div></div>`;
  $("readmeBack").onclick = () => openFolder(name);
}
["All", ...CONFIG.folders.map(f => f.name)].forEach((name, i) => {
  if (i === 1){ const h = document.createElement("h5"); h.textContent = "Folders"; $("side").appendChild(h); }
  const b = document.createElement("button"); b.textContent = name; b.dataset.name = name;
  b.onclick = () => name === "All" ? showRoot() : openFolder(name);
  $("side").appendChild(b);
});
const goUp = () => openItem ? openFolder(openName) : showRoot();
$("backBtn").onclick = goUp;
addEventListener("keydown", e => { if (e.key === "Escape" && openName && !lbOpen()) goUp(); });
showRoot();