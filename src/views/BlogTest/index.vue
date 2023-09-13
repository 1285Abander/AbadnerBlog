<script setup lang="ts">
import * as THREE from "three"

// 场景
const scene = new THREE.Scene();
// 几何体
const geometry = new THREE.BoxGeometry(100, 100, 100)
// 材质、颜色
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    transparent: true,//开启透明
    opacity: 0.5,//设置透明度
})
// 使用几何题和材质颜色构建一个实例
const mesh = new THREE.Mesh(geometry, material)
// 设置该实例的位置
mesh.position.set(0, 10, 0)
// 添加到场景中
scene.add(mesh)

const width = 800
const height = 600
// 透视投影相机(视场角度/画布宽高比/近裁截面/远裁截面)
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000)
// 设置位置
camera.position.set(200, 200, 200)
// 看向何处
camera.lookAt(mesh.position)

//创建渲染器对象
const renderer = new THREE.WebGLRenderer()
//设置渲染器的大小
renderer.setSize(width, height)
//运行渲染器
renderer.render(scene, camera)
//将渲染器添加到某一节点上
document.body.appendChild(renderer.domElement);


//辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(150);
scene.add(axesHelper);
</script>

<template></template>

<style lang="less" scoped></style>