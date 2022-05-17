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
var timeflag = -1;
var allow = true;
let index = -1;
//game sound
let game_sound,addon;
let bg_sound = [];
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
  //game sound
  game_sound = createAudio("assets/sound/gamebg.mp3");
  //sound effect
  addon  = createAudio("assets/sound/heart.mp3");
      
  //transition sound
  bg_sound[-1] = loadSound("assets/sound/menu0.mp3");
      bg_sound[-1].stop();
  bg_sound[1] = loadSound("assets/sound/menu1.mp3");
      bg_sound[1].stop();
}
function setup(){
  let cnv = createCanvas(displayHeight*4/3,displayHeight);
  cnv.parent('sketchHolder');
  // console.log(lib);
  menu = new Menu(score_bg); 
  bg_sound[index].loop();
  // a.bot.addbase(base);
}
function draw(){
    //touch secure
    if(frameCount < timeflag*30) allow = false;
    else{
      allow = true;
      timeflag = -1;
    } 
    //set background
    background(10);
    //debug screen
    // push();
    //   fill(255);
    //   textSize(height/5);
    //   textAlign(CENTER);
    //   text("Click me",width/2,height/2);
    // pop();
    //menu manage
    if(menu.active) menu.show();
    else if(!game){
      if(!ended)
      image(start,0,0,width,height);
      else  image(end[index],0,0,width,height);
    }
    //gameplay manage
    else
    if(game){
      if(game.hold){
        game.show();  
        addon.volume(game.opponent.object.x/(9/4*width));
      } 
      else if(!ended){
        ended = true;
        index = game.status;
        hint.pop();
        menu.score.add(game.player.name,data[2],int(data[1]),game.score,int(game.count/30),game.status);
        end[index].play();
        // console.log("End index:" + index);
        game = null;
        //stop game sound
        game_sound.stop();
        addon.stop();
      }
    }
    //ending
}
function mouseClicked(){
  if(!allow) return ;
  if(menu.active){
    //to scoreboard
    if(mouseY < height/4) menu.switch();
    else{
      data = menu.clicked();
      if(data){
        // console.log(data);
        loadlibrary();
        start.play();
        // console.log(lib);
        timeflag = frameCount/30 + 2;
        //stop music
        if(index != 0){
          bg_sound[index].stop();
          index = 0;
        }
      }
    } 
    ended = false;
  }
  else if(!game){
    if(!ended){
      game = new Gameplay(data[0],2,lib,fail,hint);
      start.stop();
      game.bot.addon(base);
      game_sound.loop();
      addon.loop();
      addon.volume(game.opponent.object.x/(9/4*width));
      game_sound.volume(game.opponent.distance/(2*width));
      if(lib.length == 1){
      game.bot_play = true;
      game.player.name = "Bot";
      }
    }
    else {
      ended = false;
      menu.reset();
      bg_sound[index].loop();
      end[index].stop();
      ended = false;
    }
   
    // start_sound.stop();
  } 
  else if(game.hold) game.clicked();
}
function keyPressed(){
  if(!allow) return ;
  if(game){
    if(game.hold){
      game.typed();
      //adjust volume
      game_sound.volume(game.opponent.distance/(2*width));
    } 
  }
}
function loadlibrary(){
    console.log("Path :" + "assets/context/content/" + data[1] + "/" + data[2] + ".txt");
    //bot_play
    if(data[3].length > 0){
      lib = [];
      lib[0]= data[3].toUpperCase() + ";It's your word";
      // console.log(lib);
    }
    //man play 
    else
    lib = loadStrings("assets/context/content/" + data[1] + "/" + data[2] + ".txt");
}
function mouseWheel(event){
  if(!allow) return ;
  if(menu.active && !menu.view) menu.score.scrolled(event.delta/40);
}