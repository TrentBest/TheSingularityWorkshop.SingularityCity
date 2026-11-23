const $ = selector => document.querySelector(selector);
const modeButtons = [...document.querySelectorAll("[data-experience-mode]")];
const status = $("#experience-status");
const audioButton = $("#city-audio-toggle");
const rendererTitle = $("#renderer-place-title");
const rendererDescription = $("#renderer-place-description");
const rendererDomain = $("#renderer-domain");
const rendererAccess = $("#renderer-access");
const rendererDistrict = $("#renderer-district");
const rendererWorldState = $("#renderer-world-state");

function setMode(mode) {
  document.body.classList.remove("mode-renderer", "mode-visualize");
  if (mode === "renderer") document.body.classList.add("mode-renderer");
  if (mode === "visualize") document.body.classList.add("mode-visualize");
  for (const button of modeButtons) button.setAttribute("aria-pressed", String(button.dataset.experienceMode === mode));
  status.textContent = ({visualize:"Visualization only · Renderer panel hidden",renderer:"Renderer only · visual projections hidden",both:"Both channels active · shared City identities"})[mode];
}
for (const button of modeButtons) button.addEventListener("click", () => setMode(button.dataset.experienceMode));

function updateRenderer() {
  const title = $("#place-title")?.textContent?.trim();
  const description = $("#place-description")?.textContent?.trim();
  const domain = $("#place-domain")?.textContent?.trim();
  const access = $("#place-access")?.textContent?.trim();
  const districtStatus = $("#district-model-status")?.textContent?.trim();
  const selectedDistrict = $("#district-scene-title")?.textContent?.trim();
  if (title) rendererTitle.textContent = title;
  if (description) rendererDescription.textContent = description;
  if (domain) rendererDomain.textContent = "DOMAIN · " + domain.toUpperCase();
  if (access) rendererAccess.textContent = "ACCESS · " + access.toUpperCase();
  if (districtStatus) rendererDistrict.textContent = "DISTRICT · " + (selectedDistrict || "UNSELECTED") + " · " + districtStatus;
  const metrics = [...document.querySelectorAll("#district-metrics .district-metric")].map(node => node.innerText.replace(/\n/g," · "));
  if (metrics.length) rendererWorldState.textContent = "CIVIC QUARTER OBSERVATION · " + metrics.join("  |  ") + ". Synthetic authored fixture.";
}
const observer = new MutationObserver(updateRenderer);
for (const selector of ["#place-title","#place-description","#place-domain","#place-access","#district-model-status","#district-metrics","#district-scene-title"]) {
  const node = $(selector);
  if (node) observer.observe(node, {childList:true,subtree:true,characterData:true});
}
updateRenderer();

// Audio is deliberately opt-in: browsers require a user gesture before sound can start.
// This is a procedural ambient sketch, not a recording or a claim of measured city acoustics.
let audioContext = null;
let oscillators = [];
let noiseSource = null;
function startAmbience() {
  const AudioContextType = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextType) throw new Error("Web Audio is not available in this browser.");
  audioContext = new AudioContextType();
  const master = audioContext.createGain();
  master.gain.value = 0.0001;
  master.connect(audioContext.destination);
  master.gain.setTargetAtTime(0.12, audioContext.currentTime, 1.4);
  for (const [frequency, gainValue, type] of [[55,0.18,"sine"],[82.4,0.045,"triangle"],[110,0.025,"sine"]]) {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gain.gain.value = gainValue;
    oscillator.connect(gain).connect(master);
    oscillator.start();
    oscillators.push(oscillator);
  }
  const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 2, audioContext.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i=0;i<data.length;i++) data[i] = (Math.random()*2-1)*0.18;
  noiseSource = audioContext.createBufferSource();
  noiseSource.buffer = buffer;
  noiseSource.loop = true;
  const filter = audioContext.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 360;
  const noiseGain = audioContext.createGain();
  noiseGain.gain.value = 0.12;
  noiseSource.connect(filter).connect(noiseGain).connect(master);
  noiseSource.start();
  audioButton.setAttribute("aria-pressed","true");
  audioButton.textContent = "♫ Mute city ambience";
  status.textContent = "Procedural ambient sketch playing · user-controlled audio";
}
function stopAmbience() {
  for (const oscillator of oscillators) { try { oscillator.stop(); } catch {} }
  oscillators = [];
  if (noiseSource) { try { noiseSource.stop(); } catch {} }
  noiseSource = null;
  if (audioContext) { audioContext.close(); audioContext = null; }
  audioButton.setAttribute("aria-pressed","false");
  audioButton.textContent = "♫ Hear the city";
  status.textContent = "City ambience muted";
}
audioButton?.addEventListener("click", async () => {
  try {
    if (audioContext) stopAmbience();
    else { startAmbience(); if (audioContext.state === "suspended") await audioContext.resume(); }
  } catch (error) {
    stopAmbience();
    status.textContent = "Audio unavailable · " + error.message;
  }
});
setMode("both");
