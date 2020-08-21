function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  //main()
}

function main(){
  let x=200,y=200,i=0,c=0
  let n=6, d=71
  array=[]
  
  while(i < TWO_PI){
    let k = i * d
    let r = 180 * cos(k*n)
    let x1 = x + cos(k) * r
    let y1 = y + sin(k) * r
    ellipse(x1,y1,5,5)
    array.push([x1,y1])
    i+=TWO_PI/360
    c+=1
  }
  for(let i=0;i<c-1;i++){
    fill(color(255,i*c%255,i*c%255))
    line(array[i][0], array[i][1],array[i+1][0], array[i+1][1])
  }
}