/* Core: $ helper, name/role in the page, ID badge tilt, scroll-reveal (used by every other file) */

const $ = id => document.getElementById(id);
$("heroName").textContent = CONFIG.name;
$("navLogo").textContent = CONFIG.initials;
$("heroRole").textContent = CONFIG.role;

/* ID badge: initials mark and a 3D tilt toward the cursor */
$("idMark").textContent = CONFIG.initials + "©";
$("badge").onpointermove = e => {
  const r = $("idcard").getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
  $("idcard").style.setProperty("--ry", Math.max(-.5, Math.min(.5, x)) * 18 + "deg");
  $("idcard").style.setProperty("--rx", Math.max(-.5, Math.min(.5, y)) * -12 + "deg");
};
$("badge").onpointerleave = () => { $("idcard").style.setProperty("--ry", "0deg"); $("idcard").style.setProperty("--rx", "0deg"); };
document.title = CONFIG.name + " — Frontend Developer & Designer";

/* Reveal on scroll */
const io = new IntersectionObserver(es => es.forEach(en => en.isIntersecting && en.target.classList.add("in")), {threshold:.15});
// started by the loader as the curtain lifts, so entrance animations aren't hidden behind it
const startReveals = () => document.querySelectorAll(".reveal").forEach(el => io.observe(el));
