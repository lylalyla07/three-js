import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GUI } from "dat.gui";

export default class Three_App {
  static instance = null;

  renderer = new THREE.WebGLRenderer({
    antialias: true, // 抗锯齿
  });

  scene = new THREE.Scene();

  gui = null;

  camera = new THREE.PerspectiveCamera(
    75, // FOV: 视角
    window.innerWidth / window.innerHeight, // aspect: 长宽比
    0.1, // near: 最近的渲染距离
    1000 // far: 最远的渲染距离
  );

  modelList = [];

  // 状态栏
  stats = new Stats();

  constructor() {
    if (Three_App.instance) return Three_App.instance;
    Three_App.instance = this;
    this.init();
    this.animate();
  }

  init = () => {
    this.rendererSetting();
    this.cameraSetting();

    // option:
    // 状态栏
    this.statsSetting();
  };

  rendererSetting = () => {
    // 设置渲染器的大小
    this.renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    // 设置domElement的id
    this.renderer.domElement.id = "threejs_scene";

    // 将渲染器的domElement添加到页面中
    document
      .querySelector("#app")
      ?.appendChild(this.renderer.domElement);

    // resize
    window.addEventListener("resize", (e) => {
      // 设置渲染器的大小
      this.renderer.setSize(
        window.innerWidth,
        window.innerHeight
      );
      // 设置相机的长宽比
      this.camera.aspect =
        window.innerWidth / window.innerHeight;

      // 更新相机的投影矩阵
      this.camera.updateProjectionMatrix();
    });
  };

  statsSetting = () => {
    this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document
      .querySelector("#app")
      ?.appendChild(this.stats.dom);
  };

  cameraSetting = () => {
    this.camera.position.z = 3; // 设定相机的位置
  };

  render = () => {
    this.renderer.render(this.scene, this.camera);
  };

  animate = () => {
    // === STATS BEGIN ===
    this.stats.begin();
    requestAnimationFrame(this.animate);
    this.modelAnimate();
    this.render();
    // === STATS END ===
    this.stats.end();
    this.stats.update();
  };

  modelAnimate = () => {
    this.modelList.forEach((model) => {
      if (model?.animate) model.animate();
    });
  };

  addMesh = (mesh) => {
    this.scene.add(mesh);
  };

  addModel = (model, name) => {
    this.modelList.push(model);
    if (model?.mesh) this.scene.add(model.mesh);

    this.gui = model.guiInteractive(this.gui, name);
  };

  addModelList = (list = []) => {
    if (Array.isArray(list) && list.length > 0) {
      list.forEach((element) => {
        this.addModel(element.model, element.name);
      });
    }
  };
}
