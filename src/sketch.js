p5.disableFriendlyErrors = true;
var a;
let f,ff;
let w;
let bg;
let surf;
let b;
let sug;
let fence;
let back;
let moon;
let glow;
let bound  = 0;
let q;
let guess;
let lib; 
let ans;
function preload(){
    f = loadFont("assets/font/MorrisRomanBlack.ttf");
    ff = loadFont("assets/font/score.TTF");
    bg = loadImage("assets/object/background.png");
    lib = loadStrings("assets/context/content/2/sport.txt");
    
  }

function setup() {
  let cnv = createCanvas(displayHeight*4/3, displayHeight);
  cnv.parent("sketchHolder");
  frameRate(30);
  ans = splitTokens(random(lib),';');
  a = new Player(f);
  b = new Opponent(f);
  w = new Input(ans[0].length);
  q = new Quest(ans[0]);
  surf = new Block(7,2*width);
  w.active = false;
  sug = new Stellar(6,w.y+w.c_size/2,w.c_size/2,'UNFUNUFE');
  fence = new Fence(int(random(10,15)),2*width);
  back = new Bg(ff,2*width);
  moon = new Moon(4,1,1);
  glow = new Glitter(3,25,60,height/2);
  guess = new Character(width/2,2*height/3,height/10,height/6,48,15,color(116,35,35),false,0);
  let auth = 'Its meaning can be: \n\n' + ans[1];
  b.hint.push(auth);
}

function draw() {
  background(bg);
 
  moon.show();
  if(w.active) w.show();
  else{
    q.show();
    push();
    blendMode(MULTIPLY);
    guess.display();
    pop();
  } 
  sug.show();
  bound = min(a.object.x - 10,b.object.x - width/2);
  glow.show(height/3,bound);
  push();
  translate(-bound,0);
  back.show(str(second()),bound);
  b.show(a.object.x);
  a.show();
  surf.show(bound);
  fence.show(bound);
  pop();
}
function mouseClicked(event) {
  sug.clicked();
  a.clicked(bound);
  b.clicked(bound);
  if(mouseY >= w.y - w.c_size/2 && mouseY <= w.y + w.c_size/2){
    w.active = !w.active;
    w.reset();
    a.object.dialog.push("I am guessing a " + (w.active ? 'word':'letter'),true);
  } 
}
function keyPressed(){
  if(w.active){
    w.typed();
    if(keyCode == ENTER ){
      let value = w.result();
      a.object.dialog.push("It's " + value,true);
      if(value != q.ans){
        surf.push('Fail');
        w.reset();
      }
      else{
        b.object.dialog.push("Yes;Yes it is;Thank you",true);
      }
    }
  }
  else{
    if(keyCode >= 65 && keyCode <= 90) guess.update(keyCode);
    else if(keyCode == 13){
      let value =  String.fromCharCode(guess.assemble);
      value = value.toUpperCase();
      if(value == 'A' ||
         value == 'E' ||
         value == 'O' ||
         value == 'I' ||
         value == 'U' )
      a.object.dialog.push("It has an " + value ,true);
      else a.object.dialog.push("It has a " + value,true);
      let pos = [];
      pos = q.update(int(guess.assemble));
       if(pos.length == 0) surf.push(value);
      guess.update(48);
    }
  }
  
}