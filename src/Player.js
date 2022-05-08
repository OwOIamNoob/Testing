class Player{
    constructor(Font,name){
        this.object = new Objective(10,"player",11,Font,300,12,6);
        this.object.lim = 2*width;
        this.light= loadImage("assets/asset/animation/player/light.png");
        this.active = false;
        this.name = name;
    }
    //player movement
    move(){
        if(keyIsDown(39) || keyIsDown(37)){
            this.object.running = true;
           this.object.draw(int(keyCode - 38));
        }
        else this.object.running = false;
    }
    //lights up
    clicked(bound){
        if(mouseX>= this.object.x - bound && mouseX <= this.object.x + this.object.buffer.width - bound  &&
            mouseY>= this.object.y && mouseY <= this.object.y + this.object.buffer.height )
            this.active = !this.active;
    }
    //displaying object
    show(){
        this.move();
        this.object.show();

        if(this.active){
            push();
            blendMode(DODGE);
            image(this.light,this.object.x-10,this.object.y,height/2,height/6);
            pop();
        } 
    }
}