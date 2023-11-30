# Usage

```js
const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.2,
        1000
);

// init CameraMan
const myCameraMan = new CameraMan(camera);

function animate(){
    requestAnimationFrame(animate);
    renderer.render( scene, camera );
    //update
    myCameraMan.update();
}

animate();
    
```
Now you can start recording tracks! With the help of the control keys.

## Play tracks
```js
myCameraMan.loadTrack('./track.json',(track)=>{

    const fps = 60;
    const loop = true;

    myCameraMan.playTrack(track,fps,loop);
        
});
```
## Control keys
<table>
        <hr>
        <td>Key</td>
        </th>
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
