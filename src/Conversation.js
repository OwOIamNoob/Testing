class Converse{
    constructor(size,delay){
        //style
        this.Font = loadFont("assets/font/UVNAiCapNang.TTF");
        this.size = size;
        //animation
        this.speed = 3 * 255/(delay);
        this.dialog = [];
        //position
        this.pos = 0;
        this.opa = 0;
        this.isDisplaying = false;
        this.delay = delay;
        this.time = 0;
        this.active =0;
    }
    display(x,y){
        // text(this.time,200,300);
        // text(frameCount,200,350);
        if(this.dialog.length > 0 && this.active){
        if(this.pos < this.dialog.length ){
            push();
            //initializing characteristics
            textSize(this.size);
            textFont(this.Font);
            fill(255,255,255,this.opa);
            //rendering
            text(this.dialog[this.pos],x,y,width/3,height/6);
            //updating
            this.opa = max(0,min(255,this.opa + ( (frameCount - this.time) >= 2*(this.delay/3) + 5 ? -1:1)*this.speed));
            pop();
            if(frameCount - this.time >= this.delay+5){
                this.pos ++ ;
                this.time = frameCount;
                this.opa = 0;
            }
        }
        else {
            //line finished
            this.dialog = [];
            this.pos = 0;
            this.active = false;
        }
        }
    }
    push(inp,prior){
        if(this.dialog.length == 0 || prior){
            if(inp)    this.dialog = inp.split(";");
            this.pos = 0;
            this.time = frameCount;
            this.active = true;
            console.log(this.dialog);
        }
        
    }

}
var global = window || global;
global.Converse = Converse;