# Usage

```js
// init THREE Camera
camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.2,
        1000
    );

// init CameraMan
myCameraMan = new CameraMan(camera);

// animate function
function animate(){
    requestAnimationFrame(animate);
    renderer.render( scene, camera );
    myCameraMan.update();
}

animate();
    
```
Now you can start record tracks! With the help of the control keys.

## Play tracks
```js
myCameraMan.loadTrack('./src/json/CM-animation.json',(track)=>{

     myCameraMan.playTrack(track,speed,loop);
        
});
```
## Control keys
<table>
  <tr>
    <td>1</td>
    <td>Start recording</td>
  </tr>
  <tr>
    <td>2</td>
    <td>Pause recording</td>
  </tr>
  <tr>
    <td>3</td>
    <td>Stop & save recording</td>
  </tr>
  <tr>
    <td>4</td>
    <td>Console log camera position</td>
  </tr>
</table>
