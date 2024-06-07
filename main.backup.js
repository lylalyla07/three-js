import "./style.scss";

import * as THREE from "three";

// 场景
const scene = new THREE.Scene();

// 相机
const camera = new THREE.PerspectiveCamera(
  75, // FOV: 视角
  window.innerWidth / window.innerHeight, // aspect: 长宽比
  0.1, // near: 最近的渲染距离
  1000 // far: 最远的渲染距离
);

// 渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true, // 抗锯齿
});

// 设置渲染器的大小
renderer.setSize(window.innerWidth, window.innerHeight);

// 设置domElement的id
renderer.domElement.id = "threejs_scene";

// 将渲染器的domElement添加到页面中
document
  .querySelector("#app")
  .appendChild(renderer.domElement);

// 渲染场景
renderer.render(scene, camera);

// 创建一个立方体
const geometry = new THREE.BoxGeometry(1, 1, 1);

// 创建一个材质
const material = new THREE.MeshBasicMaterial({
  wireframe: true,
  color: 0x00ff00,
});

// 创建一个cube网格
const cube = new THREE.Mesh(geometry, material);

// 将cube添加到场景中
scene.add(cube);

// 设定相机的位置
camera.position.z = 5;

// 渲染场景
renderer.render(scene, camera);

cube.rotation.x = 0.5;
cube.rotation.y = 0.5;

// 渲染场景
renderer.render(scene, camera);

// function func() {
//   console.log("hello world");
// }
// const handle = setInterval(() => {
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//   cube.rotation.z += 0.01;
//   // 渲染场景
//   renderer.render(scene, camera);
// }, 100);

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.rotation.z += 0.01;
  // 渲染场景
  renderer.render(scene, camera);
}

animate();
