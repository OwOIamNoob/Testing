class Bot{
    //initial 
    constructor(library,size){
        //database
        this.library = [];
        for(let i = 0; i < library.length;i++){
            let temp = splitTokens(library[i],';');
            if(temp[0].length == size){ 
                this.library.push(temp[0]);
            }
        } 

        this.guessed = [];
        this.pronoun = ['A','E','I','O','U'];
        console.log("Bot assigned");
        console.log(this.library);
    }
    //filtering
    filter(value,pos){
        this.guessed.push(value);
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
        console.log("Database filtered");
        console.log(this.library);
    }
    //guess 
    included(value){
        for(let i = 0;i<this.guessed.length;i++){
            if(value == this.guessed[i]) return true;
        }
        return false;
    }
    guess(){
        //return char,string
        //pickout string
        let choice = random(this.library);
        if(choice.length == 0) choice =String.fromCharCode(random(65,90.5));
        if(this.guessed.length == 0) return random(this.pronoun);
            for(let i = 0;i<choice.length;i++){
                if(!this.included(choice[i])) return choice[i];
            }
        return choice[0];
    }
}