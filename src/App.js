import * as THREE from "three";
import ThreeOrbitControls from "three-orbit-controls";

class App {
  constructor(canvas) {
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true
    });
    this.debugMode = false;
    this.stage = new THREE.Scene();

    this.resize = this.resize.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  init() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
    document.body.appendChild(this.renderer.domElement);
    this.renderer.autoClear = false;

    this.setupLights();
    this.setupCamera();
    this.setupHelpers();
    this.setupOrbitControls();

    this.setupScene();
  }

  setupLights() {
    const ambient = new THREE.AmbientLight(0xffffff, 1);
    this.stage.add(ambient);
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      63.05,
      window.innerWidth / window.innerHeight,
      20,
      10000
    );
    this.camera.up.set(0, 0, 1);
    this.camera.position.set(100, 100, 100);
    this.camera.lookAt(0, 0, 0);
  }

  setupHelpers() {
    const grid = new THREE.GridHelper(2000, 5, 0xdedede, 0x999999);
    grid.rotation.x = Math.PI / 2;
    const axes = new THREE.AxesHelper(100);
    this.stage.add(grid);
    this.stage.add(axes);
  }

  setupOrbitControls() {
    this.orbit = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    this.orbit.up.set(0, 0, 1);
    this.orbit.position.set(1000, 1000, 500);

    const OrbitControls = ThreeOrbitControls(THREE);
    this.controls = new OrbitControls(this.orbit);
    this.controls.minDistance = 100;
    this.controls.maxDistance = 5000;
  }

  resize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.orbit.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.orbit.updateProjectionMatrix();
  }

  onKeyDown(event) {
    switch (event.keyCode) {
      case 32:
        this.debugMode = !this.debugMode;
      default:
        return;
    }
  }

  update() {
    this.camera.updateMatrixWorld();
  }

  render() {
    this.renderer.clear();

    if (this.debugMode) {
      this.renderer.render(this.stage, this.orbit);
    } else {
      this.renderer.render(this.stage, this.camera);
    }
  }
}

export default App;
