var cols, rows;
var scl = 10;
var w = 600;
var h = 600;

var flying = 0;

var terrain = [];
p5.disableFriendlyErrors = true;
let cam;
function setup() {
  createCanvas(400, 400, WEBGL);
  cols = w / scl;
  rows = h / scl;

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0;
    }
  }
  cam = createCamera();
}

function draw() {

  flying -= 0.05;
  let yoff = flying;
  for (var y = 0; y < rows; y++) {
    let xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -200, 200);
      xoff += 0.05;
    }
    yoff += 0.05;
  }
  if (mouseX < width && mouseY < height) {
    let x = map(mouseX, 0, width, -90, 90)
    let y = map(mouseY, 0, height, -100, 100)
    cam.lookAt(x,y,0);
  }

  //ambientLight(2);
  background(255);
  
  translate(0, 50);
  rotateX(PI/3)
  
  noStroke();  
  stroke(0,255)
  lights()
  //fill(0)
  translate(-w / 2, -h / 2);
  for (var y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);  
    for (var x = 0; x < cols; x++) {
      
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
      
    }
    endShape();  
    
  }
}