class DNA:
    def __init__(self):
        self.dna = [1,-2, 100,6]
        #self.dna = [random(-1,1),random(-1,1),random(1,100), random(1,100) ]
        self.score = 0

class Genetic:

    def __init__(self):
        
        self.len_population = 2

        self.len_dad = 1
        self.population = self.Population()
        self.best_population = self.population

    def Individual(self):
        return DNA()


    def Population(self):
        return [self.Individual() for i in range(self.len_population)]

    
    def Selection(self):
        
        punctuations = [(i.score, i) for i in self.best_population]
        score = [punctuation[0] for punctuation in sorted(punctuations)]
        print(score[-3:])
        
        punctuations = [punctuation[1] for punctuation in sorted(punctuations)]
                
        selected = punctuations[(self.len_population - self.len_dad):]
        for punctuations_list in punctuations:                
            punctuations_list = selected[0]
        
        population = self.Mutation(punctuations)
        return population

    def Mutation(self,populations, learning_mutation=0.15):
        for population in populations:
            for i in range(2):
                if(random(1) < learning_mutation):
                    points = int(random(i,i+1))
                    if(i == 1):
                        population.dna[points] = random(-1,1)
                    else:
                        population.dna[points] = random(-10,10)
                
        return populations
  
    def ResetScore(self):
        for i in self.best_population:
            i.score = 0


    def update(self):
        population = self.Selection()
        self.best_population = population        
        self.ResetScore()
        
class Vehicle:
  
  def __init__(self, x, y, dna):
    self.dna = dna
    self.heath = 1
    self.acceleration = PVector(0, 0);
    self.velocity = PVector(random(8), random(8));
    self.position = PVector(x, y);
    self.r = 3.0;
    self.maxspeed = 8;
    self.maxforce = 0.8;
    
  
  def update(self):
        
    self.velocity.add(self.acceleration);
    self.velocity.limit(self.maxspeed);
    self.position.add(self.velocity);
    self.acceleration.mult(0);
    self.heath-=0.002
  
  
  def applyForce(self,force): 
    force = force.limit(self.maxforce);
    self.acceleration.add(force)
  
  
  def eat(self,target, classification):
    id =int(not (classification == "good"))

    nutrition = [0.25, -0.4]
    record = 1000
    for t in target:
    
      
      index = -1
      d = PVector.dist(t, self.position)
      if(d < record and d < self.dna.dna[(id+2)]):
        force = self.seek(t)
        force.mult(self.dna.dna[id])

        self.applyForce(force)  
        index = target.index(t)
        record = d
        
      if(record < 5 and index > -1):
        target.pop(index)
        if(id == 0):
            self.dna.score+=1
        else:
            self.dna.score-=1
        self.heath+=nutrition[id]
      
  def dead(self):
      return (self.heath < 0)
  
  
  def seek(self,target): 
    desired = PVector.sub(target, self.position);
    desired.normalize();
    desired.mult(self.maxspeed);
    
    steek = PVector.sub(desired, self.velocity);

    return steek
  
  
  def display(self):
    
    self.theta = self.velocity.heading() + PI/2;
    rd = color(0,255,0)
    gr = color(255,0,0)
    cor = lerpColor(gr, rd, self.heath)
    fill(cor);
    stroke(0);
    push();
    translate(self.position.x, self.position.y);
    rotate(self.theta);
    beginShape();
    vertex(0, -self.r*2);
    vertex(-self.r, self.r*2);
    vertex(self.r, self.r*2); 
    endShape(CLOSE);
    pop();
    
  def boundaries(self):
    d = 5;
    desired = None;

    if (self.position.x < d):
      desired = PVector(self.maxspeed, self.velocity.y);
    elif (self.position.x > width - d):
      desired = PVector(-self.maxspeed, self.velocity.y)
    

    if (self.position.y < d):
      desired = PVector(self.velocity.x, self.maxspeed);
    elif (self.position.y > height - d):
      desired = PVector(self.velocity.x, -self.maxspeed);
    

    if (desired):
      desired.normalize();
      desired.mult(self.maxspeed);
      steer = PVector.sub(desired, self.velocity);
      
      self.applyForce(steer);
    


vehicles = []; 
good = [];
bad = [];

genetic = Genetic()
pressed = False
def setup():
  size(400,400);
  for i in range(genetic.len_population):
    dna = genetic.best_population[i]
    vehicles.append(Vehicle(random(width), random(height), dna))
  
  for i in range(20):
    good.append(PVector(random(width), random(height)))
       
  for i in range(0):
    
    bad.append(PVector(random(width), random(height)))

def draw():
  background(0);
  
  if(random(0,1) < 0.02):
      good.append(PVector(random(width), random(height)))

  for t in good:
    fill(0,255,0)
    circle(t.x, t.y, 5);
    
  for target in bad:
    fill(255,0,0)
    circle(target.x, target.y, 5);

  if(len(vehicles) == 0):
      genetic.update()
      for i in range(genetic.len_population):
        dna = genetic.best_population[i]
        vehicles.append(Vehicle(random(width), random(height), dna))

  for vehicle in vehicles:
    if(vehicle.dead()):
        vehicles.pop(vehicles.index(vehicle))

    vehicle.update();
    vehicle.boundaries()
    vehicle.eat(good, "good");
    vehicle.eat(bad, "bad");
    
    
    vehicle.display();


def mousePressed():
    global pressed
    pressed = not pressed

def mouseMoved(): 
  
  if(pressed and dist(mouseX, mouseY,pmouseX, pmouseY) > 0.75):
      bad.append(PVector(mouseX, mouseY))
