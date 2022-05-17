class Scoreboard{
    constructor(bg){
        this.table = [];
        this.bound = 1;
        this.his = 0;
        this.active = false;
        this.buffer = createGraphics(width/2,height/2);
        this.buffer.textSize(height/30);
        this.buffer.textAlign(CENTER);
        this.buffer.fill(255);
        this.wide = height/10;
        this.speed = 3;
        this.bg = bg;
    }
    //add player
    add(name,theme,mode,score,g_time,status){
        this.table[this.table.length]=new Data(name,theme,mode,score,g_time,status,(this.table.length + 1/2)*this.wide);
        console.log(this.table[this.table.length -1].name + " "
        + this.table[this.table.length -1].theme + " "
        + this.table[this.table.length -1].score + " "
        + this.table[this.table.length -1].g_time + " ")
        console.log("Data updated");
    }
    draw(){
        this.buffer.clear();
        this.buffer.background(this.bg);
        this.buffer.push();
        this.buffer.translate(0,-this.bound);
        for(let i = (this.table.length <= 5 ? 0:max(0,int(this.bound/this.wide - 1/2)));i < min(this.table.length,this.bound/this.wide + 5);i++)
        {
            this.table[i].draw(this.buffer);
        }
        this.buffer.pop();
    }
    show(){
        if(this.his != this.bound ){
            this.draw();
            this.his = this.bound;
        } 

        image(this.buffer,width/4,2*height/5);
    }
    scrolled(dis){
        this.bound = max(0,min((this.table.length-5)*this.wide,this.bound + dis));
    }
}