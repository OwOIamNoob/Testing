class Gameplay{
    constructor(name,difficulty,theme){
        //game is going
        this.hold = true;
        //general information
        this.bonus = difficulty;
        thís.attempt = 18-difficulty*3;
        this.failure = 9-2*difficulty;
        this.delay = 8;
        //database
        this.path = "assets/context/content/" + str(difficulty) + "/" + theme + '.txt';
        this.lib = loadStrings(this.path);
        this.answer = splitTokens(random(this.lib),';');
        console.log(this.answer);
        this.fail = loadStrings("assets/context/dialog/Fail.txt");
        //font
        this.conv_font = loadFont("assets/font/MorrisRomanBlack.ttf");
        this.object_font = loadFont("assets/font/led_counter-7.ttf");
        this.scrore_font = loadFont("assets/font/score.ttf");
        //interactive object initials
        //
        this.player = new Player(this.conv_font,name); /*6*/
        this.opponent = new Opponent(this.conv_font);/*7*/
        this.input = new Input(this.answer[0].length);/*4*/
        this.quest = new Quest(this.answer[0]); /*4*/ 
        this.guess = new Character(width/2,2*height/3,height/10,height/6,48,15,color(116,35,35),false,0);/*2*/
        this.suggestion = new Stellar(6,input.y+input.c_size/2,input.c_size/2,this.answer[0]); /*3*/
        this.bot  = new Bot(this.path,this.answer[0].length);
        //background objects
        //
        this.bg = loadImage("assets/object/background.png");
        this.background = new Bg(this.scrore_font);/*5*/
        this.foreground = new Fence(int(random(10,15.5)),2*width);/*9*/
        this.clock = new Moon(this.attempt,this.period,5); /*1*/
        this.surface = new Block(this.failure,2*width);/*8*/
        this.glitter = new Glitter(3,25,60,height/2);/*0*/
        //key event allowance
        this.allow = true;
        //player info
        this.reward = 50*difficulty/2;
        this.degrade = 0.05;
        this.score = 0;
        this.original = 0;
        this.penalty = 1;
        //game trimming
        this.translate = 0;
        //status
        this.status = 0;
        //time 
        this.time = frameCount;
        //translate
        this.bound  = 0;
    }
    //interaction
    clicked(){
        if(!this.allow) return ;
        if(this.suggestion.clicked()){
            this.penalty = max(1-this.degrade*this.suggestion.graphic.length,this.penalty - this.degrade) ;
            this.score = this.original*this.penalty;
        } 
        this.player.clicked(); 
        this.opponent.clicked();
        if(mouseY >= this.input.y - this.input.c_size/2 && mouseY <= this.input.y + this.input.c_size/2){
            this.input.reset();
            this.input.active = !this.input.active;
            this.player.object.dialog.push("I am guessing a " + (w.active ? 'word':'letter'),true);
        }
    }
   
    
    //positioning
    update(status){
        if(status == false){
            this.opponent.distance += width/this.failure;
        }
        else {
            this.opponent.distance -= (width/this.failure)/2 ;
        }
    }
    //check input
    check(){
        if(!this.active){
            //checking
            let pos = this.quest.check();
            //bot library filtering
            this.bot.filter(this.direct,pos);
            if(pos.length == 0){
                this.surface.push(this.direct);
                return false;
            } 
            else {
                this.original += 50;
                this.score = this.original*this.penalty;
                return true;
            }
        }
        else{
            if(this.direct != this.answer[0]){
                return false;
        
            }
            else {
                this.original += 50*this.bonus + 50*this.direct.length;
                this.surface.push('0');
                this.score = this.original*this.penalty;
                this.status = 1;
                return true;
            }
        }
    }
    //keyPressed
    typed(){
        if(this.allow){
            if(this.input.active){
                this.input.typed();
                if(keyCode == ENTER ){
                  let value = this.input.result();
                  this.player.object.dialog.push("It's " + value,true);
                  if(value != q.ans){
                    this.surface.push('Fail');
                    this.input.reset();
                  }
                  else{
                    this.opponent.object.dialog.push("Yes;Yes it is;Thank you",true);
                    this.opponent.object.speed = -this.opponent.object.speed;
                  }
                }
              }
              else{
                if(keyCode >= 65 && keyCode <= 90) this.guess.update(keyCode);
                else if(keyCode == 13){
                  let value =  String.fromCharCode(this.guess.assemble);
                  value = value.toUpperCase();
                  if(value == 'A' ||
                     value == 'E' ||
                     value == 'O' ||
                     value == 'I' ||
                     value == 'U' )
                  this.player.object.dialog.push("It has an " + value ,true);
                  else this.player.object.dialog.push("It has a " + value,true);
                  let pos = [];
                  pos = this.quest.update(int(this.guess.assemble));
                   if(pos.length == 0) this.surface.push(value);
                  this.guess.update(48);
                }
              }
            
            
        }
    }
    //conclude game
    endgame(){
        if(this.opponent.x == this.opponent.object.lim) this.status = -1;
        else if(this.opponent.x == this.player.x ) this.status = 1;
        if(this.quest.done){
                this.opponent.object.speed = -this.opponent.object.speed;
                this.opponent.distance = 3*width;
        }
        if(this.surface.content.length >= this.failure) this.opponent.distance = 3*width;
        if(this.status != 0) this.hold = false;
    }
    //displaying
    show(){
        if(!this.hold) return ;
        if(frameCount < this.time || this.status != 0 || this.quest.done || this.surface.content.length == this.failure || this.clock.left == -1 ) this.allow = false;
        else this.allow = true;
        //bg
        background(this.bg);
        //effect
        this.glitter.show();
        //clock 
        this.clock.show();
        //guess
        this.guess.display();
        //suggestion
        this.suggestion.show();
        //quest shot
        if(this.active)   this.input.show();  
        else this.quest.display();   
        //in relative position
        this.bound = min(this.player.object.x -10,this.opponent.object.x - width/2);
        push();
        
        translate(-this.bound,0);
        //back object
        this.background.show(this.score,bound);
        //character object
        this.player.show();
        this.opponent.show(this.player.object.x);
        //foreground objects
        this.surface.show(this.bound);
        this.foreground.show(this.bound);
        pop();
        this.original = max(0,this.original - this.degrade/2);
    }
}
