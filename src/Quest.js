class Quest{
    constructor(word){
        this.ans = word;
        this.graphic = [];
        this.fail = [];
        //auto word style
        this.c_size = min(width/this.ans.length * 4/5,height/5);
        this.spacing = width/(this.ans.length*10);
        this.x = width/2;
        this.y = height/4;
        this.index = 0;
        for(let i = 0;i<this.ans.length;i++){
            this.graphic[i] = new Character(this.x + (i-this.ans.length/2+1/2)*this.c_size + 2*(i-this.ans.length/2 + 2)*this.spacing,this.y,this.c_size/8,this.c_size/2,48,8,color(200+i/this.ans.length*50,200 + i/this.ans.length*20,230-i/this.ans.length*150),true,0 );
        }
        //quest status
        this.num = 0;
        this.done = false;
        console.log("Quest assigned");
    }

    show(){
        for(let i =0;i < this.graphic.length;i++){
            this.graphic[i].display();
        }
    }
    update(value){
        let success = [];
        for(let i = 0; i < this.graphic.length;i++){
            if(String.fromCharCode(value) == this.ans[i] && String.fromCharCode(this.graphic[i].assemble) != this.ans[i]){
                success[success.length] = i;
                this.graphic[i].update(value);
                this.num ++ ;
            }
        }
        if(this.num >= this.graphic.length) this.done = true;
        return success;
    }
}