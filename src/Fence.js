class Fence{
    constructor(divisor,limit){
        this.y = 5*height/7;
        this.size = divisor;
        this.ref = [];
        this.total = int(random(limit - width/2,limit - width/6));
        this.width = int(this.total/divisor);
        console.log('width: ' + this.width);
        this.begin = int(width/6);
        for(let i = 0;i<7;i++){
            this.ref[i] = loadImage('assets/object/fence' + i+'.png');
        }
        console.log('fence :' + this.ref.length);
        this.obj = [];

        for(let i =0;i<this.size;i++){
            this.obj[i] = int(random(-3,6.5));
        }
        console.log('fence style ' + this.obj);
        this.start = loadImage("assets/object/kiot.png");
    }
    show(x){
        push();
        
        for(let i = max(0,int((x-10)/this.width)-1) ;i < min(this.size,(x+width)/this.width);i++){
           if(i  == 0) image(this.start,0,height/2,width/4,height/3);
           if(this.obj[i] < 0) continue;
            image(this.ref[this.obj[i]],i*this.width + this.begin,this.y,this.width,5*height/6 - this.y);
        }

        pop();
    }
}