class Orbit:
    def __init__(self):
        self.pos = PVector(random(width),random(height-300))
        self.vel = PVector(0,0)
        self.acc = PVector(0,0)
        self.r = 5
        
    def select_queen(self, queen):
        self.queen = queen
        

    def collision(self, mouse):

        if(PVector.dist(self.pos, mouse.mouse) < self.r+mouse.r):
            self.acc.add(mouse.acc).mult(1).limit(5)
                        
    def update(self):
        self.vel.add(self.acc).limit(5)
        self.pos.add(self.vel)
        self.acc.mult(0)
        if(self.pos.x > width or self.pos.x < 0 or self.pos.y > height or self.pos.y < 0):
            self.vel.mult(-1)

        
    def show(self):
        noStroke()
        fill(255)
        ellipse(self.pos.x,self.pos.y,self.r,self.r)

class Mouse:
    def __init__(self):
        self.vel = PVector(0,0)
        self.acc = PVector(0,0)
        self.r = 5
    def applyForce(self):
        self.mouse = PVector(mouseX,mouseY)
        self.pmouse = PVector(pmouseX,pmouseY)
        self.acc = PVector.sub(self.mouse, self.pmouse)

        
    def update(self):
        self.vel.add(self.acc)
        self.acc.mult(0)
        self.applyForce()
         
    def show(self):
        ellipse(mouseX,mouseY, self.r*2,self.r*2)
         
array=[]
num = random(99)
mouse = Mouse()
def setup():
    global num
    size(400,400)
    num = random(99)
    for i in range(50):
        array.append(Orbit())

def draw():
    global num, mouse
    num = int(num)
    background(0)
    fill(color(255,0,0))
    
    mouse.update()
    mouse.show()
    for orbit in array:
        orbit.update()
        orbit.collision(mouse)
        orbit.show()
    if(mousePressed):
        num = random(99)
