import * as THREE from "https://unpkg.com/three@0.108.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.108.0/examples/jsm/controls/OrbitControls.js";
import { FBXLoader } from "https://unpkg.com/three@0.108.0/examples/jsm/loaders/FBXLoader.js";
import { FontLoader } from "../../loaders/FontLoader.js";
import { TextGeometry } from "../../geometries/TextGeometry.js";

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

let scene, camera, renderer;
let controls;

let infogroup = new THREE.Group();

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

    const material1 = new THREE.MeshBasicMaterial({
            map: loader.load("../../image/sw/swimage01.png"),
        }),
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

    const infogeometry = new THREE.BoxGeometry(60, 40, 1);
    const infomaterial = new THREE.MeshBasicMaterial({
            map: loader.load("../../image/sw/swinfoimage01.png"),
        }),
        info = new THREE.Mesh(infogeometry, infomaterial);
    info.position.set(-22, 42, -285);
    info.castShadow = true;
    info.receiveShadow = true;
    // info.rotateY(0.11);
    // scene.add(info);
    infogroup.add(info);

    // const linematerial = new THREE.LineBasicMaterial( { color: 0x000000 } );
    // const points = [];
    // points.push( new THREE.Vector3( - 53.9, 63, -285 ) );
    // points.push( new THREE.Vector3( 8.3, 63, -285 ) );
    // points.push( new THREE.Vector3( 8.3, 21.3, -285 ) );
    // points.push( new THREE.Vector3( -53.9, 21.3, -285 ) );
    // points.push( new THREE.Vector3( -53.9, 63, -285 ) );

    // const linegeometry = new THREE.BufferGeometry().setFromPoints( points );
    // const line = new THREE.Line( linegeometry, linematerial );

    // infogroup.add(line);
    // infogroup.rotateY(0.11);
    // infogroup.position(0)
    // scene.add( infogroup );

    const outlinegeo1 = new THREE.BoxGeometry(63, 0.8, 1);
    const outlinegeo2 = new THREE.BoxGeometry(0, 45.1, 1);
    const outmaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const outmaterial2 = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const outline1 = new THREE.Mesh(outlinegeo1, outmaterial);
    const outline2 = new THREE.Mesh(outlinegeo2, outmaterial2);
    const outline3 = new THREE.Mesh(outlinegeo1, outmaterial);
    const outline4 = new THREE.Mesh(outlinegeo2, outmaterial2);
    outline1.position.set(-22, 63, -285);
    outline2.position.set(-53.6, 40.85, -285);
    outline3.position.set(-22, 21, -285);
    outline4.position.set(9.1, 40.85, -285);
    // outline2.rotateY(0.05);

    infogroup.add(outline1);
    infogroup.add(outline2);
    infogroup.add(outline3);
    infogroup.add(outline4);
    // scene.add(outline1);
    // scene.add(outline2);
    // scene.add(outline3);
    // scene.add(outline4);
    scene.add(infogroup);
    infogroup.rotateY(0.11);
    console.log(infogroup.position.x);
    console.log(infogroup.position.y);
    console.log(infogroup.position.z);
    infogroup.position.set(35, 0, 0);
    const fontLoader = new FontLoader();
    fontLoader.load("../../font/Do Hyeon_Regular.json", (font) => {
        const geometry = new TextGeometry("오늘\n" + "뭐" + "먹지?", {
            font: font,
            size: 10,
            height: 1,
        });
        const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const font3d = new THREE.Mesh(geometry, material);
        font3d.position.set(32, 32, -300);

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
