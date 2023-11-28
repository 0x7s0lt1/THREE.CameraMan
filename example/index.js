let scene,camera,renderer,controls,myCameraMan;

import * as THREE from 'https://cdn.skypack.dev/three@v0.131.3';

import { OrbitControls } from 'https://cdn.skypack.dev/pin/three@v0.131.3-QQa34rwf1xM5cawaQLl8/mode=imports,min/unoptimized/examples/jsm/controls/OrbitControls.js';

function init(){

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x000000 );

    camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        0.4,
        1000
    );

    renderer = new THREE.WebGLRenderer({
        antialias:false,
        alpha: false,
        canvas : document.getElementById('canvas')
    });


    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth,window.innerHeight);


    controls = new OrbitControls( camera, renderer.domElement );
    controls.update();

    myCameraMan = new CameraMan(camera);

    function onResize(){

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth,window.innerHeight);
    
    }

    window.addEventListener("resize",onResize);
    onResize();

    
    const cube = new THREE.Mesh( 
        new THREE.BoxGeometry( 1, 1, 1 ),
        new THREE.MeshBasicMaterial( {color: 0x00ff00} )
    );

    scene.add( cube );

    
    const gridHelper = new THREE.GridHelper( 10, 20, 0x888888, 0x444444 );
    scene.add( gridHelper );

    const ambientLight = new THREE.AmbientLight( 0xffffff, 0.9 );
    scene.add( ambientLight );


    camera.position.z += 10; 
    camera.position.y += 3; 


    myCameraMan.loadTrack('./example-track.json',(track)=>{
        myCameraMan.playTrack(track,60,true);
    });


    animate();

}


function animate(){

    requestAnimationFrame(animate);
    myCameraMan.update();

    render();
    
}

function render() {
    camera.updateMatrixWorld();
    renderer.render( scene, camera );
}


window.addEventListener("load",init,false);
