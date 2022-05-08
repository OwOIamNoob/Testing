class Quest{
    constructor(x,y,word,size,width,speed,spacing){
        //characteristics
        this.pos_x = x - (word.length/2)*(width) - ((word.length - 1)/2*spacing);
        this.pos_y = y - width;
        this.ans = word;
        //point size
        this.size = size;
        //word size
        this.width = width;
        this.spacing = spacing;
        //animation speed
        this.speed = speed;
        this.graphic = [];
        this.fail = [];
        
        //initial graphic
        for(let i = 0; i < word.length;i++){
                this.correct[i] = false;
                this.graphic[i] = new Character(this.pos_x + i*width + i*this.spacing,
                                                this.pos_y,this.size,
                                                this.width/2,189,this.speed,true,0);
        }
        //game state
        this.done = false;
        this.num = 0;
    }

    display(){
        for(let i =0;i < this.graphic.length;i++){
            this.graphic[i].display();
        }
    }
    update(value){
        let success = false;
        for(let i = 0; i < this.graphic.length;i++){
            if(String.fromCharCode(value) == this.ans[i]){
                this.correct[i] = true;
                this.graphic[i].update(value);
                this.num ++ ;
            }
        }
        if(this.num == this.graphic.length) this.done = true;
        return success;
    }
}