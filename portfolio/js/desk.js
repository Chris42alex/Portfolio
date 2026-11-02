/* About desk: terminal typing, Figma/Claude LED tiles, résumé card, design palette, code editor */

/* Typing terminal */
let typed = false;
new IntersectionObserver(([en]) => { if (en.isIntersecting && !typed) { typed = true; typeTerm(); } }, {threshold:.4}).observe($("term"));
async function typeTerm(){
  const t = $("term"), wait = ms => new Promise(r => setTimeout(r, ms));
  let out = "";
  for (const [cmd, res] of CONFIG.terminal){
    out += "~ $ ";
    for (const c of cmd){ out += c; t.innerHTML = out + '<span class="cur"></span>'; await wait(60); }
    await wait(250); out += "\n" + res + "\n"; t.innerHTML = out + '<span class="cur"></span>'; await wait(500);
  }
  t.innerHTML = out + '~ $ <span class="cur"></span>';
}

/* Figma logo in LED dots: 2×3 logo units, 5 dots per unit */
function inShape(x, y, x0, y0, [tl, tr, br, bl]){
  if (x < x0 || x > x0+1 || y < y0 || y > y0+1) return false;
  const corners = [[tl,x0+tl,y0+tl,x<x0+tl&&y<y0+tl],[tr,x0+1-tr,y0+tr,x>x0+1-tr&&y<y0+tr],
                   [br,x0+1-br,y0+1-br,x>x0+1-br&&y>y0+1-br],[bl,x0+bl,y0+1-bl,x<x0+bl&&y>y0+1-bl]];
  return corners.every(([r,cx,cy,inCorner]) => !r || !inCorner || Math.hypot(x-cx,y-cy) <= r+.02);
}
const figma = [
  [0,0,[.5,0,0,.5],"#f24e1e"], [1,0,[0,.5,.5,0],"#ff7262"],
  [0,1,[.5,0,0,.5],"#a259ff"], [1,1,[.5,.5,.5,.5],"#1abcfe"],
  [0,2,[.5,0,.5,.5],"#0acf83"]
];
// Fills a tile with cols×rows dots; colorAt(c, r) returns a colour for lit dots, or nothing
function ledTile(el, cols, rows, colorAt){
  el.style.gridTemplateColumns = `repeat(${cols}, 7.5px)`;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++){
    const d = document.createElement("b"), color = colorAt(c, r);
    if (color){ d.className = "on"; d.style.setProperty("--c", color); d.style.animationDelay = (-Math.random()*3)+"s"; }
    el.appendChild(d);
  }
}
ledTile($("matrix"), 10, 15, (c, r) => {
  const x = (c+.5)/5, y = (r+.5)/5;
  return figma.find(([x0,y0,rad]) => inShape(x,y,x0,y0,rad))?.[3];
});

// Claude: orange starburst with rays of alternating length
ledTile($("ledClaude"), 13, 13, (c, r) => {
  const dx = c-6, dy = r-6, d = Math.hypot(dx, dy), ang = Math.atan2(dy, dx), N = 12;
  if (d < 1.2) return "#d97757";
  for (let k = 0; k < N; k++){
    const a = k * 2*Math.PI/N - Math.PI/2, len = k % 2 ? 4.6 : 6.2;
    const diff = Math.abs(Math.atan2(Math.sin(ang-a), Math.cos(ang-a)));
    if (d <= len && diff * d < .78) return d > len - 1.2 ? "#e8957a" : "#d97757";
  }
});

/* Résumé card: contact details on the front; clicking anywhere (except a link) opens the résumé */
$("bcInfo").innerHTML = CONFIG.card.map(([i,t]) => `<li><span>${i}</span>${t}</li>`).join("");
const openResume = () => window.open(CONFIG.resume, "_blank", "noopener");
$("navResume").href = CONFIG.resume;
$("bcard").onclick = openResume;
$("bcard").onkeydown = e => { if (e.key === "Enter" || e.key === " "){ e.preventDefault(); openResume(); } };

/* Design palette */
$("swatches").innerHTML = CONFIG.swatches.map(([hex,n]) => `<div style="background:${hex}" title="${n} — click to copy"><span>${hex}</span></div>`).join("");
$("swatches").onclick = e => { const s = e.target.closest("div[title]"); if (!s) return;
  const hex = s.querySelector("span"); try { navigator.clipboard.writeText(hex.textContent); } catch {}
  const old = hex.textContent; hex.textContent = "copied"; setTimeout(() => hex.textContent = old, 900); };
$("tools").innerHTML = CONFIG.tools.map(t => `<span>${t}</span>`).join("");

/* Code editor: types a React component with syntax colours, then loops */
const CODE = [["k","const "],["f","Card"],["p"," = ({ "],["a","title"],["p"," }) => ("],["","\n  "],
  ["p","<"],["t","div "],["a","className"],["p","="],["s",'"card"'],["p",">"],["","\n    "],
  ["p","<"],["t","h2"],["p",">{"],["","title"],["p","}</"],["t","h2"],["p",">"],["","\n    "],
  ["p","<"],["t","Button "],["a","variant"],["p","="],["s",'"primary"'],["p",">"],["","\n      Let's build ✦\n    "],
  ["p","</"],["t","Button"],["p",">"],["","\n  "],["p","</"],["t","div"],["p",">"],["","\n);\n\n"],
  ["k","export default "],["f","Card"],["p",";"]];
const esc = s => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
let coding = false;
new IntersectionObserver(([en]) => { if (en.isIntersecting && !coding) { coding = true; typeCode(); } }, {threshold:.3}).observe($("code"));
async function typeCode(){
  const wait = ms => new Promise(r => setTimeout(r, ms));
  while (true){
    let done = "";
    for (const [cls, txt] of CODE){
      let part = "";
      for (const ch of txt){
        part += ch;
        $("code").innerHTML = done + (cls ? `<span class="${cls}">${esc(part)}</span>` : esc(part)) + '<span class="cur"></span>';
        await wait(ch === "\n" ? 120 : 28);
      }
      done += cls ? `<span class="${cls}">${esc(txt)}</span>` : esc(txt);
    }
    await wait(5000);
  }
}
