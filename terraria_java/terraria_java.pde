int scl = 10;

int rows = 350/scl;
int cols = 1050/scl;

float yspeed = 0;

float[][] terraria = new float[cols][rows];

void setup(){
  size(800,400, P3D);
  stroke(255);
  
  noFill();
}

void draw(){
  yspeed -= 0.05;
  float yoff = yspeed;
  for(int y=0;y<rows;y++){
    float xoff=0;
    for(int x=0;x<cols;x++){
      terraria[x][y] = map(noise(xoff,yoff),0,1,-100,100);
      xoff+=0.1;
    }
    yoff+=0.1;
  }
  lights();
  background(0);
  translate(0,height/1.5,-100);
  rotateX(PI/3);
  translate(-cols, -rows/2);
  for(int y=0;y<rows-1;y++){
    beginShape(TRIANGLE_STRIP);
    for(int x=0;x<cols;x++){
      vertex(x*scl, y*scl, terraria[x][y]);
      vertex(x*scl, (y+1)*scl, terraria[x][y+1]);
    }
    endShape();
  } 
}
