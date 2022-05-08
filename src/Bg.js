class Bg{
    constructor(Font,limit){
        this.begin = width/4;
        this.total = limit;
        this.ref = [];
        for(let i = 0;i<2;i++)   this.ref[i] = loadImage('assets/object/object' + i+'.png');
        this.obj = [];
        this.width = [];
        while(true){
            this.obj[this.obj.length] = int(random(-3,1.5));
            this.width[this.width.length] = random(width/12,(this.obj[this.obj.length-1] > 0 ? width/6:width/10));
            this.total -= this.width[this.width.length-1];
            if(this.total < 0){
                this.obj.pop();
                this.width.pop();
                break;
            }
        }
        this.font = Font;
    }
    show(score,x){
        let pos = this.begin;
        for(let i = 0;i<this.obj.length;i++){
            //active or not
            if(pos+this.width[i] < x){
                pos += this.width[i];
                continue;  
            }
            if(pos > x + width) break;
            //rendering
            if(this.obj[i] < 0 ){
                pos += this.width[i];
                continue;
            }
            else {
                let ratio = this.width[i]/this.ref[this.obj[i]].width;
                let h = this.ref[this.obj[i]].height*ratio;
                
                image(this.ref[this.obj[i]],pos,5*height/6 - h,this.width[i],h);
                if(this.obj[i] > 0){
                    push();
                    textAlign(CENTER);
                    textFont(this.font);
                    fill(221,127,0);
                    textSize(this.width[i]/(2*score.length))
                    text(str(score),pos+this.width[i]/2,5*height/6 - 2*h/3);
                    pop();
                }
                
                pos += this.width[i];
            }
        }
    }
}