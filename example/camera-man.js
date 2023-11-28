class CameraMan{

    c = 0;
    paused = true;
    interval = false;
    frames = [];

    constructor(camera){

        this.camera = camera;
        
        this.result = document.createElement('a');
        this.result.style.display = 'none';
        document.body.appendChild(this.result);

        window.addEventListener('keydown',this.handleKeyDown.bind(this),false);
        
    }

    start(){
        this.paused = false;
    }

    pause() {
        this.paused = true;
    }

    stop(){

        this.paused = true;
        
        try{
            this.createResultJSON();
        }catch(err){
            console.error(err);
        }finally{
            this.frames = [];
        }
        
    }

    update(){

        if(!this.paused){

            this.frames.push({
                p : { // position
                    x : this.camera.position.x,
                    y : this.camera.position.y,
                    z : this.camera.position.z
                },
                r : { // rotation
                    x : this.camera.rotation.x,
                    y : this.camera.rotation.y,
                    z : this.camera.rotation.z
                }
            });

        }

    }

    createResultJSON(){

        const blob = new Blob([JSON.stringify(this.frames)],{type:"application/json;charset=utf-8"});
        this.result.href = URL.createObjectURL(blob);
        this.result.download = "CM-track-"+new Date().toLocaleString()+".json";

        this.result.click();

    }

    loadTrack(src,callback){
       
        fetch(src)
        .then(res => res.json())
        .then(data => callback(data) )

    }

    playTrack(track, fps = 120, loop = true){

        this.interval = setInterval(function(){

            if(this.c < track.length){

                this.camera.position.set( track[this.c].p.x, track[this.c].p.y, track[this.c].p.z );
                this.camera.rotation.set( track[this.c].r.x, track[this.c].r.y, track[this.c].r.z );
            
                this.c++;

            }else{
                if(loop){
                    this.c = 0;
                }else{
                    clearInterval(this.interval);
                }
            }
        
        }.bind(this),1000/fps);

    }

    pauseTrack(){
        clearInterval(this.interval);
    }
    stopTrack(){
        clearInterval(this.interval);
        this.c = 0;
    }

    handleKeyDown(e){

        switch(e.keyCode){
    
            case 49: //START 1
                this.start();
            break;
            case 50:  //PAUSE 2
                this.pause();
            break;
            case 51:  //STOP 3
                this.stop();
            break;
            case 52:  //LOG CAM ACTUAL POSITION 4
                console.log({ 
                    ROTATION : {
                        x: this.camera.rotation.x, y: this.camera.rotation.y , z: this.camera.rotation.z
                    },
                    POSITION : {
                        x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z
                    }
                });
            break;
    
        }
       
    }

}