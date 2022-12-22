// function setup() {
//   let boundingRects = document
//     .getElementById("p5Canvas")
//     .getBoundingClientRect();
//   let canvas = createCanvas(boundingRects.width, boundingRects.height);
//   canvas.parent("p5Canvas");
// }

// let howManyX = 20;
// let howManyY = 20;
// let seedNum = 0;
// let noiseMult = 0.003;

// function mousePressed() {
//   seedNum = random(5);
// }

// function draw() {
//   // randomSeed(seedNum);
//   noiseMult = map(mouseX, 0, width, 0, 0.1);
//   noiseSeed(seedNum);
//   noStroke();
//   fill(255);
//   rect(0, 0, width, height);
//   let tileWidth = width / (howManyX + 1);
//   let tileHeight = height / (howManyY + 1);
//   for (let tileCntX = 0; tileCntX < howManyX; tileCntX++) {
//     for (let tileCntY = 0; tileCntY < howManyY; tileCntY++) {
//       let tileCenterX = tileWidth * (tileCntX + 1);
//       let tileCenterY = tileHeight * (tileCntY + 1);
//       // let randAngle = random(0, radians(360));
//       let noiseAngle =
//         radians(360) * noise(tileCntX * noiseMult, tileCntY * noiseMult);
//       push();
//       translate(tileCenterX, tileCenterY);
//       // rotate(randAngle);
//       rotate(noiseAngle);
//       noFill();
//       stroke(0);
//       strokeWeight(10);
//       line(0 - tileWidth * 0.5 + 5, 0, 0 + tileWidth * 0.5 - 5, 0);
//       // fill(255, 0, 0);
//       // noStroke();
//       // circle(0 + tileWidth * 0.5 - 5, 0, 10);
//       pop();
//     }
//   }
// }

const numStars = 500;
let stars = [];

function setup() {
  let boundingRects = document
    .getElementById("p5Canvas")
    .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  canvas.parent("p5Canvas");
  // createCanvas(600, 600);
  stroke(255);
  strokeWeight(2);

  for (i = 0; i < numStars; i++) {
    stars.push(new Star(random(width), random(height)));
  }
}

function draw() {
  background(0, 50);

  const acc = map(mouseX, 0, width, 0.005, 0.2);

  stars = stars.filter((star) => {
    star.draw();
    star.update(acc);
    return star.isActive();
  });

  while (stars.length < numStars) {
    stars.push(new Star(random(width), random(height)));
  }
}

class Star {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.prevPos = createVector(x, y);

    this.vel = createVector(0, 0);

    this.ang = atan2(y - height / 2, x - width / 2);
  }

  isActive() {
    return onScreen(this.prevPos.x, this.prevPos.y);
  }

  update(acc) {
    this.vel.x += cos(this.ang) * acc;
    this.vel.y += sin(this.ang) * acc;

    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;

    this.pos.x = this.vel.x;
    this.pos.y = this.vel.y;
    //여기에 +=로 안해서 그런거였어!!!
  }

  draw() {
    const alpha = map(this.vel.mag(), 0, 3, 0, 255);
    stroke(255, alpha);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
  }
}

function onScreen(x, y) {
  return x >= 0 && x <= width && y >= 0 && y <= height;
}
