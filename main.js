import * as THREE from "three";
import "./style.css";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

// create objects
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({canvas});
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);
const controls = new OrbitControls(camera, canvas);
const textureLoader = new THREE.TextureLoader();

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(5, 5, 5),
  [
    new THREE.MeshStandardMaterial({
      map: textureLoader.load("/certs.png"),
    }),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load("/skills.png"),
    }),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load("/experience.png"),
    }),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load("/writers_block.png"),
    }),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load("/about.png"),
    }),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load("/references.png"),
    }),
  ]
);

const light = new THREE.AmbientLight(0xffffff);

const skybox = new THREE.CubeTextureLoader().load([
  "/pcb.jpg",
  "/pcb.jpg",
  "/pcb.jpg",
  "/pcb.jpg",
  "/pcb.jpg",
  "/pcb.jpg"
]);

// set positions
camera.position.z = 11;

// configuration
scene.add(camera, cube, light);
scene.background = skybox;
scene.backgroundIntensity = 0.5
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(2);
controls.enableDamping = true;
controls.enablePan = false;

// run the stuff
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
}

loop();