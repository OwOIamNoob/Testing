class Suggestion{
    constructor(preset,x,y,radius){
        this.value = preset;
        this.x = x;
        this.y = y;
        this.width = radius;
        this.object = new Character(this.x,this.y,this.width/15,this.width/2,48,8,color(random(170,200),random(170,200),random(150,200)),true,random(0,2*PI));
        this.active = false;
    }
    clicked(){
            if(mouseX >= this.x-this.width && mouseX<= this.x + this.width && mouseY >= this.y - this.width && mouseY <= this.y + this.width){
                this.active = !this.active;
                if(this.active) this.object.update(this.value);
                else this.object.update(48);
            }
    }
    show(){
        this.object.display();
    }
}