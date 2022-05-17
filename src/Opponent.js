class Opponent{
    constructor(hint){
        this.object = new Objective(width/2,"opponent",3,300,width/250,10);
        this.hint = hint;
        console.log("Hint:" + this.hint.length);
        this.object.lim = 9*width/4;
        this.distance = width/3;
        console.log("Opponent assigned");
        if(this.hint.length == 0) console.log("Hint initial failed");
    }
    //interaction
    clicked(bound){
        if(mouseX>= this.object.x - bound && mouseX <= this.object.x + this.object.buffer.width - bound  &&
            mouseY>= this.object.y && mouseY <= this.object.y + this.object.buffer.height ) this.object.dialog.push(random(this.hint),true);
    }
    move(pos){
        //positioning
        if(this.object.x - pos < this.distance && this.object.x < this.object.lim){
            this.object.running = true;
            this.object.draw(int(1));
        }    
        else this.object.running = false;
    }
    touched(pos){
        return (this.object.x - pos <= 0);
    }
    show(pos){
        this.move(pos);
        this.object.show();   
    }
}