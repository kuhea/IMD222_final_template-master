let sun;
let planets = [];
let G = 100;
let numPlanets = 5;
let destabilise = 0.2;

function setup() {
  //여기부터
  let boundingRects = document
    .getElementById("p5Canvas")
    .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  console.log(1);
  console.log(
    document.getElementById("p5Canvas").getBoundingClientRect().width
  );
  console.log(
    document.getElementById("p5Canvas").getBoundingClientRect().height
  );
  canvas.parent("p5Canvas");
  //여기까지
  // createCanvas(700, 700);
  sun = new Body(100, createVector(0, 0), createVector(0, 0));

  for (let i = 0; i < numPlanets; i++) {
    //planet position
    let r = random(sun.r, min(windowWidth / 2, windowHeight / 2));
    let theta = random(TWO_PI);
    let planetPos = createVector(r * cos(theta), r * sin(theta));

    //planet velocity
    let planetVel = planetPos.copy();
    planetVel.rotate(HALF_PI);
    planetVel.setMag(sqrt((G * sun.mass) / planetPos.mag()));
    planetVel.mult(random(1 - destabilise, 1 + destabilise));
    planets.push(new Body(random(5, 30), planetPos, planetVel));
  }
}

function draw() {
  translate(width / 2, height / 2);
  background(180);
  for (let i = 0; i < planets.length; i++) {
    sun.attract(planets[i]);
    planets[i].update();
    planets[i].show();
  }
  sun.show();
}

function Body(_mass, _pos, _vel) {
  this.mass = _mass;
  this.pos = _pos;
  this.vel = _vel;
  this.r = this.mass;
  this.path = [];

  this.show = function () {
    noStroke();
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
  };

  this.update = function () {
    //update the position
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  };

  this.applyForce = function (f) {
    this.vel.x += f.x / this.mass; //f = ma => a = f/m
    this.vel.y += f.y / this.mass;
  };

  this.attract = function (child) {
    let r = dist(this.pos.x, this.pos.y, child.pos.x, child.pos.y);
    let f = this.pos.copy().sub(child.pos);
    f.setMag((G * this.mass * child.mass) / (r * r));
    child.applyForce(f);
  };
}
