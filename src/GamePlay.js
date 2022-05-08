class Gameplay{
    constructor(name,difficulty,theme){
        thís.attempt = 18-difficulty*3;
        this.failure = 9-2*difficulty;
        this.delay = 8;
        this.lib = loadStrings("assets/context/content/" + difficulty + "/" + theme + '.txt');
        this.answer = split(radom(this.lib),';');
        this.database = [];
        this.char_size = width/this.answer[0].length;
        this.period = 60 - difficulty*15;
        for(let i=0;i<this.lib.length;i++){
            let temp = split(this.lib[i],";");
            if(temp[0].length == this.answer[0].length){
                    this.database.push(temp[0]);
            }
        }
        this.conv_font = loadFont("assets/font/MorrisRomanBlack.ttf");
        this.object_font = loadFont("assets/font/led_counter-7.ttf");
        this.scrore_font = loadFont("assets/font/score.ttf");
        this.player = new Player(this.conv_font,name);
        this.opponent = new Opponent(this.conv_font);
        this.surface = new Block(this.failure);
        this.quest = new Quest(width/2,height/4,this.answer[0],this.char_size/10,4*this.char_size/5,8,this.char_size/10);
        this.background = new Bg(this.scrore_font);
        this.foreground = new Fence(int(random(6,10.5)));
        this.clock = new Moon(this.attempt,this.period,this.answer);
        this.input = new Input(this.answer[0].length);
        this.suggestion = [];
        let index = 0;
        for(let i = 0;i< 5 - difficulty;i++){
            index = random(index,this.answer.length - 5 + difficulty +i);
            this.suggestion[i] = new Suggestion(this.answer[index],this.quest.pos_y,this.quest.pos_y + this.quest.width);
        }
        this.active = false;
        this.allow = true;
        //player info
        this.score = 0;
        this.penalty = 0;
        //game trimming
        this.translate = 0;
        //status
        this.status = 0;
    }
    clicked(){
        for(let i = 0;i<this.suggestion.length;i++) this.suggestion[i].clicked();
        this.player.clicked(); 
        this.opponent.clicked(this.answer[1]);
    }
    typed(){
        if(this.allow){

        }
    }
    show(){
        //blurable object first
        this.clock.show();
        this.quest.display();
        //interactive suggestion
        for(let i = 0;i<this.suggestion.length;i++) this.suggestion[i].show();
        //background
        this.background.show();
        //surface
        this.surface.show();
        //foreground
        this.foreground.show();
        //effect

    }
    
}
