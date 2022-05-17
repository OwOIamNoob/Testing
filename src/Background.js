//disable friendly errors

p5.disableFriendlyErrors = true;
class Background{
  constructor(number,delay,lim,bg){
    this.pointer = [];
    this.radius = displayHeight/4;
    this.buffer = createGraphics(width,height);
    this.buffer.noStroke();
    this.selector = str(int(random(1,5.9))) + '.png';
    this.ref = loadImage('assets/asset/start/' + this.selector);
    console.log("image " + this.ref.width + " " + this.ref.height);
    // console.log(this.buffer.width + ' ' + this.buffer.height);
    
    //transparent or not
    if(bg < 255)  this.buffer.background(bg);
    //initial drawers
    this.stroke = height/6;
    for(let i =0;i<number;i++){
      this.pointer[i] = [];
      this.pointer[i][0] = random(-this.stroke,this.stroke);
      this.pointer[i][1] = random(-this.stroke,this.stroke);
    }
    //loop
    this.delay = delay;
    this.lim = lim; 
    
    // this.displayed = false;
  }
  draw(){
    // this.displayed = false;
    this.buffer.push();
    // if(this.radius > 10) this.buffer.blendMode(BLEND);
    for(let i = 0;i<this.pointer.length;i++){
      //rendering
      let c = this.ref.get(max(0,min(this.ref.width-2,(mouseX+this.pointer[i][0])*this.ref.width/width)),max(0,min(this.ref.height-2,(mouseY + this.pointer[i][1])*this.ref.height/height)));
      let d = color(red(c),green(c),blue(c),255 - this.radius*1.75 );
      this.buffer.fill(d);
      this.buffer.circle(mouseX+this.pointer[i][0],mouseY + this.pointer[i][1],max(1,random(this.radius-3,this.radius+3)));
      //moving
      this.pointer[i][0] = random(-this.stroke,this.stroke);
      this.pointer[i][1] = random(-this.stroke,this.stroke);
    }
    this.buffer.pop();
    this.radius = max(this.lim,this.radius/1.01);
    this.delay = max(2,this.delay - 5);
  }
  show(){
    //showing
    if(this.radius > this.lim)
    image(this.buffer,0,0);
    push();
    //sharpen
    
      if(this.radius > this.lim && this.radius < this.lim*5){
        tint(255,255-(this.radius-this.lim)*255/(4*this.lim));
        image(this.ref,0,0,width,height);
      }   
      else if(this.radius <= this.lim ) this.reset(false);
      pop();
    
    //updating
    if(frameCount % this.delay == 0)      this.draw();
  }
  reset(finish) {
    if(!finish) this.buffer.image(this.ref,0,0,width,height);
    else this.buffer.clear();
    this.radius = displayHeight/4;
    this.selector = str(int(random(1,5.9))) + '.png';
    this.ref = loadImage('assets/asset/start/' + this.selector);
    this.delay = 30;
  }
}