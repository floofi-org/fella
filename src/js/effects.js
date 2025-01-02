let canvas = document.createElement('canvas');
let gl;

try {
    gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
} catch (e) {}

if (gl) {
    document.body.classList.add("fella-visual-effects");
} else {
    console.warn("Cannot enable visual effects: no GPU acceleration detected.");
}