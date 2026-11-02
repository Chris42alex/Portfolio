/* Loader: letters start scattered, fly together into CHRIS DESIGNS, then the curtain lifts */
(() => {
  const WORDS = [CONFIG.name.split(" ")[0].toUpperCase(), "DESIGNS."];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const MIN = reduced ? 700 : 3000; // minimum time on screen (ms)
  const root = document.documentElement, spans = [];
  root.style.overflow = "hidden";
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  scrollTo(0, 0);
  WORDS.forEach((w, wi) => {
    const wrap = document.createElement("span"); wrap.className = "w";
    [...w].forEach(ch => {
      const s = document.createElement("span"); s.textContent = ch;
      const sx = innerWidth * .45, sy = innerHeight * .4;
      s.style.transform = `translate(${(Math.random()-.5)*2*sx}px,${(Math.random()-.5)*2*sy}px) rotate(${(Math.random()-.5)*140}deg) scale(.85)`;
      wrap.appendChild(s); spans.push(s);
    });
    $("word").appendChild(wrap);
  });
  const designs = $("word").lastChild;
  let loaded = document.readyState === "complete", t0 = performance.now(), leaving = false;
  addEventListener("load", () => loaded = true);

  requestAnimationFrame(() => spans.forEach(s => s.style.opacity = .35));          // 1. scattered letters fade in
  setTimeout(() => spans.forEach((s, i) => {                                       // 2. fly into place, one by one
    s.style.transitionDelay = i * 60 + "ms"; s.style.transform = "none"; s.style.opacity = 1;
  }), reduced ? 0 : 450);
  setTimeout(() => designs.classList.add("outline"), reduced ? 100 : 450 + spans.length*60 + 700); // 3. DESIGNS turns outlined

  (function tick(now){                                                             // counter + bar; waits at 99 until loaded
    const pct = Math.min(loaded ? 100 : 99, Math.floor((now - t0) / MIN * 100));
    $("loadPct").textContent = String(pct).padStart(3, "0"); $("loadBar").style.width = pct + "%";
    if (pct >= 100 && !leaving) leave(); else if (!leaving) requestAnimationFrame(tick);
  })(t0);

  function leave(){                                                                // 4. letters lift away, curtain slides up
    leaving = true;
    spans.forEach((s, i) => { s.style.transitionDelay = i * 25 + "ms"; s.style.transform = "translateY(-140%)"; s.style.opacity = 0; });
    $("loader").classList.add("out");
    setTimeout(() => { $("loader").classList.add("done"); $("nav").classList.add("show"); root.style.overflow = ""; startReveals(); }, reduced ? 0 : 550);
    setTimeout(() => $("loader").remove(), reduced ? 300 : 1600);
  }
  addEventListener("mousemove", e => { const g = $("glow"); if (g){ g.style.left = e.clientX - 120 + "px"; g.style.top = e.clientY - 120 + "px"; } });
})();
