import * as THREE from "https://unpkg.com/three@0.108.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.108.0/examples/jsm/controls/OrbitControls.js";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> a0d28e0... plusstar
import { neonCursor } from "https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js";

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;
let scene, camera, renderer, circle, skelet, particle;
<<<<<<< HEAD
=======
import { particlesCursor } from "https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js";

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;
let scene, camera, renderer, controls;
>>>>>>> ef1839f... first commit
=======
import { neonCursor } from "https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js";

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;
let scene, camera, renderer, circle, skelet, particle;
>>>>>>> fda533d... add star(background)
=======
>>>>>>> a0d28e0... plusstar
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

const dataArr = [
    {
        image: "https://source.unsplash.com/collection/1",
        link: "./popuplayter.html",

        //html
    },
    {
        image: "https://source.unsplash.com/collection/2",
<<<<<<< HEAD
<<<<<<< HEAD
        link: "http://google.com",
    },
    {
        image: "https://source.unsplash.com/collection/3",
        link: "http://google.com",
    },
    {
        image: "https://source.unsplash.com/collection/4",
        link: "http://google.com",
=======
=======
>>>>>>> a0d28e0... plusstar
        // link: "./test.html",
    },
    {
        image: "https://source.unsplash.com/collection/3",
        // link: "./test.html",
    },
    {
        image: "https://source.unsplash.com/collection/4",
        // link: "./test.html",
<<<<<<< HEAD
>>>>>>> ef1839f... first commit
=======
>>>>>>> a0d28e0... plusstar
    },
    {
        image: "https://source.unsplash.com/collection/5",
        // link: "./test.html",
    },
    {
        image: "https://source.unsplash.com/collection/6",
        // link: "./test.html",
    },
    {
        image: "https://source.unsplash.com/collection/8",
        // link: "./test.html",
    },
    {
        image: "https://source.unsplash.com/collection/21",
        // link: "./test.html",
    },
    {
        image: "https://source.unsplash.com/collection/13",
        // link: "./test.html",
    },
    {
        image: "https://source.unsplash.com/collection/10",
        // link: "./test.html",
    },
    {
        image: "https://source.unsplash.com/collection/11",
        // link: "./test.html",
    },
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    {
        image: "https://source.unsplash.com/collection/15",
=======
    {
        image: "https://source.unsplash.com/collection/11",
>>>>>>> fda533d... add star(background)
=======
    {
        image: "https://source.unsplash.com/collection/11",
>>>>>>> a0d28e0... plusstar
        // link: "./test.html",
    },
    {
        image: "https://source.unsplash.com/collection/12",
        // link: "./test.html",
    },
    {
        image: "https://source.unsplash.com/collection/13",
        // link: "./test.html",
    },
    {
        image: "https://source.unsplash.com/collection/14",
        // link: "./test.html",
    },
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> ef1839f... first commit
=======
>>>>>>> fda533d... add star(background)
=======
>>>>>>> a0d28e0... plusstar
];

const init = () => {
    totalNum = dataArr.length - 1; //전체 박스 갯수

    scene = new THREE.Scene();
    scene.background = new THREE.Color("#000000"); //배경 컬러 #6fbdff
    camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 1, 1000);
    camera.position.set(0, 0, 50);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;
    //그림자 활성화
    document.body.appendChild(renderer.domElement);
    document.querySelector("#canvasWrap").appendChild(renderer.domElement);
    //cavasWrap 에 render 넣는다

    document.body.style.height = `${HEIGHT + totalNum * 100}px`;
    //body 스크롤 만들기

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> fda533d... add star(background)
=======
>>>>>>> a0d28e0... plusstar
    circle = new THREE.Object3D();
    skelet = new THREE.Object3D();
    particle = new THREE.Object3D();

    scene.add(particle);

<<<<<<< HEAD
<<<<<<< HEAD
    var geometry = new THREE.TetrahedronGeometry(0.3, 0);
=======
    var geometry = new THREE.TetrahedronGeometry(0.6, 0);
>>>>>>> fda533d... add star(background)
=======
    var geometry = new THREE.TetrahedronGeometry(0.6, 0);
>>>>>>> a0d28e0... plusstar

    var material = new THREE.MeshPhongMaterial({
        color: "#7e8f80",
        shading: THREE.FlatShading,
    });

    for (var i = 0; i < 2000; i++) {
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position
            .set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
            .normalize();
        mesh.position.multiplyScalar(90 + Math.random() * 700);
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
<<<<<<< HEAD
<<<<<<< HEAD
    lights[2] = new THREE.DirectionalLight("#969e9e", 1);
=======
    lights[2] = new THREE.DirectionalLight("##969e9e", 1);
>>>>>>> fda533d... add star(background)
=======
    lights[2] = new THREE.DirectionalLight("##969e9e", 1);
>>>>>>> a0d28e0... plusstar
    lights[2].position.set(-0.75, -1, 0.5);
    scene.add(lights[0]);
    scene.add(lights[1]);
    scene.add(lights[2]);

<<<<<<< HEAD
<<<<<<< HEAD
    //안개
    const near = 50;
=======
    //안개
    const near = 100;
>>>>>>> ef1839f... first commit
=======
    //안개
    const near = 50;
>>>>>>> fda533d... add star(background)
=======
    //안개
    const near = 50;
>>>>>>> a0d28e0... plusstar
    const far = 300;
    const color = "#000000";
    scene.fog = new THREE.Fog(color, near, far);

    // const axes = new THREE.AxesHelper(150);
    // scene.add(axes);

    // const gridHelper = new THREE.GridHelper(240, 20);
    // scene.add(gridHelper);

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
    //조명 넣기
    var light = new THREE.HemisphereLight(0xffffff, 0x080820, 0.8);
    light.position.set(100, 100, 0);
    scene.add(light);

>>>>>>> ef1839f... first commit
=======
>>>>>>> fda533d... add star(background)
=======
>>>>>>> a0d28e0... plusstar
    // controls = new OrbitControls(camera, renderer.domElement);
    {
    }
    for (let i = 0; i <= totalNum; i++) {
        addBox(i);
    }
    scene.add(boxGroup);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
    addLight(15, 15, 20);
>>>>>>> ef1839f... first commit
=======
>>>>>>> fda533d... add star(background)
=======
>>>>>>> a0d28e0... plusstar
};

//박스 추가
const addBox = (i) => {
    const imageMap = new THREE.TextureLoader().load(dataArr[i].image);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    imageMap.wrapS = THREE.RepeatWrapping;
    imageMap.wrapT = THREE.RepeatWrapping;
=======
    // imageMap.wrapS = THREE.RepeatWrapping;
    // imageMap.wrapT = THREE.RepeatWrapping;
>>>>>>> ef1839f... first commit
=======
    imageMap.wrapS = THREE.RepeatWrapping;
    imageMap.wrapT = THREE.RepeatWrapping;
>>>>>>> fda533d... add star(background)
=======
    imageMap.wrapS = THREE.RepeatWrapping;
    imageMap.wrapT = THREE.RepeatWrapping;
>>>>>>> a0d28e0... plusstar
    // imageMap.repeat.set(1, 4);

    const material = new THREE.SpriteMaterial({ map: imageMap });
    const boxMesh = new THREE.Sprite(material);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    boxMesh.scale.set(32, 18, 3);
=======
    boxMesh.scale.set(32, 18, 1);
>>>>>>> ef1839f... first commit
=======
    boxMesh.scale.set(32, 18, 3);
>>>>>>> fda533d... add star(background)
=======
    boxMesh.scale.set(32, 18, 3);
>>>>>>> a0d28e0... plusstar

    let x = Math.random() * 100 - 100 / 2;
    let y = Math.random() * 50 - 50 / 2;
    let z = -i * depthNum;
    boxMesh.position.set(x, y, z);
    boxMesh.name = `imageBox_${i}`;
    boxMesh.link = dataArr[i].link;
    // boxMesh.rotation.set(0, y, 0);
    boxGroup.add(boxMesh);
};

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
//조명 넣기
const addLight = (...pos) => {
    const color = 0xffffff;
    const intensity = 0.4;
    const light = new THREE.PointLight(color, intensity);
    light.castShadow = true;

    light.position.set(...pos);

    // const helper = new THREE.PointLightHelper(light);
    // scene.add(helper);

    scene.add(light);
};

>>>>>>> ef1839f... first commit
=======
>>>>>>> fda533d... add star(background)
=======
>>>>>>> a0d28e0... plusstar
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

const onPointerMove = (event) => {
    pointer.x = (event.clientX / WIDTH) * 2 - 1;
    pointer.y = -(event.clientY / HEIGHT) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);

    // 레이저 닿는 녀석 찾기
    const intersects = raycaster.intersectObjects(boxGroup.children);

    // 마우스 오버가 된 녀석들은 빨간색으로
    // for (let i = 0; i < intersects.length; i++) {
    //     intersects[i].object.material.color.set(0xff0000);
    // }

    if (intersects.length > 0) {
        document.querySelector("body").style.cursor = "pointer";
    } else {
        document.querySelector("body").style.cursor = "auto";
    }
};

const onDocumentMouseDown = (event) => {
    const vector = new THREE.Vector3(pointer.x, pointer.y, 0.5);

    vector.unproject(camera);
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(boxGroup.children);

    if (intersects.length > 0) {
        const item = intersects[0].object;
        const itemName = item.name;
        location.replace(item.link);
        // window.open(item.link, "_blank");
        // console.log(item.link);
    }
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

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    particle.rotation.x += 0.004;
    particle.rotation.y += 0.004;
    particle.rotation.z += 0.004;

    renderer.clear();

=======
>>>>>>> ef1839f... first commit
=======
=======
>>>>>>> a0d28e0... plusstar
    particle.rotation.x += 0.004;
    particle.rotation.y += 0.004;
    // particle.rotation.z += 0.004;

    renderer.clear();

<<<<<<< HEAD
>>>>>>> fda533d... add star(background)
=======
>>>>>>> a0d28e0... plusstar
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

window.addEventListener("pointermove", onPointerMove);
<<<<<<< HEAD
window.addEventListener("mousedown", onDocumentMouseDown);
=======
window.addEventListener("mousedown", onDocumentMouseDown);
>>>>>>> a0d28e0... plusstar
