
let matrix = [];
let fishs = [];

let scl = 20;

let cols = 410/scl
let rows = 310/scl

let zoff= 0;

let check;

function setup() {
  createCanvas(400, 300);
  check = createCheckbox()
  //noiseSeed(10);
  yoff = 0;
  for (let i = 0; i < 300; i++) {
    fishs.push(new Fish(random(width), random(height)))
    
  }
  background(255);  
  for (let x = 0; x < cols; x++) {
    
    matrix[x] = []
    for (let y = 0; y < rows; y++) {
      matrix[x][y] = 0
    } 
  } 
  
  //check.checked(true);
}

function draw() {
  //
  let yoff = 0
  for (let x = 0; x < cols; x++) {
    let xoff = 0;  
    for (let y = 0; y < rows; y++) {
      stroke(255)   
      
      theta = map(noise(xoff, yoff, zoff), 0,1,0,TWO_PI)

      matrix[x][y] = createVector(cos(theta),sin(theta)).normalize()
      xoff += 0.1;
      
    } 
    
    yoff += 0.1
  } 
  zoff+=0.01
  
  for(let fish of fishs){
    fish.update()
    fish.interaction(matrix)
    fish.screen()
    fish.display()
  }

}

