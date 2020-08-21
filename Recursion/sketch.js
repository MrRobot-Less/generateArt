function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  main()
}

function main(){
  conta(200,200,100)
}

function conta(x,y,r){
  if(r >= 1){
    stroke(0)
    fill(220)
    ellipse(x,y,r,r)
    conta(x+r,y,int(r*0.5))
    conta(x-r,y,int(r*0.5))
    //conta(x,y+r,int(r*0.5))
  }
}