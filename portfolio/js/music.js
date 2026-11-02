/* Lo-fi music player — all sound is generated live with the Web Audio API */
const TRACKS = [
  { title:"Late Night Commits", bpm:74, color:"#2fbf71", chords:[[53,57,60,64],[52,55,59,62],[50,53,57,60],[48,52,55,59]] },
  { title:"Pixel Perfect",      bpm:82, color:"#a259ff", chords:[[57,60,64,67],[50,53,57,60],[55,59,62,65],[48,52,55,59]] },
  { title:"Figma at 2AM",       bpm:68, color:"#1abcfe", chords:[[51,55,58,62],[48,51,55,58],[53,56,60,63],[46,50,53,56]] }
];
const BARS = 24;
let actx, master, noiseBuf, crackle, playing = false, trk = 0, step = 0, nextTime = 0, sched, startedAt = 0;
const mtof = m => 440 * Math.pow(2, (m-69)/12);
const sixteenth = () => 60 / TRACKS[trk].bpm / 4;

function initAudio(){
  actx = new (window.AudioContext || window.webkitAudioContext)();
  const lp = actx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 3200;
  master = actx.createGain(); master.gain.value = .55; master.connect(lp).connect(actx.destination);
  noiseBuf = actx.createBuffer(1, actx.sampleRate*2, actx.sampleRate);
  const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random()*2-1;
  // vinyl crackle: sparse clicks on a loop
  const cb = actx.createBuffer(1, actx.sampleRate*3, actx.sampleRate), cd = cb.getChannelData(0);
  for (let i = 0; i < cd.length; i++) cd[i] = Math.random() < .0006 ? (Math.random()*2-1)*.8 : (Math.random()*2-1)*.012;
  crackle = actx.createBufferSource(); crackle.buffer = cb; crackle.loop = true;
  const cg = actx.createGain(); cg.gain.value = .35; crackle.connect(cg).connect(master); crackle.start();
}
function env(node, t, peak, attack, decay){
  const g = actx.createGain(); g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(peak, t+attack); g.gain.exponentialRampToValueAtTime(.0001, t+attack+decay);
  node.connect(g); g.connect(master); return g;
}
function keys(m, t, len){ // soft electric-piano tone
  [["sine",0,.09],["triangle",7,.025]].forEach(([type, det, vol]) => {
    const o = actx.createOscillator(), f = actx.createBiquadFilter();
    o.type = type; o.frequency.value = mtof(m); o.detune.value = det + (Math.random()-.5)*6;
    f.type = "lowpass"; f.frequency.value = 1400; o.connect(f); env(f, t, vol, .02, len);
    o.start(t); o.stop(t+len+.1);
  });
}
function bass(m, t){ const o = actx.createOscillator(); o.type = "sine"; o.frequency.value = mtof(m); env(o, t, .28, .01, .9); o.start(t); o.stop(t+1); }
function kick(t){
  const o = actx.createOscillator(); o.frequency.setValueAtTime(110, t); o.frequency.exponentialRampToValueAtTime(42, t+.12);
  env(o, t, .8, .002, .32); o.start(t); o.stop(t+.4);
}
function noise(t, type, freq, vol, decay){
  const s = actx.createBufferSource(), f = actx.createBiquadFilter();
  s.buffer = noiseBuf; f.type = type; f.frequency.value = freq; s.connect(f); env(f, t, vol, .002, decay);
  s.start(t, Math.random()); s.stop(t+decay+.05);
}
function playStep(s, t){
  const T = TRACKS[trk], bar = Math.floor(s/16) % 4, st = s % 16, chord = T.chords[bar], six = sixteenth();
  const swing = (st % 4 === 2) ? six*.28 : 0;
  if (st === 0) { chord.forEach((m,i) => keys(m, t + i*.012, six*15)); bass(chord[0]-12, t); }
  if (st === 8) bass(chord[0]-12 + (Math.random()<.5 ? 7 : 0), t);
  if (st === 0 || st === 10 || (st === 7 && Math.random()<.4)) kick(t);
  if (st === 4 || st === 12) noise(t, "bandpass", 1700, .22, .18);
  if (st % 2 === 0) noise(t + swing, "highpass", 7500, st % 4 ? .035 : .055, .04);
  if (st % 2 === 0 && Math.random() < .16) keys(chord[Math.floor(Math.random()*4)] + 12, t + swing, six*3);
}
function scheduler(){
  while (nextTime < actx.currentTime + .12){
    playStep(step, nextTime); nextTime += sixteenth(); step++;
    if (step >= BARS*16) { loadTrack((trk+1) % TRACKS.length); return; }
  }
}
const fmt = s => `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`;
function updateUI(){
  const total = BARS*16*sixteenth(), now = Math.min(step*sixteenth(), total);
  $("trkBar").style.width = (now/total*100) + "%"; $("trkNow").textContent = fmt(now); $("trkLen").textContent = fmt(total);
  if (playing) requestAnimationFrame(updateUI);
}
function loadTrack(i){
  trk = i; step = 0; const T = TRACKS[trk];
  $("trkTitle").textContent = T.title; $("trkArtist").textContent = `Chris's Lo-fi Radio · ${trk+1}/${TRACKS.length}`;
  $("player").style.setProperty("--trk", T.color);
  if (actx) nextTime = actx.currentTime + .08;
  updateUI();
}
function setPlaying(on){
  playing = on; $("player").classList.toggle("playing", on);
  $("ppIcon").innerHTML = on ? '<path d="M6 4h4v16H6zM14 4h4v16h-4z"/>' : '<path d="M7 4v16l13-8z"/>';
  $("ppBtn").setAttribute("aria-label", on ? "Pause" : "Play");
}
$("ppBtn").onclick = async () => {
  if (!actx) initAudio();
  if (playing){ clearInterval(sched); await actx.suspend(); setPlaying(false); return; }
  await actx.resume(); nextTime = actx.currentTime + .08; sched = setInterval(scheduler, 25); setPlaying(true); updateUI();
};
$("nextBtn").onclick = () => loadTrack((trk+1) % TRACKS.length);
$("prevBtn").onclick = () => loadTrack((trk-1+TRACKS.length) % TRACKS.length);
loadTrack(0);
