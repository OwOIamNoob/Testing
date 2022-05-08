class Input{
    constructor(size){
        this.size = size;
        this.graphic = [];
        this.active = false;
        this.c_size = width/size * 4/5;
        this.spacing = width/(size*10);
        this.x = width/2;
        this.y = height/4;
        this.index = 0;
        for(let i = 0;i<size;i++){
            this.graphic[i] = new Character(width/10 + this.c_size*i + this.spacing*i,this.y,this.c_size/8,this.c_size/2,48,8,color(200+i/this.size*50,200 + i/this.size*20,230-i/this.size*150),true,0 );
        }
        this.value = [];
    }
    typed(){
        if(this.active){
            if(keyCode >= 65 && keyCode <= 90){
                this.value[this.index] = key;
                this.graphic[this.index].update(keyCode);
                this.index = min(this.size - 1,this.index +1);
                
            }
            else
            {
                this.value.pop();
                this.graphic[this.index].update(48);
                this.index--;
                if(this.index < 0) this.index = 0;
            }
        }
    }
    reset(){
        this.index = 0;
        this.value = [];
        for(let i  = 0;i<this.size;i++) this.graphic[i].update(48);
    }
    show(){
        for(let i =0;i<this.size;i++) 
        {
            this.graphic[i].display();
        }
    }
}