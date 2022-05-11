class Bot{
    //initial 
    constructor(path,size){
        //database

        this.library = loadStrings(path);
        for(let i = 0; i < this.library.length;i++){
            if(this.library[i].length != size){ 
                this.library.splice(i,1);
                i--;
            }
        } 
        this.guessed = [];
        this.pronoun = ['A','E','I','O','U'];
    }
    //filtering
    filter(value,pos){
        if(pos.length == 0){
            for(let i=0;i<this.library.length;i++){
                //searching in streams
                for(let j = 0;j<this.library[i].length;j++){ 
                //filter out
                    if(this.library[i][j] == value){
                        this.library.splice(i,1);
                        i--;
                        break;
                    }
                }
            }
        }
        //if guess is right
        else {
            for(let i =0;i<this.library.length;i++){
                 for(let j=0;j<pos.length;j++){
                    if(this.library[i][pos[j]] != value){
                        this.library.splice(i,1);
                        i--;
                         break;
                    }
                 }
            }
        }
    }
    //guess 
    guess(){
        let decision;
        //blind guess
        if(this.library.length  == 0 )
            return String.fromCharCode(int(random(65,90.5)));
        //guess
        if(this.guessed.length == 0) return random(this.pronoun);
        
        return random(random(this.library));
        
    }
}