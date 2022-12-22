function setup() {
  let boundingRects = document
    .getElementById("p5Canvas")
    .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  canvas.parent("p5Canvas");
  // createCanvas(700, 700);
}

function draw() {
  background(0);
  //삼각별
  push();
  translate(width * 0.15, height * 0.5);
  rotate(frameCount / 200.0);
  star(0, 0, 5, 70, 3);
  pop();
  //많은별
  push();
  translate(width * 0.5, height * 0.5);
  rotate(frameCount / 50.0);
  star(0, 0, 80, 100, 40);
  pop();
  //별
  push();
  translate(width * 0.85, height * 0.5);
  rotate(frameCount / -100.0);
  star(0, 0, 30, 70, 5);
  pop();

  push();
  translate(width * 0.85, height * 0.8);
  rotate(frameCount / -1000.0);
  star(0, 0, 20, 30, 5);
  pop();

  push();
  translate(width * 0.5, height * 0.9);
  rotate(frameCount / 1000.0);
  star(0, 0, 20, 50, 5);
  pop();

  push();
  translate(width * 0.15, height * 0.75);
  rotate(frameCount / 1000.0);
  star(0, 0, 30, 50, 5);
  pop();

  push();
  translate(width * 0.25, height * 0.25);
  rotate(frameCount / 1000.0);
  star(0, 0, 10, 30, 5);
  pop();

  push();
  translate(width * 0.7, height * 0.2);
  rotate(frameCount / 1000.0);
  star(0, 0, 30, 50, 5);
  pop();
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
