class Character{
  constructor(x,y,size,width,preset,speed,colour,particle,angle){
    this.angle = angle;
    this.particle = particle;
    this.extra = 50;
    this.assemble = preset;
    this.pos_x = x - width;
    this.width = width;
    this.pos_y = y - width;
    this.size = size;
    this.speed = speed;
    this.end = c_preset[preset];
    this.posit_x = [];
    this.posit_y = [];
    this.line  = c_line[preset];
    this.vect = [];
    this.intact = false;
    //initial particle
    if(particle){
      this.alpha = 255;
      this.p_size = [2,2,2,2,2,2];
      this.p_speed = [2,2,2,2,2,2];
      this.p_lim = [size,size,size,size,size,size];
      this.star = createGraphics(this.width*2+this.extra,this.width*2+this.extra);
      this.p_color = [];
      for(let i =0;i<6;i++) this.p_color[i] = color(random(100,255),random(100,255),random(190,255));
    }
    for(let i = 0;i<6;i++){
      this.posit_x[i] = int(this.end[i] % 3 ) * this.width;
      this.posit_y[i] = int(this.end[i] / 3 ) * this.width;
      this.vect[i] = createVector(0,0);
    }
    this.accuracy = 2;
    //normalizing speed
    this.dis = [];
    this.color = colour;
    //displayer
  this.buffer = createGraphics(this.width*2+this.extra,this.width*2+this.extra);
  }
  //distance
  distance(i){
    return sqrt(pow(this.posit_x[i] - int(this.end[i] % 3)* this.width,2) + 
                pow(this.posit_y[i] - int(this.end[i] / 3) * this.width,2));
  }
  
  //checking
  check(){
        let check = true;
     //checking
    for(let i = 0;i<6;i++){
      let temp = float(this.speed*this.distance(i)/this.dis[i]);
      if(this.distance(i) > 3*this.width){
       this.posit_x[i] = int(this.end[i] % 3) * this.width;
       this.posit_y[i] = int(this.end[i] / 3) * this.width;
        check = false;
      }
    if(this.distance(i) > this.accuracy) {
      //adjusting
        
         this.posit_x[i] += this.vect[i].x*temp;
         this.posit_y[i] += this.vect[i].y*temp;
        check = false;
        }
    }
    this.intact = check;
  }
  //draw onto buffer
  draw(){
    this.buffer.clear();
    this.buffer.push();
  
    this.buffer.strokeWeight(this.size/2);
    this.buffer.translate(this.extra/2,this.extra/2);
    this.buffer.stroke(this.color);
    
        for(let i = 0;i<6;i++){
      
      //path rendering
      this.buffer.line(this.posit_x[i],this.posit_y[i],
             this.posit_x[this.line[i]],this.posit_y[this.line[i]] );  
    }
    
    this.buffer.pop();
  }
   //particle art
   gen(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    this.star.beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius2;
      let sy = y + sin(a) * radius2;
      this.star.vertex(sx, sy);
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      this.star.vertex(sx, sy);
    }
    this.star.endShape(CLOSE);
  }
  //particle rendering
  glow(){
    this.star.clear();
    for(let i=0;i<6;i++){
      this.star.fill(this.p_color[i]);
      this.star.push();
      this.star.blendMode(ADD);
      this.star.translate(this.extra/2 + this.posit_x[i],this.extra/2 + this.posit_y[i]);
      this.gen(0,0,this.p_size[i],this.p_lim[i],4);
      this.star.pop();
      this.p_size[i] += this.p_speed[i];
      
      if(this.p_size[i] >= this.p_lim[i]/3 && this.p_speed[i] > 0){
        this.p_speed[i] = random(-0.5,-0.1);
      }
      else if(this.p_size[i] <= 1 && this.p_speed[i] < 0){
        this.p_speed[i] = random(0.1,0.5);
      }

    }
  }
    //updating
    update(value){
      if(value >= 65 && value <= 90 || value == 189 || value == 48)
        {
      this.end = c_preset[value];
      this.line = c_line[value];
      this.assemble = String.fromCharCode(value);
      for(let i = 0;i < 6;i ++){
        if(int(this.posit_x[i]) != int(int(this.end[i] % 3)* this.width) ||   
           int(this.posit_y[i]) != int(int(this.end[i] /3) * this.width)){
        this.vect[i] = createVector(int(this.end[i] % 3)* this.width - this.posit_x[i],
                                    int(this.end[i] / 3)* this.width - this.posit_y[i]);
        this.dis[i] = this.distance(i);
        this.vect[i].normalize();
            }
          }
        }
        this.intact = false;
    }
  //displaying
  display(){
    
    
    if(this.particle){
      push();
      //drawing particle
      this.glow();
      blendMode(DODGE);
      translate(this.pos_x,this.pos_y);
      rotate(this.angle);
      image(this.buffer,-this.extra/2-this.width,-this.extra/2-this.width);  
      //displaying particles
      blendMode(ADD);
      image(this.star,-this.extra/2-this.width,-this.extra/2-this.width);
      pop();
    }
    else image(this.buffer,this.pos_x-this.extra/2,this.pos_y-this.extra/2);
    if(!this.intact){
      this.check();
      this.draw();
    }
  }
  //draw to another buffer
  transfer(screen,x,y,width,height){
    screen.image(this.buffer,x,y,width,height);
   if(!this.intact){
      this.check();
      this.draw();
    }
  }
}

var global = window || global;
global.Character = Character;