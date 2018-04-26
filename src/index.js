import App from "./App.js";

const canvas = document.getElementById("three");
const app = new App(canvas);

app.init();

function animate() {
  requestAnimationFrame(animate);

  app.update();
  app.render();
}

animate();

window.addEventListener("keydown", app.onKeyDown, false);
window.addEventListener("resize", app.resize, false);
