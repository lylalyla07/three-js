import "./style.scss";
import * as THREE from "three";

import Three_App from "./src/App/threeApp";
import Cube from "./src/Model/cube";
import Circle from "./src/Model/circle";

const app = new Three_App();

const cube = new Cube({
  animateSwitch: true,
});

const cube2 = new Cube({
  geometry: new THREE.BoxGeometry(1.5, 1.5, 1.5),
  material: new THREE.MeshBasicMaterial({
    wireframe: true,
    color: 0xff0000,
  }),
  animateSwitch: true,
});

const circle = new Circle();

cube2.rotation = { x: 0.005, y: 0.005, z: 0.005 };

app.addModel(cube, "Cube1");
// app.addModel(cube2, "Cube2");
// app.addModel(circle, "Circle");
