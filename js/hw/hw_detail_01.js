import * as THREE from "https://unpkg.com/three@0.108.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.108.0/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "../../loaders/FontLoader.js";
import { TextGeometry } from "../../geometries/TextGeometry.js";

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

let scene, camera, renderer;
let controls;

let infogroup = new THREE.Group();

const init = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color("#eee"); //배경 컬러
    camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
    camera.position.set(0, 40, -20);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setPixelRatio(window.devicePixelRatio);
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
    boxMesh.castShadow = true;
    boxMesh.receiveShadow = true;
    scene.add(boxMesh);

    const geometry1 = new THREE.BoxGeometry(70, 55, 1);
    const loader = new THREE.TextureLoader();

    const material1 = new THREE.MeshBasicMaterial({map: loader.load("../../image/hw/hwimage01.png"),}),
    cube = new THREE.Mesh(geometry1, material1);
    cube.position.set(0, 45, -100);
    cube.castShadow = true;
    cube.receiveShadow = true;
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

        scene.add(light);
    }
    {
        //안개
        const near = 60;
        const far = 250;
        const color = "#eeeeee";
        scene.fog = new THREE.Fog(color, near, far);
    }

    const infogeometry = new THREE.BoxGeometry(60, 40, 1);
    const infomaterial = new THREE.MeshBasicMaterial({map: loader.load("../../image/hw/hwinfoimage01.png"),}),
    info = new THREE.Mesh(infogeometry, infomaterial);
    info.position.set(-22, 42, -285);
    info.castShadow = true;
    info.receiveShadow = true;
    infogroup.add(info);

    const outlinegeo1 = new THREE.BoxGeometry(62.6,0.8,1)
    const outlinegeo2 = new THREE.BoxGeometry(0,46.7,0.2) //45.1
    const outlinegeo4 = new THREE.BoxGeometry(0,47.1,1)
    const outmaterial = new THREE.MeshBasicMaterial({ color: 0x00095E });
    // const outmaterial2 = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const outline1 = new THREE.Mesh(outlinegeo1, outmaterial);
    const outline2 = new THREE.Mesh(outlinegeo2, outmaterial);
    const outline3 = new THREE.Mesh(outlinegeo1, outmaterial);
    const outline4 = new THREE.Mesh(outlinegeo4, outmaterial);

    outline1.position.set(-22,63,-285);
    outline2.position.set(-52.8,39.85,-284.6); //40.85
    outline3.position.set(-22,21,-285);
    outline4.position.set(8.9,39.85,-285);
    
    infogroup.add(outline1);
    infogroup.add(outline2);
    infogroup.add(outline3);
    infogroup.add(outline4);
    scene.add(infogroup);

    infogroup.rotateY(0.11);
    infogroup.position.set(35,0,0)

    const fontLoader = new FontLoader();
    fontLoader.load("../../font/Do Hyeon_Regular.json", (font) => {
        const geometry = new TextGeometry("레이싱휠", {
            font: font,
            size: 10,
            height: 1,
        });
        const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const font3d = new THREE.Mesh(geometry, material);
        font3d.position.set(32,28,-300);
    
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
    const canvas = renderer.domElement;
	const width = canvas.clientWidth;
	const height = canvas.clientHeight;
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    camera.aspect = WIDTH/ HEIGHT;
    camera.updateProjectionMatrix();

    renderer.setSize(WIDTH, HEIGHT)
    renderer.render(scene, camera);
    //카메라 비율을 화면 비율에 맞춘다
};

init();
animate();
window.addEventListener("resize", stageResize);

const button = document.querySelector("button");

let moveNum = 0;

button.addEventListener("click", () => {
    console.log(WIDTH, HEIGHT);
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
