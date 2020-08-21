function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(51);
  teste();
}

function teste() {
  let x = 200,y = 200, a = 0
  let pontos=100, r= 150, k=2
  
  array=[]
  for(var i=0;i<pontos;i++){
    x1 = x + cos(a) * r
    y1 = y + sin(a) * r
    let c = color(255,255,255)
    fill(c)
    ellipse(x1,y1,10,10)
    array.push([x1,y1])
    a += TWO_PI/pontos
  }
  for(var j=0;j<pontos;j++){
    id = j * k
    while(id>=pontos){
      id -= pontos
    }
    fill(color(255,255,255))
    line(array[j][0], array[j][1], array[id][0], array[id][1])
  }
}