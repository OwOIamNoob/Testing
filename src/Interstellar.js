class Stellar{
    constructor(divisor,bound,bound_size,preset){
        this.size = divisor;
        this.preset = preset;
        this.graphic = [];
        this.region = width/divisor;
        for(let i = 0;i<this.size;i++){
            let value = this.preset.charCodeAt(random(0,this.preset.length + 0.5));
            let x = int(this.region*i + random(this.region/4,3*this.region/4));
            let radius = int(random(this.region/6,this.region/2));
            let y = int(random(height/6,height/2));
            while(abs(y - bound) < bound_size + radius/3) y = int(random(height/6,height/2));
            this.graphic[i] = new Suggestion(value,x,y,radius);
        }
        console.log(this.graphic.length + " suggestions assigned");
    }
    show(){
        for(let i = 0;i<this.size;i++) this.graphic[i].show();
    }
    clicked(){
        let touched = false;
        for(let i = 0;i<this.size;i++) touched = touched + this.graphic[i].clicked();

        return touched;
    }
}