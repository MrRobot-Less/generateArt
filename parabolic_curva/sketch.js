function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(51);
  main()
}

function main(){
  let x=200,y=200,pontos=10,a=PI*2/4,r=180, p = 6
  array_master=[]
  for(let i=0;i<p;i++){
    array=[]
    x1 = x + cos(a) * r
    y1 = y + sin(a) * r
    let dx = abs(x1-x)/pontos
    let dy = abs(y1-y)/pontos
    xx = x
    yy = y
    for(let j=0; j < pontos; j++){
      let tx=1,ty=1
      if(x1<= 250){
        tx=-1
      }
      if(y1 <= 250){
        ty=-1
      }
      //console.log(tx + " " + ty)
      xx += dx * tx
      yy += dy * ty
      array.push([xx,yy])
      ellipse(xx,yy,10,10)
    }
   a += TWO_PI/p
  
  line(x,y,xx,yy)
  array_master.push(array)
  }
  for(let j=0; j<p-1;j++){
    for(let i=0; i<pontos; i++){
      line(array_master[j][i][0],array_master[j][i][1],array_master[j+1][abs(i+1-pontos)][0],array_master[j+1][abs(i+1-pontos)][1])
    }
  }
  for(let i=0;i < pontos; i++){  
      line(array_master[p-1][i][0],array_master[p-1][i][1],array_master[0][abs(i+1-pontos)][0],array_master[0][abs(i+1-pontos)][1])
  }
}