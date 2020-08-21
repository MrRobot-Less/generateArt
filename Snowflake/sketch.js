snow = []
pos = []

function setup() {
  createCanvas(500,500);
  snow.push(new Snowflake(height/2, 0))
  //snow.push(new Snowflake())
}

function draw() {
  background(0);
  translate(width / 2, height / 2)
  rotate(-PI/2)
  for (let flake of snow) {
    while (!flake.finish() && !flake.end()) {
      flake.update()
    }
  }
  a = 0
  for(let i=0;i<6;i++){
    push()
    //scale(1, -1);
    rotate(a)
    scale(1, -1);
    for (let s of snow) {
      
      s.show()
      
    }
    a += TWO_PI / 6
    pop()
    
    
    push()
    
    rotate(-a)
    
    for (let s of snow) {
      s.show() 
    }
    pop()
    
  }
  
}