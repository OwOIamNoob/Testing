class Player{
    constructor(name){
        this.object = new Objective(10,"player",11,300,width/200,6);
        this.object.lim = 9*width/4;
        this.light= loadImage("assets/asset/animation/player/light.png");
        this.active = false;
        this.name = name;
        console.log("Player " + this.name + " assigned");
    }
    //player movement
    move(){
        if(keyIsDown(39) || keyIsDown(37)){
            this.object.running = true;
            //avoid disalocate
            if(keyCode == 39 || keyCode == 37)   this.object.draw(int(keyCode - 38));
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
        push();
            fill(0);
            text(this.name,this.object.x,this.object.y - 10);
         pop();
        if(this.active){
            
            push();
            
            blendMode(DODGE);
            image(this.light,this.object.x-10,this.object.y,height/2,height/6);
            pop();
        } 
    }
}