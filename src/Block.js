class Block{
    constructor(divisor,limit){
        this.content = [];
        this.height = height/6;
        this.width = limit/divisor;
        this.size = divisor;
        this.object = loadImage("assets/object/block.png");
        this.end = loadImage("assets/object/endblock.png");
        this.Font = loadFont("assets/font/led_counter-7.ttf");
        console.log("Block assigned");
    }
    push(content){
        if(this.content.length < this.size)
        this.content.push(content);

    }
    show(x){
        push();
        textFont(this.Font);
        textAlign(CENTER);
        fill(191,37,13);
        textSize(this.height/2);
        strokeWeight(height/120);
        stroke(33,61,46);
        for(let i = int((x-10)/this.width) ;i < min(this.size+1,(x+width)/this.width);i++){
            if(i >= this.size) image(this.end,i*this.width,height - this.height*8/5,this.width*8/5,this.height*8/5);
            else{
                image(this.object,i*this.width,5*height/6,this.width,this.height);
                if(this.content[i]) text(this.content[i],i*this.width + this.width/2,23*height/24); 
            }
            
        }
        pop();
    }
}