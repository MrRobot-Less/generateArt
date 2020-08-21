array = [[0,0]]

class Snowflake{
  constructor(){ //em python: def __init__()
    this.positionx = (width-width/10)/2
    this.x = this.positionx
    this.y = 0
    this.r = 3
  }
  
  finish(){
    for(let i=0;i<array.length;i++){
      let d = dist(array[i][0], array[i][1], this.x,this.y)
      if(d < this.r){
        array.push([this.x,this.y])
        
        this.x = this.positionx
        this.y = 0
        
        return true
      }
    }
    return false
  }
  
  end(){
    if(this.x <= 0){
      array.push([this.x,this.y])
        
      this.x = this.positionx
      this.y = 0
        
      return true
    }
  
  }
  
  update(){
    
    this.x -= 1
    this.y += random(-2,2)
    let pos = createVector(this.x,this.y)
    
    let angle = pos.heading()//captura o angulo
    let mags = pos.mag()
    
    angle = constrain(angle, 0, PI/6)//transforma o angulo em um numere entre 0 a PI/6, pois o angulo NÃO pode passa de 30 grasu radianos
    
    pos = p5.Vector.fromAngle(angle)
    pos.setMag(mags)
    
    this.x = pos.x
    this.y = pos.y
  }
  
  show(){
    fill(color(0,0,145))
    stroke(255)
    ellipse(this.x,this.y,this.r,this.r)
    for(let [x,y] of array){
      ellipse(x,y,this.r,this.r)
    }
  }
  
}