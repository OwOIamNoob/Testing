class Moon{
    constructor(attempt,period,delay){
        this.buffer = createGraphics(width/20,width/20);
        this.period = period;
        this.delay = delay;
        this.color = color(255,255,255);
        this.radius = this.buffer.width;
        this.exp =  this.buffer.width + this.radius;
        this.angle = -17*PI/24;
        this.duration = attempt*(this.period + this.delay)-this.delay;
        this.speed = PI/(6*this.duration*30);
        this.time_started = frameCount/30;
        this.tint = 120/(this.duration*30);
        this.object = loadImage("assets/object/moon.png");
        this.left = attempt;
    }
    draw(){
        this.buffer.push();

        this.buffer.tint(255,255 - this.tint*frameCount/2,255-this.tint*frameCount);
        this.buffer.image(this.object,0,0,this.buffer.width,this.buffer.height);
        this.buffer.fill(0);
        this.buffer.circle(this.exp,this.buffer.height/2,this.radius);
        this.buffer.pop();
        this.exp -= 4*this.radius/(this.period*30);
    }
    reset(){
        this.exp = this.buffer.width + this.radius;
        this.time_started += this.period + this.delay;
        console.log("next period : "+ this.time_started);
        this.left --;
    }
    show(){
        let scale = this.buffer.width*(1 + frameCount/(this.duration*30)/3);
        if(frameCount/30 - this.time_started < this.period){
            this.draw();
        }
        else this.reset();
        push();
        blendMode(ADD);
        translate(width/2,width+height/2);
        rotate(this.angle);
        image(this.buffer,5*width/4,height/3,scale,scale);
        pop();
        this.angle += this.speed;
        this.blue -= this.tint;
    }
}