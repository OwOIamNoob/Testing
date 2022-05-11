class Menu{
    constructor(){
        //background
        this.order = 0;
        this.screen = new Background(100,2,2,0);
        this.title  = new Word(width/2,height/5,'EMOTION','HANGMAN',10,80,15,8,color(190,20,20));
        this.API = loadImage("assets/asset/start/text.png");
        this.icon = loadImage("assets/asset/icon/start.png");
        //buffer
        this.design = createGraphics(width,height);
        //player name
        this.name = createInput('');
        this.name.parent('sketchHolder');
        //characteristics
        this.name.position(width/3,height/3);
        this.name.size(width/3);
        this.name.style('background','none');
        this.name.style('color','#ff0000');
        this.name.style('font-size','50px');
        //level
        this.level = createSlider(1,3);
        this.level.parent('sketchHolder');
        this.level.position(width/3,height/2);
        this.level.addClass('mySlider');
        this.level.style('width','300px');
        //categories
        this.categories = createSelect();
        this.categories.parent('sketchHolder');
        //characteristics
        this.categories.style('font-size','50px');
        this.categories.position(width/3,height*2/3 - 40);
        this.categories.size(width/3);
        this.categories.option('sport');
        this.categories.option('mental');
        this.categories.option('ocean');
        this.categories.style('background','none');
        this.categories.style('broder-radius', '0px');
        this.categories.style('color','red');
        this.categories.style('width','300px');
        //Botplay
        this.target = createInput('');
        this.target.parent('sketchHolder');
        //characteristics
        this.target.position(width/3,height*5/6);
        this.target.size(width/2);
        this.target.style('background','none')
        this.target.style('color','#ff0000');
        this.target.style('font-size','50px');
        //onscreen
    }
    show() { 
        
        this.screen.show();
        this.title.display();
        push();
        image(this.API,0,0,width,height);
        if(mouseX >= 4*width/5 && mouseX <= 4*width/5+120 && mouseY >= height/2 && mouseY <= height/2+120) tint(255,0,0);
        image(this.icon,4*width/5,height/2);
        pop();
    }    
    saving(name,level,theme){
        name = str(this.name.value());
        level =int(this.level.value());
        theme = str(this.categories.value());
        this.name.hide();
        this.level.hide();
        this.categories.hide();
        this.target.hide();
    }
    reset(){

        this.name.value('');
        this.level.value(1);
        this.target.value('');
        this.screen.reset(true);
    }
     
    clicked() {
        if(mouseX >= 4*width/5 && mouseX <= 4*width/5+120 && mouseY >= height/2 && mouseY <= height/2+120) this.reset();
    }
    
}