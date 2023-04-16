class CameraMan{

    constructor(camera){

        this.camera = camera;
        this.c = 0;
        this.isPaused = true;
        this.animIntervall = false;
        this.animationArray = [];

        this.result = document.createElement('a');
        this.result.style.display = 'none';
        document.body.appendChild(this.result);

        window.addEventListener('keydown',this.handleKeyDown.bind(this),false);
        
    }

    start(){
        this.isPaused = false;
        console.log("[CAMERA MAN] recording STARTED!");
    }

    pause() {
        this.isPaused = true;
        console.log("[CAMERA MAN] recording PAUSED!");
    }

    stop(){

        this.isPaused = true;
        console.log("[CAMERA MAN] recording STOPED");
        try{

            const blob = new Blob([JSON.stringify(this.animationArray)],{type:"application/json;charset=utf-8"});
            this.result.href = URL.createObjectURL(blob);
            this.result.download = "CM-animation-"+new Date().toLocaleString()+".json";
            this.result.click();
            console.log("[CAMERA MAN] recording is SAVED as",this.result.download);

        }catch(err){
            console.error(err);
        }finally{
            this.animationArray = [];
        }
        
    }

    update(){

        if(!this.isPaused){

            this.animationArray.push({
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

    loadTrack(src,callback){
       
        fetch(src)
        .then(res => res.json())
        .then(data => {

            callback(data);
            console.log(src + " is LOADED!");

        })

    }

    playTrack(track, loop){

        this.animIntervall = setInterval(function(){

            if(this.c < track.length){

                this.camera.position.set( track[this.c].p.x, track[this.c].p.y, track[this.c].p.z );
                this.camera.rotation.set( track[this.c].r.x, track[this.c].r.y, track[this.c].r.z );
            
                this.c++;

            }else{
                if(loop){
                    this.c = 0;
                }else{
                    clearInterval(this.animIntervall);
                    console.log('[CAMERA MAN] animation FINISED!');
                }
            }
        
        }.bind(this),10);

    }

    pauseTrack(){

        clearInterval(this.animIntervall);
        console.log('[CAMERA MAN] animation PAUSED!');

    }
    stopTrack(){

        clearInterval(this.animIntervall);
        this.c = 0;
        console.log('[CAMERA MAN] animation STOPED!');

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