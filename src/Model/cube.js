import * as THREE from "three";
import { GUI } from "dat.gui";

export default class Cube {
  scale = {
    x: 1,
    y: 1,
    z: 1,
  };

  geometry = new THREE.BoxGeometry(
    this.scale.x,
    this.scale.y,
    this.scale.z
  );

  material = new THREE.MeshBasicMaterial({
    wireframe: true,
    color: 0x00ff00,
  });

  mesh = null;

  animateSwitch = true;
  guiInteractiveSwitch = true;

  rotation = { x: 0.01, y: 0.01, z: 0.01 };

  constructor(props) {
    this.geometry = props?.geometry || this.geometry;
    this.material = props?.material || this.material;
    this.rotation = props?.rotation || this.rotation;

    if (props?.animateSwitch != undefined) {
      this.animateSwitch = !!props.animateSwitch;
    }

    if (props?.guiInteractiveSwitch != undefined) {
      this.guiInteractiveSwitch =
        !!props.guiInteractiveSwitch;
    }

    this.init();
  }

  guiInteractive = (gui, name = "Cube") => {
    if (!this.guiInteractiveSwitch) return;
    gui ||= new GUI();
    const cubeFolder = gui.addFolder(name);
    this.setScale(cubeFolder);
    this.setRotate(cubeFolder);
    this.setSwitchOnOff(cubeFolder);
    this.setRestScale(cubeFolder);
    this.setRestRotate(cubeFolder);
    cubeFolder.open();
    return gui;
  };

  setScale = (folder) => {
    folder
      ?.add(this.mesh.scale, "x", 1, 2)
      .name("ScaleX")
      .listen();
    folder
      ?.add(this.mesh.scale, "y", 1, 2)
      .name("ScaleY")
      .listen();
    folder
      ?.add(this.mesh.scale, "z", 1, 2)
      .name("ScaleZ")
      .listen();
  };

  setRotate = (folder) => {
    folder
      ?.add(this.mesh.rotation, "x", 0, Math.PI * 2, 0.1)
      .name("RotateX")
      .listen();
    folder
      ?.add(this.mesh.rotation, "y", 0, Math.PI * 2, 0.1)
      .name("RotateY")
      .listen();
    folder
      ?.add(this.mesh.rotation, "z", 0, Math.PI * 2, 0.1)
      .name("RotateZ")
      .listen();
  };

  setSwitchOnOff = (folder) => {
    this.switchName = folder?.add(
      this.buttonFunc,
      "setSwitchOnOff"
    );
    if (this.animateSwitch) {
      this.mesh.material.color.set("#00ff00");
      this.switchName.name("SWITCH: ON");
    } else {
      this.mesh.material.color.set("#f5222d");
      this.switchName.name("SWITCH: OFF");
    }
  };

  setRestScale = (folder) => {
    folder
      ?.add(this.buttonFunc, "restScale")
      .name("REST SCALE");
  };

  setRestRotate = (folder) => {
    folder
      ?.add(this.buttonFunc, "restRotate")
      .name("REST ROTATE");
  };

  buttonFunc = {
    setSwitchOnOff: () => {
      this.animateSwitch = !this.animateSwitch;
      if (this.animateSwitch) {
        this.mesh.material.color.set("#00ff00");
        this.switchName.name("SWITCH: ON");
      } else {
        this.mesh.material.color.set("#f5222d");
        this.switchName.name("SWITCH: OFF");
      }
    },
    restScale: () => {
      this.mesh.scale.set(
        this.scale.x,
        this.scale.y,
        this.scale.z
      );
    },
    restRotate: () => {
      this.mesh.rotation.set(0, 0, 0);
    },
  };

  init = () => {
    this.mesh = new THREE.Mesh(
      this.geometry,
      this.material
    );
  };

  animate = () => {
    if (!this.animateSwitch) return;
    this.mesh.rotation.x += this.rotation.x;
    this.mesh.rotation.y += this.rotation.y;
    this.mesh.rotation.z += this.rotation.z;
  };
}
