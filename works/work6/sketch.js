function setup() {
  let boundingRects = document
    .getElementById("p5Canvas")
    .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height, WEBGL);
  canvas.parent("p5Canvas");
  // createCanvas(windowWidth, windowHeight, WEBGL);
  rectMode(CENTER);
}

function draw() {
  background(33, 33, 33);

  const locY = (mouseY / height - 1) * -9;
  const locX = (mouseX / width - 1) * 9;

  ambientLight(100, 80, 80);
  pointLight(200, 200, 200, locX, locY, 0);

  rotateY(frameCount * 0.0001);
  orbitControl();

  for (let j = 0; j < 10; j++) {
    push();
    for (let i = 0; i < 100; i++) {
      translate(
        sin(frameCount * 0.001 + j) * 200,
        sin(frameCount * 0.001 + j) * 300,
        i * 0.1
      );
      rotateZ(frameCount * 0.002);
      push();

      sphere(2, 10, 100);
      pop();
    }
    pop();
  }
}
