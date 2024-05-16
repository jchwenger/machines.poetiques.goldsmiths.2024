let angle = 0;
let textures = [];

function setup() {
  createCanvas(400, 400, WEBGL);
  // Initialize textures array
  for (let i = 0; i < 6; i++) {
    textures.push(createGraphics(200, 200));
  }
}

function draw() {
  background(50);
  rotateX(angle);
  rotateY(angle * 0.4);
  rotateZ(angle * 0.1);

  // Update and draw each face of the cube with different animated textures
  for (let i = 0; i < 6; i++) {
    updateTexture(textures[i], i);
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

  angle += 0.01;
}

function updateTexture(gfx, index) {
  gfx.background(100 + index * 25); // Animated background shade
  gfx.fill(255);
  gfx.textAlign(CENTER, CENTER);
  gfx.textSize(32);
  // Add dynamic content to the texture, e.g., a rotating text
  gfx.text('Face ' + (index + 1), 100 + 50 * sin(angle), 100 + 50 * cos(angle));
}
