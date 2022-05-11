
var a;
function setup(){
  let cnv = createCanvas(800,600);
  cnv.parent('sketchHolder');
  a = new Quest('ABC');
}
function draw(){
  background(220);
  a.show();
}