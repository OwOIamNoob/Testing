var game;
var menu;
let score_bg;
var score;
var lib;
let fail,hint;
let bound = 0;
let bot;
let data = [];
let played = false;
let base;
let end = [];
let ended = false;
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
  //needed things
  lib = loadStrings("assets/context/content/3/sport.txt");
  score = loadTable("assets/context/score/scoreboard.csv",'csv','header');
  score_bg = loadImage("assets/object/scoreboard.png");
  //static import
  fail = loadStrings("assets/context/dialog/Fail.txt");
  hint = loadStrings("assets/context/dialog/Hint.txt");
  base = loadStrings("assets/context/content/Bot.txt");
  //start cutscene
  start = createVideo(["assets/cutscenes/start.mp4"]);
  start.stop();
  start.noLoop();
  start.hide();
  // start_sound = loadSound(["assets/sound/start_sound.mp3"],onSoundLoadSuccess,onSoundLoadError,onSoundLoadProgress);
  //lose game cutscene
  end[-1] = createVideo(["assets/cutscenes/end.mp4"]);
  end[-1].stop();
  end[-1].noLoop();
  end[-1].hide();
  //win game cutscene
  end[1] = createVideo(["assets/cutscenes/Win-end.mp4"]);
  end[1].noLoop();
  end[1].hide();
  end[1].stop();
}
function setup(){
  let cnv = createCanvas(displayHeight*4/3,displayHeight);
  cnv.parent('sketchHolder');
  console.log(lib);
  menu = new Menu(score,score_bg); 
  // a.bot.addbase(base);
}
function draw(){
    background(10);
    push();
    fill(255);
    textSize(height/5);
    textAlign(CENTER);
    text("Click me",width/2,height/2);
    pop();
    //menu manage
    if(menu.active) menu.show();
    else if(!game) image(start,0,0,width,height);
    //gameplay manage
    if(game){
      if(game.hold) game.show();
      else{
        if(!ended){
          ended = true;
          end[game.status].play();
        }
        image(end[game.status],0,0,width,height);
      }
    }
}
function mouseClicked(){
  if(menu.active){
    if(mouseY < height/4) menu.switch();
    else{
      data = menu.clicked();
      if(data){
        console.log(data);
        loadlibrary();
        start.play();
        console.log(lib);
      }
    } 
  }
  else if(!game){
    game = new Gameplay(data[0],2,lib,fail,hint);
    start.stop();
    game.bot.addon(base);
    if(lib.length == 1){
      game.bot_play = true;
      game.player.name = "Bot";
    } 
    // start_sound.stop();
  } 
  else if(game.hold) game.clicked();
  else if(ended){
    hint.pop();
    menu.score.add(game.player.name,data[2],int(data[1]),game.score,int(game.count/30),game.status);
    end[game.status].stop();
    console.log(game.player.name + " " + game.status + " " + game.score + " " + int(game.count/30));
    game = null;
    menu.reset();
    ended = false;
  }
}
function keyPressed(){
  if(game){
    if(game.hold) game.typed();
  }
}
function loadlibrary(){
    console.log("Path :" + "assets/context/content/" + data[1] + "/" + data[2] + ".txt");
    //bot_play
    if(data[3].length > 0){
      lib = [];
      lib[0]= data[3].toUpperCase() + ";It's your word";
      console.log(lib);
    }
    //man play 
    else
    lib = loadStrings("assets/context/content/" + data[1] + "/" + data[2] + ".txt");
}
function mouseWheel(event){
  if(menu.active && !menu.view) menu.score.scrolled(event.delta);
}