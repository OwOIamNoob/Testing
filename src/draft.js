var game;
var menu;
var lib;
let fail,hint;
let bound = 0;
let bot;
let data = [];
let played = false;
let base;
//sound debugging
function onSoundLoadSuccess(e){
  console.log("load sound success",e);
}
function onSoundLoadError(e){
  console.log("load sound error",e);
}
function onSoundLoadProgress(e){
  console.log("load sound progress",e);
}
//preload
function preload(){
  lib = loadStrings("assets/context/content/3/sport.txt");
  //static import
  fail = loadStrings("assets/context/dialog/Fail.txt");
  hint = loadStrings("assets/context/dialog/Hint.txt");
  base = loadStrings("assets/context/content/Bot.txt");
  //start cutscene
  start = createVideo(["assets/cutscenes/start.mp4"]);
  start.stop();
  start.noLoop();
  start.hide();
  start_sound = loadSound(["assets/sound/start_sound.mp3"],onSoundLoadSuccess,onSoundLoadError,onSoundLoadProgress);
  start_sound.noLoop();
}
function setup(){
  let cnv = createCanvas(displayHeight*4/3,displayHeight);
  cnv.parent('sketchHolder');
  console.log(lib);
  menu = new Menu(); 
  // a.bot.addbase(base);
}
function draw(){
    background(50);
    if(menu.active) menu.show();
    else if(!game) image(start,0,0,width,height);
    // if(game.hold && game) game.show();
}
function mouseClicked(){
  console.log(lib);
  if(menu.active){
    data = menu.clicked();
    if(data.length > 0){
      loadlibrary();
      start.play();
    } 
  }
  else if(!game){
    game = new Gameplay('Lmao',2,lib,fail,hint);
    start.stop();
    start_sound.stop();
  } 
}
function keyPressed(){
  if(game.hold) game.typed();
}
function loadlibrary(){
    console.log("Path :" + "assets/context/content/" + data[1] + "/" + data[2] + ".txt");
    lib = loadStrings("assets/context/content/" + data[1] + "/" + data[2] + ".txt");
}