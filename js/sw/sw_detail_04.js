import * as THREE from "https://unpkg.com/three@0.108.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.108.0/examples/jsm/controls/OrbitControls.js";
import { FBXLoader } from "https://unpkg.com/three@0.108.0/examples/jsm/loaders/FBXLoader.js";
import { FontLoader } from "../../loaders/FontLoader.js";
import { TextGeometry } from "../../geometries/TextGeometry.js";

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

let scene, camera, renderer;
let controls;

let model = new THREE.Object3D();
let mixers = [];

//샘플 3d 모델링 다운로드
//1. https://www.mixamo.com/
//2. https://free3d.com/ko/3d-models/fbx
//3. https://www.turbosquid.com/

const init = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color("#eee"); //배경 컬러
    camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
    camera.position.set(0, 40, -20);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;

    // document.body.appendChild(renderer.domElement);
    document.querySelector("#canvasWrap").appendChild(renderer.domElement);

    //카메라 컨트롤
    // controls = new OrbitControls(camera, renderer.domElement);

    //바닥
    const geometry = new THREE.BoxGeometry(5000, 1, 5000);
    const material = new THREE.MeshPhongMaterial({
        color: 0xeeeeee,
    });
    const boxMesh = new THREE.Mesh(geometry, material);
    boxMesh.position.set(0, 0, 0);
    boxMesh.receiveShadow = true;
    scene.add(boxMesh);

    const geometry1 = new THREE.BoxGeometry(60, 70, 1);
    const loader = new THREE.TextureLoader();

    const material1 = new THREE.MeshBasicMaterial({map: loader.load("../../image/sw/swimage04.png"),}),
    cube = new THREE.Mesh(geometry1, material1);
    cube.position.set(0, 45, -100);
    scene.add(cube);
    
    {
        //조명 넣기
        var light = new THREE.HemisphereLight(0xffffff, 0x080820, 1);
        light.position.set(100, 100, 100);
        scene.add(light);
    }
    {
        //조명
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.PointLight(color, intensity);
        // light.castShadow = true;

        light.position.set(140, 360, 150);

        // light.shadow.mapSize.width = 1024;
        // light.shadow.mapSize.height = 1024;
        // light.shadow.radius = 10;

        scene.add(light);
    }
    {
        //안개
        const near = 60;
        const far = 250;
        const color = "#eeeeee";
        scene.fog = new THREE.Fog(color, near, far);
    }

    const infogeometry = new THREE.BoxGeometry(60, 40, 3);
    const infomaterial = new THREE.MeshBasicMaterial({map: loader.load("../../image/sw/swinfoimage04.png"), outline:true}),
    info = new THREE.Mesh(infogeometry, infomaterial);
    info.position.set(-22, 42, -285);
    info.castShadow = true;
    info.receiveShadow = true;
    info.rotateY(0.11);
    scene.add(info);

    const fontLoader = new FontLoader();
    fontLoader.load("../../font/Do Hyeon_Regular.json", (font) => {
        const geometry = new TextGeometry("길고양이\n지도AOS", {
            font: font,
            size: 9,
            height: 1,
        });
        const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const font3d = new THREE.Mesh(geometry, material);
        font3d.position.set(32,35,-300);
    
        font3d.castShadow = true;
        font3d.receiveShadow = true;
        font3d.rotateY(-0.11);
        scene.add(font3d);
    });
};

const animate = () => {
    //controls.update();

    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};

const stageResize = () => {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    //카메라 비율을 화면 비율에 맞춘다
};

init();
animate();
window.addEventListener("resize", stageResize);

const button = document.querySelector("button");

let moveNum = 0;

button.addEventListener("click", () => {
    if (camera.position.z == -240) {
        moveNum = -20;
    } else {
        moveNum = -240;
    }

    //트윈맥스 카메라 이동
    gsap.to(camera.position, {
        duration: 1.8,
        delay: 0,
        z: moveNum,
        ease: "Power4.easeInOut",
    });
});
