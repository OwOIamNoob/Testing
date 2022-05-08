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
function preload(){
    f = loadFont("assets/font/MorrisRomanBlack.ttf");
    bg = loadImage("assets/object/background.png");
  }

function setup() {
  createCanvas(displayHeight*4/3, displayHeight);
  frameRate(30);
  a = new Player(f);
  b = new Opponent(f);
  w = new Input(15);
  surf = new Block(7,2*width);
  w.active = true;
  sug = new Stellar(6,w.y+w.c_size/2,w.c_size/2,'UNFUNUFE');
  fence = new Fence(int(random(6,10)),2*width);
  back = new Bg(f,2*width);
  moon = new Moon(4,1,1);
}

function draw() {
  background(bg);
  moon.show();
  w.show();
  sug.show();
  
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
}
function keyPressed(){
  surf.push(key);
  if(keyCode == ENTER) w.reset();
  w.typed();
}
