class Word{

    constructor(x,y,model,bind,size,width,spacing,speed,color,particle){
        //position
        this.pos_x = x - (model.length/2)*(width) - ((model.length - 1)/2*spacing);
        this.pos_y = y - width;
        //initializing 
        this.bind = [];
        this.bind = bind;
        this.model = model;
        this.size = size;
        this.width = width;
        this.spacing = spacing;
        this.speed = speed;
        this.band = model.length*width + (model.length - 1)*spacing;
        //graphic
        this.graphic = [];
        this.color = color;
        //initial graphic
        for(let i =0;i<this.model.length;i++){
            this.graphic[i] = new Character(this.pos_x + i*this.width + (2*i - 0.5)*this.spacing,
                                            this.pos_y,this.size,
                                            this.width/2,this.bind.charCodeAt(i),this.speed,this.color,particle,0);
        }
        //status
        this.active = false;
        this.passive = true;
    }
    check(){
        if(mouseX >= this.pos_x &&
            mouseX <= this.pos_x + this.band && 
            mouseY >= this.pos_y - this.width && 
            mouseY <= this.pos_y + this.width ){
              if( !this.active ){
                for(let i = 0;i<this.graphic.length;i++){
                    this.graphic[i].update(int(this.model.charCodeAt(i)));
                }
                this.active = true;
                this.passive = false;
              }
                
        }
        else{
            if(!this.passive){
            for(let i = 0;i<this.graphic.length;i++){
                this.graphic[i].update(this.bind.charCodeAt(i));
            }
              this.active = false;
              this.passive = true;
            }
        }
    }
    display() {
        this.check();
        for(let i = 0;i<this.graphic.length;i++){
            this.graphic[i].display();
        }
    }
    update(value,pos){
      this.bind = this.bind.substring(0,pos) + value + this.bind.substring(pos+1);
    }
}