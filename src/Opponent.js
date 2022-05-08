class Opponent{
    constructor(Font){
        this.object = new Objective(width/2,"opponent",3,Font,240,5,10);
        this.object.lim = 9*width/4;
        this.distance = width/2;
    }
    clicked(content){
        this.object.dialog.push(content);
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