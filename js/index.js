import * as THREE from "https://unpkg.com/three@0.108.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.108.0/examples/jsm/controls/OrbitControls.js";
import { neonCursor } from "https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js";

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;
let scene, camera, renderer, circle, skelet, particle;
let boxGroup = new THREE.Object3D();

let totalNum = 100; //전체 박스 갯수
const depthNum = 30; //박스와 박스 사이 z값. 깊이
const totalDepthNum = totalNum * depthNum; //전체 깊이

let targetZNum = 0;
let moveZ = 0;
let mouseX = 0,
    mouseY = 0,
    moveX = 0,
    moveY = 0;

const workArr = [
    {
        image: "../image/hw/hwimage01.png",
    },
    {
        image: "../image/hw/hwimage02.png",
    },
    {
        image: "../image/hw/hwimage03.png",
    },
    {
        image: "../image/hw/hwimage04.png",
    },
    {
        image: "../image/hw/hwimage05.png",
    },
    {
        image: "../image/hw/hwimage06.png",
    },
    {
        image: "../image/hw/hwimage07.png",
    },
    {
        image: "../image/hw/hwimage08.png",
    },
    {
        image: "../image/hw/hwimage09.png",
    },
    {
        image: "../image/sw/swimage01.png",
    },
    {
        image: "../image/sw/swimage02-2.png",
    },
    {
        image: "../image/sw/swimage03.png",
    },
    {
        image: "../image/sw/swimage04.png",
    },
    {
        image: "../image/sw/swimage05.png",
    },
    {
        image: "../image/sw/swimage06.png",
    },
    {
        image: "../image/sw/swimage07.png",
    },
];

const init = () => {
    totalNum = workArr.length - 1; //전체 박스 갯수

    scene = new THREE.Scene();
    scene.background = new THREE.Color("#000000"); //배경 컬러 #6fbdff
    camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 1, 1000);
    camera.position.set(0, 0, 20);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;
    //그림자 활성화
    document.body.appendChild(renderer.domElement);
    document.querySelector("#canvasWrap").appendChild(renderer.domElement);
    //cavasWrap 에 render 넣는다

    document.body.style.height = `${HEIGHT + totalNum * 100}px`;
    //body 스크롤 만들기

    circle = new THREE.Object3D();
    skelet = new THREE.Object3D();
    particle = new THREE.Object3D();

    scene.add(particle);

    var geometry = new THREE.TetrahedronGeometry(1.2, 0);

    var material = new THREE.MeshPhongMaterial({
        color: "#7e8f80",
        shading: THREE.FlatShading,
    });

    for (var i = 0; i < 2000; i++) {
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position
            .set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
            .normalize();
        mesh.position.multiplyScalar(200 + Math.random() * 100);
        mesh.rotation.set(
            Math.random() * 2,
            Math.random() * 2,
            Math.random() * 2
        );
        particle.add(mesh);
    }

    var ambientLight = new THREE.AmbientLight(0x999999);
    scene.add(ambientLight);

    var lights = [];
    lights[0] = new THREE.DirectionalLight("#c2bbc7", 1);
    lights[0].position.set(1, 0, 0);
    lights[1] = new THREE.DirectionalLight("#f5f2f3", 1);
    lights[1].position.set(0.75, 1, 0.5);
    lights[2] = new THREE.DirectionalLight("##969e9e", 1);
    lights[2].position.set(-0.75, -1, 0.5);
    scene.add(lights[0]);
    scene.add(lights[1]);
    scene.add(lights[2]);

    //안개
    const near = 50;
    const far = 300;
    const color = "#000000";
    scene.fog = new THREE.Fog(color, near, far);

    for (let i = 0; i <= totalNum; i++) {
        addBox(i);
    }
    scene.add(boxGroup);
};

//박스 추가
const addBox = (i) => {
    const imageMap = new THREE.TextureLoader().load(workArr[i].image);
    imageMap.wrapS = THREE.RepeatWrapping;
    imageMap.wrapT = THREE.RepeatWrapping;
    // imageMap.repeat.set(1, 4);

    const material = new THREE.SpriteMaterial({ map: imageMap });
    const boxMesh = new THREE.Sprite(material);
    boxMesh.scale.set(32, 24, 3);

    let x = Math.random() * 100 - 100 / 2;
    let y = Math.random() * 50 - 50 / 2;
    let z = -i * depthNum;
    boxMesh.position.set(x, y, z);
    boxMesh.name = `imageBox_${i}`;
    // boxMesh.rotation.set(0, y, 0);
    boxGroup.add(boxMesh);
};

const animate = () => {
    //controls.update();

    targetZNum += 0.3;

    moveZ += (targetZNum - moveZ) * 0.07;
    boxGroup.position.z = moveZ;

    moveX += (mouseX - moveX - WIDTH / 2) * 0.05;
    moveY += (mouseY - moveY - WIDTH / 2) * 0.05;

    boxGroup.position.x = -(moveX / 50);
    boxGroup.position.y = moveY / 50;

    particle.rotation.x += 0.004;
    particle.rotation.y += 0.004;
    // particle.rotation.z += 0.004;

    renderer.clear();

    camera.lookAt(scene.position);
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};

const stageResize = () => {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    camera.updateProjectionMatrix();
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    //카메라 비율을 화면 비율에 맞춘다
};

let scrolly = 0;
let pageNum = 0;
const progressBar = document.querySelector(".bar");
let perNum = 0;

const scrollFunc = (event) => {
    scrolly = window.scrollY; //현재 스크롤 위치
    pageNum = Math.ceil(scrolly / 100); //스크롤 한번에 100 이동
    targetZNum = depthNum * pageNum;

    perNum = Math.ceil(
        (scrolly / (document.body.offsetHeight - window.innerHeight)) * 500
    );
    progressBar.style.width = perNum + "%";

    console.log(targetZNum, window.scrollY, pageNum);
};

init();
animate();
window.addEventListener("resize", stageResize);
// window.addEventListener("wheel", scrollFunc);
window.addEventListener("scroll", scrollFunc);
scrollFunc();

window.addEventListener("mousemove", (e) => {
    //console.log(e);
    mouseX = e.clientX;
    mouseY = e.clientY;
});
