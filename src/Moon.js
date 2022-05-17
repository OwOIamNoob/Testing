class Moon{
    constructor(attempt,period,delay){
        //general 
        this.period = period;
        this.delay = delay;
        this.color = color(255,255,255);
        this.buffer = createGraphics(width/20,width/20);
        this.radius = this.buffer.width;
        this.exp =  this.buffer.width/2;
        this.angle = -0.489;
        this.duration = attempt*(this.period + this.delay)-this.delay;
        this.speed = 0.978/(this.duration*50);
        this.p_speed = 1.35*this.radius/((this.period + this.delay)*30);
        // console.log("particle speed: " + this.p_speed);
        this.time_started = frameCount/30 - this.delay;
        this.tint = 120/(this.duration*30);
        this.object = loadImage("assets/object/moon.png");
        this.left = attempt+1;
        this.base_x = 2*width/5;
        this.base_y = 17/12*height*cos(-0.489);
        //text
        this.buffer.textAlign(CENTER);
        this.buffer.textSize(this.radius/2);
        this.buffer.strokeWeight(this.radius/20);
        this.buffer.stroke(0);
        console.log("Clock assigned");
    }
    draw(){
        this.buffer.push();
        this.buffer.image(this.object,0,0,this.buffer.width,this.buffer.height);
        this.buffer.fill(0);
        this.buffer.circle(this.exp,this.buffer.height/2,this.radius);
        this.buffer.text(this.left,this.radius/2,2*this.radius/3);
        this.buffer.pop();
        this.exp -= this.p_speed;
        if(this.exp <= -this.buffer.width/2) this.exp = this.buffer.width + this.radius;
    }
    reset(){
        this.exp = this.buffer.width/2;
        this.time_started = frameCount/30 + this.period + this.delay;
        // console.log("next period : "+ this.time_started);
        this.left --;
        // console.log("Index: " + this.left);
    }
    show(){
        let scale = this.buffer.width*(1 + frameCount/(this.duration*30)/3);
        let x = this.base_x + 17/12*height*sin(this.angle);
        let y = height/3 - (17/12*height*cos(this.angle) - this.base_y); 
        this.draw();
        push();
        blendMode(ADD);
        tint(255,255 - this.tint*frameCount/2,255-this.tint*frameCount);
        image(this.buffer,x,y,scale,scale);
        pop();
        this.angle += this.speed;
    }
}