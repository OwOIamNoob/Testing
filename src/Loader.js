class Loader{
    constructor(name,difficulty,theme){
        //path
        this.path = "assets/context/content/" + str(difficulty) + "/" + theme + ".txt";
        //game loading
        this.library = loadStrings(this.path);
        this.name = name;
    }
    reload(name,difficulty,theme){
        //path
        this.path = "assets/context/content/" + str(difficulty) + "/" + theme + ".txt";
        //game loading
        this.library = loadStrings(this.path);
        this.name = name;
    }
}