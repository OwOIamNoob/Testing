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
    constructor(drop){
        this.drop = [];
        for(let  i = 0;i<drop;i++) this.drop[i] = new Drop();
        this.fog = loadImage("assets/object/fog.png");
        this.appear = 1;
        this.speed = 2;
        this.active = true;
        this.begin = random(40,60);
        this.end = this.begin + random(30,90);
    }
    show(){
        if(!this.active) return ;
        if(frameCount/30 > this.begin ){
                //disapear
                if(frameCount/30 > this.end) this.speed = -2;
            push();
            blendMode(MULTIPLY);
            if(this.appear < 255) tint(255,this.appear);
            image(this.fog,0,0,width,height);
            fill(59,71,126);
            noStroke();
            for(let i =0;i<this.drop.length;i++) this.drop[i].draw();
            this.appear = max(0,min(255,this.appear + this.speed));
            pop();
            if(this.appear == 0) this.active = false;
        }
    }
    reset(){
        if(this.active) return ;
        this.begin = frameCount/30 + random(10,20);
        this.end = this.begin + random(20,40);
        this.appear = 1;
        this.speed = 2;
        this.active = true;
    }
}