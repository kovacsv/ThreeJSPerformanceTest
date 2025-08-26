import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js'
import Stats from 'stats.js';

import './main.css';

let separateObjects = true;
let gridSize = 100;

function OnLoad ()
{
    let renderer = new THREE.WebGLRenderer ();

    renderer.setSize (window.innerWidth, window.innerHeight);
    renderer.setClearColor (0xffffff);
    document.body.appendChild (renderer.domElement);

    let scene = new THREE.Scene ();
    
    let camera = new THREE.PerspectiveCamera (45, window.innerWidth / window.innerHeight, 1.0, 100000.0);
    camera.position.set (-80.0, 20.0, 100.0);
    camera.lookAt (new THREE.Vector3 (0.0, 0.0, 0.0));

    let baseSize = 0.1;
    let gapSize = 0.01;
    let height = 0.01;
    let heightIncrease = 0.0001;

    if (separateObjects) {
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                let geometry = new THREE.BoxGeometry (baseSize, height, baseSize);
                let material = new THREE.MeshPhongMaterial ({ color: 0x00ff00 });
                let mesh = new THREE.Mesh (geometry, material);
                mesh.position.x = i * baseSize + (i - 1) * gapSize;
                mesh.position.z = j * baseSize + (j - 1) * gapSize;
                mesh.position.y = height / 2.0;
                scene.add (mesh);
                height += heightIncrease;
            }
        }
    } else { 
        let geometries = [];
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                let geometry = new THREE.BoxGeometry (baseSize, height, baseSize);
                geometry.translate (i * baseSize + (i - 1) * gapSize, height / 2.0, j * baseSize + (j - 1) * gapSize);
                geometries.push (geometry);
                height += heightIncrease;
            }
        }
        let geometry = BufferGeometryUtils.mergeGeometries (geometries);
        let material = new THREE.MeshPhongMaterial ({ color: 0x00ff00 });
        let mesh = new THREE.Mesh (geometry, material);
        scene.add (mesh);        
    }

    scene.add (new THREE.AmbientLight (0xffffff, 0.5));
    let light = new THREE.DirectionalLight (0xffffff, 2.0);
    light.position.set (1.0, 2.0, 3.0);
    scene.add (light);
    
    new OrbitControls (camera, renderer.domElement);

    let stats = new Stats ();
    stats.showPanel (0);
    document.body.appendChild (stats.dom);

    function animate () {
        stats.begin ();
        requestAnimationFrame (animate);
        renderer.render (scene, camera);
        stats.end ();
    }
    animate ();
}

window.addEventListener ('load', () => {
    OnLoad ();
});
