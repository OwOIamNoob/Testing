class Data{
    constructor(name,theme,mode,score,g_time,status,y){
        this.name = name;
        this.theme = theme;
        this.score = score;
        this.g_time = str(int(g_time/60)) + ":" + str(int(g_time%60));
        this.r = (0.5 - status/2)*255;
        this.g = (0.5 + mode)*60;
        this.y = y;
    }
    draw(buffer){
        buffer.fill(255);
        buffer.text(this.name,0,this.y,buffer.width/4,buffer.height/5);
        buffer.fill(this.g,this.g,255-this.g);
        buffer.text(this.theme,buffer.width/4,this.y,buffer.width/4,buffer.height/5);
        buffer.text(this.score,buffer.width/2,this.y,buffer.width/4,buffer.height/5);
        buffer.fill(255,255-this.r,255-this.r);
        buffer.text(this.g_time,3*buffer.width/4,this.y,buffer.width/4,buffer.height/5);
    }
}