class Input{
    constructor(size){
        this.size = size;
        this.graphic = [];
        this.active = false;
        this.c_size = min(width/size * 4/5,height/5);
        this.spacing = width/(size*10);
        this.x = width/2;
        this.y = height/4;
        this.index = 0;
        for(let i = 0;i<size;i++){
            this.graphic[i] = new Character(this.x + (i-size/2+1/2)*this.c_size + 2*(i-size/2 + 2)*this.spacing,this.y,this.c_size/8,this.c_size/2,48,8,color(200+i/this.size*50,200 + i/this.size*20,230-i/this.size*150),true,0 );
        }
        console.log("Input assigned");
    }
    typed(){
        if(this.active){
            if((keyCode >= 65 && keyCode <= 90) || keyCode == 189 || keyCode == 48){
                this.graphic[this.index].update(keyCode);
                this.index = min(this.size - 1,this.index +1);
            }
            //backspace
            if(keyCode == 8)
            {
                // console.log('current index value: ' + this.graphic[this.index].assemble) + ' at index' + this.index;
                this.graphic[this.index].update(48);
                this.index = max(0,this.index -1 );
            }
        }
    }
    botadd(string){
        for(let i = 0;i<this.graphic.length;i++){
            this.graphic[i].update(string.charCodeAt(i));
        }
    }
    reset(){
        this.index = 0;
        for(let i  = 0;i<this.size;i++) this.graphic[i].update(48);
    }
    show(){
        for(let i =0;i<this.size;i++) 
        {
            this.graphic[i].display();
        }
    }
    result(){
        let value = '';
        for(let i = 0;i<=this.index;i++){
            if(this.graphic[i].assemble == 48) break;
            if(this.graphic[i].assemble == 189) value += '-';
            else    value += String.fromCharCode(this.graphic[i].assemble);
        }
        value = value.toUpperCase();
        // console.log(value);
        return value;
    }
}