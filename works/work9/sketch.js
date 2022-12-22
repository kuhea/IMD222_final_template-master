let w = innerWidth;
let h = innerHeight;
let num = 20;

function setup() {
  let boundingRects = document
    .getElementById("p5Canvas")
    .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  canvas.parent("p5Canvas");
  v = h;
  //   createCanvas(w, h);
  background(0);
  vec1 = createVector(0, 2);
}

function draw() {
  background(0);
  let t = frameCount / num + 100 * PI;
  t += cos(t) / 2;
  let R = v / 5;
  noStroke();
  for (let i = 0; i < num; i++) {
    let a = (i / num) * PI * (sin(t) + 1) + t;
    let x = h / 2.5 - R * sin(a);

    colorMode(HSB, 2 * PI, 100, 100);
    fill(a - t, 50, 100);
    ellipse(x + 50 * sin(t / 100), x + 10 * sin(t), v / 50, v / 50);
    rotate((PI / 200) * sin(frameCount / 50));
  }
}
