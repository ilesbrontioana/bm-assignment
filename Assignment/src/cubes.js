var camera, scene, renderer, controls;
var stats, container;

var totalCubes = 7000;
var maxCubeSize = 50;

var cameraFrustumFar = 3000;

init();
animate();
function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    stats = new Stats();
    container.appendChild(stats.dom);


    scene = new THREE.Scene();


    camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, cameraFrustumFar);
    camera.position.set(0, 100, 1000);

    scene.add(camera);

    controls = new THREE.OrbitControls(camera);

    // var texture = new THREE.TextureLoader().load('texture.jpg');
    // var material = new THREE.MeshBasicMaterial({map: texture});
    var material = new THREE.MeshNormalMaterial();
    for (var i = 0; i < totalCubes; i++) {

        var randomSize = Math.random() * maxCubeSize;
        var geometry = new THREE.BoxBufferGeometry(randomSize, randomSize, randomSize);
        var mesh = new THREE.Mesh(geometry, material);
        if (Math.random() < 0.5) {
            mesh.position.x = Math.random() * 2000;
        }
        else {

            mesh.position.x = Math.random() * -2000;
        }
        if (Math.random() < 0.5) {
            mesh.position.y = Math.random() * 2000;
        }
        else {

            mesh.position.y = Math.random() * -2000;
        }
        mesh.position.z = Math.random() * 2000;

        mesh.rotation.x = Math.random() * 360;
        mesh.rotation.y = Math.random() * 360;
        mesh.rotation.z = Math.random() * 360;

        scene.add(mesh);
    }

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
}

function animate() {
    requestAnimationFrame(animate);

    render();
    stats.update();
}



function render() {
    for (var i = 1, il = scene.children.length; i < il; i++) {
        scene.children[i].rotateOnAxis(new THREE.Vector3(1, 0, 0), 2 * Math.PI / 180);
    }
    renderer.render(scene, camera);
}
