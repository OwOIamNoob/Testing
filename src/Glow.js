class Glitter{
    constructor(speed, radius,density,depth){
        //initial graphic 
        this.model = loadImage('assets/object/background.png');
        this.buffer = createGraphics(width,depth);
        //particle properties
        this.color = [];
        this.pos = [];
        this.speed = speed;
        this.direction = [];
        this.radius = [];
        //initial particle
        this.density = density;
        for(let i =0;i<density;i++){
            this.pos[i] = [random(10,width),-10];
            this.direction[i] = createVector(random(-3,3),random(1.5,3));
            this.direction[i].normalize();
            this.radius[i] = random(max(5,radius - 5),radius + 5);
        }
        //modify graphic
        this.buffer.noStroke();
        this.height = height/3;
        this.buffer.blendMode(ADD);

    }
    //reuse properties
    reset(position,bound){
        this.pos[position][1] = this.buffer.height + 10 ;
        this.pos[position][0] = random(0, min(width,5/2*width - bound));
       this.radius[position] = random(5,35); 
       this.direction[position] = createVector(random(0,3),random(1.5,3));
       this.direction[position].normalize();
    }
    //drawing particles
    draw(y,bound){
        this.buffer.clear();
        for(let i =0; i<this.density; i++){
            //drawing
            this.buffer.push();
            let colour  = color(this.model.get(max(0,min(this.model.width-2,(this.pos[i][0])*this.model.width/width)),
                                max(0,min(this.model.height-2,(this.pos[i][1] + y)*this.model.height/height))));
            colour.setAlpha(255*(this.pos[i][1] - this.radius[i])/this.buffer.height);
            this.buffer.fill(colour);
            this.buffer.circle(this.pos[i][0],this.pos[i][1],this.radius[i]);
            this.buffer.pop();
            //positioning
            this.pos[i][1] -= this.speed*this.direction[i].y;
            this.pos[i][0] = (this.speed*this.direction[i].x + this.pos[i][0]) % width;
            if(this.pos[i][1] <= 0) this.reset(i,bound);
        }
    }
    //displaying
    show(y,bound){
        this.draw(y,bound);
        push();
        blendMode(ADD);
        image(this.buffer,0,y);
        pop();
        
    }
}