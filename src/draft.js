
var menu;
var lib;
let fail,hint;
let bound = 0;
let bot;
let end = [];
let played = false;
let base;
function preload(){
  base = loadStrings("assets/context/content/Bot.txt");
  lib = loadStrings("assets/context/content/2/mental3.txt");
  fail = loadStrings("assets/context/dialog/Fail.txt");
  hint = loadStrings("assets/context/dialog/Hint.txt");
  
}
function setup(){
  let cnv = createCanvas(displayHeight*4/3,displayHeight);
  cnv.parent('sketchHolder');
  console.log(base);
  a = new Gameplay('Hungfake44',3,lib,fail,hint); 
}
function draw(){
    background(50);
    if(a.hold) a.show();
    else if(!played){
      end[int(1/2 + a.status/2)].show();
      end[int(1/2 + a.status/2)].play();
      played = true;
    } 
}
function mouseClicked(){
  a.clicked();
}
function keyPressed(){
  a.typed();
}
