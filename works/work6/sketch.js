// //original source https://twitter.com/hisadan/status/1427990445741670402?s=20
// n = 1999;
// i = 0;
// a = [];
// r = 0;
// function setup() {
//   let boundingRects = document
//     .getElementById("p5Canvas")
//     .getBoundingClientRect();
//   let canvas = createCanvas(boundingRects.width, boundingRects.height, WEBGL);
//   canvas.parent("p5Canvas");
//   // createCanvas(600, 600, WEBGL);
//   for (i = 0; i < n * 2; i++) {
//     a[i] = random(660) - 330;
//   }
// }
// function draw() {
//   background(0);
//   stroke(255);
//   for (i = 0; i < n * 2 - 1; i++) {
//     push();
//     translate(a[i], a[i + 1], 50 * sin(mag(a[i], a[i + 1]) / 30 - r));
//     point(0, 0);
//     pop();
//   }
//   r += 0.1;
// }

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

  /*ライトの設定。マウスの位置で光の方向が変化*/
  const locY = (mouseY / height - 0.5) * -2;
  const locX = (mouseX / width - 0.5) * 2;

  ambientLight(100, 80, 80);
  pointLight(200, 200, 200, locX, locY, 0);

  /*Yを少しずつ回転。*/
  rotateY(frameCount * 0.0001);
  //ドラック対応
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
      /*プリミティブの作成*/
      sphere(2, 10, 100);
      pop();
    }
    pop();
  }
}
