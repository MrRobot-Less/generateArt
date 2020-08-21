class Fish{

    constructor(x,y){
        this.position = createVector(x, y)
        this.velocity = createVector(random(3),random(3))
        this.acc = createVector()
        this.r = 2
        this.maxspeed = 2
        this.maxforce = 1
        this.prevPosition = this.position.copy()
    }

    updatePrev(){
        this.prevPosition = this.position.copy()
    }

    interaction(matrix){
     for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
       if(dist(this.position.x,this.position.y, x*scl,y*scl) < scl-this.r){
          this.applyForce(matrix[x][y].mult(scl))
       }
      } 
     } 
    }

    screen(){
        if(this.position.x > width){
            this.position.x = 10
            this.updatePrev()
        }
        if(this.position.y > height){
            this.position.y = 10
            this.updatePrev()
        }
        if(this.position.x < 0){
            this.position.x = width-10
            this.updatePrev()
        }
        if(this.position.y < 0){
            this.position.y = height-10
            this.updatePrev()
        }
    }

    applyForce(force){
        
        this.acc.add(force).limit(this.maxforce)
    }


    update(){
        this.velocity.add(this.acc)
        this.velocity.limit(this.maxspeed)
        this.position.add(this.velocity)
        this.acc.mult(0)
        this.updatePrev()
    }

    display(){
    
        this.theta = this.velocity.heading() + PI/2;

        stroke(0, 20)
        strokeWeight(0.9)
        point(this.position.x, this.position.y)
        /*
        noStroke();

        push();

        translate(this.position.x, this.position.y);
        rotate(this.theta);
        beginShape();
        vertex(0, -this.r*2);
        vertex(-this.r, this.r*2);
        vertex(this.r, this.r*2); 
        
        endShape(CLOSE);
        pop();
        */
    }
}