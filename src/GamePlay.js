class Gameplay{
    constructor(name,difficulty,library,fail,hint){
        //game is going
        this.hold = true;
        console.log(this.hold);
        //general information
        this.bonus = 25*difficulty;
        this.attempt = 18 - difficulty * 3;
        this.failure = 11 - 2 * difficulty;
        this.period = 15*(4 - difficulty);
        this.delay = 5;
        //database
        
        this.lib = library;
        this.answer = splitTokens(random(this.lib),';');
        console.log(this.answer);
        this.fail = fail;
        this.hint = hint;
        console.log("Fail : " + this.fail.length);
        //interactive object initials
        //
        this.player = new Player(name); /*6*/
        this.opponent = new Opponent(this.hint);/*7*/
        //addition
        
        this.input = new Input(this.answer[0].length);/*4*/
        this.quest = new Quest(this.answer[0]); /*4*/ 
        this.guess = new Character(width/2,2*height/3,height/10,height/6,48,15,color(116,35,35),false,0);/*2*/
        if(this.guess) console.log("Guess assigned");
        this.suggestion = new Stellar(6,this.input.y,this.input.c_size/2,this.answer[0]); /*3*/
        this.bot  = new Bot(library,this.answer[0].length);
        console.log(this.bot.library);
        //background objects
        //
        this.bg = loadImage("assets/object/background.png");
        this.background = new Bg(2*width);/*5*/
        this.foreground = new Fence(int(random(10,15.5)),2*width);/*9*/
        this.moon = new Moon(this.attempt,this.period,this.delay); /*1*/
        this.surface = new Block(this.failure,2*width);/*8*/
        this.glitter = new Glitter(3,25,60,height/2);/*0*/
        console.log("Required items achieved");
        //key event allowance
        this.allow = true;
        //player info
        this.reward = 50*difficulty;
        this.degrade = 0.05;
        this.score = 0;
        this.original = 0;
        this.penalty = 1;
        //status
        this.status = 0;
        //time 
        this.time = frameCount;
        //translate
        this.bound  = 0;
        this.opponent.hint.push('Its meaning can be: \n\n' + this.answer[1]);
        this.moon.reset();
    }
    //interaction
    clicked(){
        if(!this.allow) return ;
        //click on suggestion 
        if(this.suggestion.clicked()){
            this.penalty = max(1-this.degrade*this.suggestion.graphic.length,this.penalty - this.degrade) ;
            this.score = this.original*this.penalty;
        } 
        //object interaction
        this.player.clicked(this.bound); 
        this.opponent.clicked(this.bound);
        //switch 
        if(mouseY >= this.input.y - this.input.c_size/2 && mouseY <= this.input.y + this.input.c_size/2){
            this.input.reset();
            this.input.active = !this.input.active;
            this.player.object.dialog.push("I am guessing a " + (this.input.active ? 'word':'letter'),true);
        }
    }
   
    
    //positioning
    update(status){
        if(status == false){
            this.opponent.distance += width/this.failure;
            this.opponent.object.dialog.push(random(this.fail),true);
            this.original -= this.bonus;
        }
        else {
            this.opponent.object.dialog.push('Yes, it has',true);
            this.original += this.bonus;
        }
    }
    //check
    check(){
        this.time = frameCount +  this.delay*30;
        this.moon.reset();
        if(this.input.active){
            let value = this.input.result();
                  this.player.object.dialog.push("It's " + value,true);
                  if(value != this.answer[0]){
                    this.surface.push('Fail');
                    this.input.reset();
                    this.update(false);
                  }
                  else{
                    this.opponent.object.dialog.push("Yes;Yes it is;Thank you",true);
                    this.opponent.object.speed = -this.opponent.object.speed;
                    this.opponent.distance = 3*width;
                  }
        }
        else {
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
                  
                   if(pos.length == 0){
                    this.surface.push(value);
                    this.update(false);
                   } 
                   else this.update(true);
                  this.guess.update(48);
                  this.bot.filter(value,pos);
        }
    }
    //keyPressed
    typed(){
        //if typing allowed
        if(this.allow){
        //input style
            //word input
            if(this.input.active){
                this.input.typed();
                if(keyCode == ENTER ){
                  this.check();
                }
              }
            //key input
              else{
                if((keyCode >= 65 && keyCode <= 90)|| keyCode === 189) this.guess.update(keyCode);
                else if(keyCode == 13){
                  this.check();
                }
              }
            
            
        }
    }
    //conclude game
    endgame(){
        //game ending 
        if(this.opponent.object.x == this.opponent.object.lim) this.status = -1;
        else if(this.opponent.object.x - this.player.object.x  <= 2) this.status = 1;
        //ensure game 
        if(this.quest.done){
                this.opponent.object.speed = -5;
                this.opponent.distance = 3*width;
        }
        //stop displaying 
        if(this.status != 0) this.hold = false;
    }
    //time management
    timeflag(){
        //bot guess
        if(frameCount/30 - this.moon.time_started >= 3*this.moon.period/4 && this.guess.assemble == 48 && !this.input.active && this.allow){
            let auto = this.bot.guess();
            this.guess.update(auto.charCodeAt(0));
        } 
        //
        if(frameCount/30 - this.moon.time_started >= this.moon.period){
            this.check();
        }
    }
    //displaying
    show(){
        background(this.bg);
        if(!this.hold) return ;
        if(frameCount < this.time || this.status != 0 || this.quest.done || this.surface.content.length == this.failure ){
            this.allow = false;
            push();
            blendMode(DODGE);
            textAlign(CENTER);
            fill(240,200,50);
            textSize(50);
            text("HOLD",width/2,height/3);
            pop();
        } 
        else this.allow = true;
        //bg
        
        //effect
        this.glitter.show(height/3,this.bound);
        //clock 
        this.moon.show(this);
        //update glitter
        this.glitter.speed  = 3 + 5*this.bound/width;
        this.glitter.density = min(this.glitter.limit,this.glitter.base + this.bound/50);
        //suggestion
        this.suggestion.show();
        //quest shot
        if(this.input.active)   this.input.show();  
        else{
            this.quest.show();  
            push();
            blendMode(MULTIPLY);
            this.guess.display();
            pop();
        }  
        //in relative position
        this.bound = max(0,this.opponent.object.x - width/2);
        if(keyIsDown(39) || keyIsDown(37)) this.bound = max(0,min(this.opponent.object.x - width/2,this.player.object.x - 10));
        push();
        translate(-this.bound,0);
        //back object
        this.background.show(this.score,this.bound);
        //character object
        this.player.show();
        this.opponent.show(this.player.object.x);
        //foreground objects
        this.surface.show(this.bound);
        this.foreground.show(this.bound);
        pop();
        this.original = max(0,this.original - this.degrade);
        this.score = int(this.original*this.penalty);
        //game auto edging
        this.endgame();
        this.timeflag();
    }
}
