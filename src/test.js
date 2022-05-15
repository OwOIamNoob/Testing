let bg;
let score;
let a;
function preload(){
    score = loadTable('assets/context/score/scoreboard.csv','header');
    bg = loadImage('assets/object/background.png');
}
function setup(){
    cnv = createCanvas(800,600);
    cnv.parent("sketchHolder");
    a = new Scoreboard(score,bg);
}
function draw(){
    a
}