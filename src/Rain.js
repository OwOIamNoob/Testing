//droplets
class Drop{
    constructor(){
        this.x = random(0,width);
        this.y = 0;
        this.w = random(height/150,height/90);
        this.h = random(height/20,height/10);
        this.speed = height/10000*(this.w*this.h);
    }
    draw(){
        rect(this.x,this.y,this.w,this.h);
        this.y = (this.y + this.speed + height)%height;
    }
}
//raining
class Rain{
    constructor(drop,period){
        this.drop = [];
        for(let  i = 0;i<drop;i++) this.drop[i] = new Drop();
        this.fog = loadImage("assets/object/fog.png");
        this.appear = 1;
        this.speed = 2;
        this.active = true;
        this.begin = period*random(0,2);
        this.end = this.begin + period*random(2,3);
        this.period = period*2;
        this.sound = createAudio("assets/sound/rain.mp3");
    }
    show(count){
        if(!this.active) return ;
        if(count/30 > this.begin ){
            //sound
            if(!this.sound.isPlaying && this.active)    this.sound.play();
                //disapear
                if(count/30 > this.end) this.speed = -2;
            push();
            //droplets
            blendMode(MULTIPLY);
            fill(59,71,126);
            noStroke();
            for(let i =0;i<this.drop.length;i++) this.drop[i].draw();
            //fog
            if(this.appear < 255) tint(255,this.appear);
            image(this.fog,0,0,width,height);
            this.appear = max(0,min(255,this.appear + this.speed));
            pop();
            if(this.appear == 0){
                this.sound.stop();
                this.sound.noLoop();
                this.active = false;
            } 
        }
    }
    reset(count){
        if(this.active) return ;
        this.begin = count/30 + random(5,10);
        this.end = this.begin + random(this.period - 5,this.period + 5);
        this.appear = 1;
        this.speed = 2;
        this.active = true;
    }
}