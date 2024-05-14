let angle = 0;
let textures = [];

function preload() {
  // Create graphics for each face of the cube
  for (let i = 0; i < 6; i++) {
    let gfx = createGraphics(200, 200);
    gfx.background(100 + i * 25); // Different shades for each face
    gfx.fill(255);
    gfx.textAlign(CENTER, CENTER);
    gfx.textSize(32);
    gfx.text('Face ' + (i + 1), 100, 100);
    textures.push(gfx);
  }
}

function setup() {
  createCanvas(400, 400, WEBGL);
}

function draw() {
  background(50);
  rotateX(angle);
  rotateY(angle * 0.4);
  rotateZ(angle * 0.1);

  // Draw each face of the cube with different textures
  beginShape();
  for (let i = 0; i < 6; i++) {
    push();
    if (i === 0) {
      translate(0, 0, 100); // front face
    } else if (i === 1) {
      translate(0, 0, -100); // back face
      rotateY(PI);
    } else if (i === 2) {
      translate(100, 0, 0); // right face
      rotateY(HALF_PI);
    } else if (i === 3) {
      translate(-100, 0, 0); // left face
      rotateY(-HALF_PI);
    } else if (i === 4) {
      translate(0, 100, 0); // top face
      rotateX(-HALF_PI);
    } else if (i === 5) {
      translate(0, -100, 0); // bottom face
      rotateX(HALF_PI);
    }
    texture(textures[i]);
    plane(200);
    pop();
  }
  endShape(CLOSE);

  angle += 0.01;
}
