import * as THREE from "three";
import { GUI } from "dat.gui";

export default class Circle {
  geometry = new THREE.CircleGeometry(1, 32);

  material = new THREE.MeshBasicMaterial({
    color: 0xffff00,
  });

  constructor() {
    this.mesh = new THREE.Mesh(
      this.geometry,
      this.material
    );
  }

  animate = () => {
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.02;
    this.mesh.rotation.z += 0.03;
  };

  guiInteractive = (gui) => {
    gui ||= new GUI();
    const circleFolder = gui.addFolder("Circle");
    circleFolder.open();
    return gui;
  };
}
