p5.disableFriendlyErrors = true;
var a;
let f;
let w;
let bg;
let surf;
let b;
let sug;
let fence;
let back;
let moon;
let glow;
function preload(){
    f = loadFont("assets/font/MorrisRomanBlack.ttf");
    bg = loadImage("assets/object/background.png");
  }

function setup() {
  createCanvas(800, 600);
  frameRate(30);
  a = new Player(f);
  b = new Opponent(f);
  w = new Input(10);
  surf = new Block(7,2*width);
  w.active = true;
  sug = new Stellar(6,w.y+w.c_size/2,w.c_size/2,'UNFUNUFE');
  fence = new Fence(int(random(10,15)),2*width);
  back = new Bg(f,2*width);
  moon = new Moon(4,1,1);
  glow = new Glitter(8,this.height/20,100,height/2);
}

function draw() {
  background(bg);
  moon.show();
  w.show();
  sug.show();
  glow.show(height/3);
  push();
  translate(max(-2*width,width/2 - b.object.x),0);
  back.show(str(second()),max(0,b.object.x - width/2));
  b.show(a.object.x);
  a.show();

  surf.show(max(0,b.object.x - width/2));
  fence.show(max(0,b.object.x - width/2));

  pop();
  
}
function mouseClicked(event) {
  sug.clicked();
  a.clicked(b.object.x - width/2);
  b.clicked(b.object.x - width/2);
}
function keyPressed(){
  surf.push(key);
  if(keyCode == ENTER) w.reset();
  w.typed();
}