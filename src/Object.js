class Objective{
    constructor(start,type,size,font,delay,speed,fps){
        //bot or player
        this.type  = str(type);
           //positioning
        this.x = start;
        this.y = 2*height/3;
        this.lim = 3*width/2-width/15;
        //animation
        this.index = 0;
        this.idle = loadImage("assets/asset/animation/"+this.type+"/idle.png");
        this.ani = [];
        this.fps = fps;
        console.log(this.type + " fps :" + this.fps);
        this.delay = delay;
        this.frame = size;
        //import animation
        for(let i =1;i<=this.frame;i++){
          let path = 'assets/asset/animation/' + this.type + '/' + str(i) + ".png";
          this.ani[i-1] = loadImage(path);
        } 
        //dialog
        this.lib = loadStrings("assets/context/dialog/" + this.type + ".txt");
        this.dialog = new Converse(font,20,delay/3);
        //display
        this.buffer = createGraphics(width/15,height/6);
        this.speed = speed;
        this.running = false;
    }
    draw(direction){
            //positioning
            
            if(this.running && frameCount % this.fps == 0){
                this.index += int(this.frame + direction);
                while(this.index >= this.frame) this.index -= int(this.frame);
                
            //animate
            this.buffer.clear();
            this.buffer.image(this.ani[this.index],0,0,this.buffer.width,this.buffer.height);
            }
            this.x = max(10,min(this.lim,this.x + int(this.speed*direction)));
            
    }   
    show(){
        if(this.running ){
            image(this.buffer,this.x,this.y);
        }   
        else image(this.idle,this.x,this.y,height/12,height/6);
         //display dialog
        if(this.dialog.dialog)    this.dialog.display(this.x + 30,this.y-30);
        if(frameCount % this.delay == 0) this.dialog.push(random(this.lib));
    }
  }