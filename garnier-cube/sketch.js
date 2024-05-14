// let angle = 0;
let angleX = 0;
let angleY = 0;
let angleZ = 0;
let textures = [];

let lastMouseX = 0;
let lastMouseY = 0;
let rotationSpeed = 0.01;

function preload() {

  // Create graphics for each face of the cube
  for (let i = 0; i < 6; i++) {
    switch(i) {
      case 0:
        textures.push(faceRed());
        break;
      case 1:
        textures.push(faceOeil());
        break;
      case 2:
        textures.push(faceO());
        break;
      case 3:
        textures.push(faceAlphabet());
        break;
      case 4:
        textures.push(faceMond());
        break;
      case 5:
        textures.push(faceLook());
        break;
      default:
        textures.push(faceDefault(i));
        break;
    }
  }
}

function setup() {
  createCanvas(400, 400, WEBGL);
}

function draw() {
  background(255);
  // rotateX(angle);
  // rotateY(angle * 0.4);
  // rotateZ(angle * 0.1);

  rotateX(angleX);
  rotateY(angleY);
  rotateZ(angleZ);

  // Draw each face of the cube with different textures
  noStroke();
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

  // angle += 0.01;

}

// Rotation logic
function mouseDragged() {
  let dx = mouseX - lastMouseX;
  let dy = mouseY - lastMouseY;
  angleY -= dx * rotationSpeed;
  angleX -= dy * rotationSpeed;
  lastMouseX = mouseX;
  lastMouseY = mouseY;
}

function mousePressed() {
  // Update the last mouse position when mouse is pressed to prevent jumping.
  lastMouseX = mouseX;
  lastMouseY = mouseY;
}

// --------------------------------------------------------------------------------
// The six cube faces
// ------------------

function faceRed() {
  let gfx = createGraphics(200, 200);
  // colour stolen from the picture
  gfx.background(193, 0, 0);

  // surrounding square
  gfx.stroke(0);
  gfx.noFill();
  gfx.rect(1, 1, gfx.width - 1, gfx.height - 1);

  // work from the centre
  gfx.translate(gfx.width/2, gfx.width/2);

  // base circle
  gfx.noFill();
  const diameter = gfx.width * .8;
  gfx.ellipse(0, 0, diameter, diameter);

  function drawO(size, angle) {
    gfx.textAlign(CENTER, CENTER);
    gfx.textSize(size);
    const radius = diameter/2;
    gfx.noStroke();
    gfx.fill(193, 0, 0);
    const hideRadius = (gfx.textAscent() + gfx.textDescent()) * .7;
    gfx.circle(sin(angle) * radius, cos(angle) * radius, hideRadius);
    gfx.fill(0);
    gfx.text('o', sin(angle) * radius, cos(angle) * radius);
  }

  drawO(18, radians(150));
  drawO(23, radians(305));
  drawO(10, radians(55));

  return gfx;
}

function faceO() {
  let gfx = createGraphics(200, 200);
  gfx.background(255);
  // surrounding square
  gfx.stroke(0);
  gfx.noFill();
  gfx.rect(1, 1, gfx.width - 1, gfx.height - 1);
  gfx.textFont('Courier New');
  gfx.stroke(0);
  gfx.fill(0);
  gfx.textAlign(CENTER, CENTER);
  gfx.textSize(40);
  gfx.translate(gfx.width/2, gfx.width/2);
  gfx.text('o', 0, 0);
  return gfx;
}

function faceAlphabet() {
  let gfx = createGraphics(200, 200);
  gfx.background(255);
  // surrounding square
  gfx.stroke(0);
  gfx.noFill();
  gfx.rect(1, 1, gfx.width - 1, gfx.height - 1);
  gfx.fill(0);
  gfx.textAlign(CENTER, CENTER);
  gfx.textFont('Courier New');
  gfx.stroke(0);
  const al = 'abcdefghijklmnopqrstuvwxyz';
  gfx.textSize(12);
  gfx.translate(gfx.width/2.5, gfx.width/2.5);
  const spacing = 12;
  let row = 0;
  let col = 0;
  for (let i = 0; i < al.length; i++) {
    const c = al.charAt(i);
    if (c === 'o') {
    } else if (c === 'z') {
      col = 2;
      gfx.text(c, col * spacing, row * spacing);
    } else {
      gfx.text(c, col * spacing, row * spacing);
    }
    col++;
    if (i % 5 === 4) {
      row++;
      col = 0;
    }
  }
  return gfx;
}

function faceMond() {
  let gfx = createGraphics(200, 200);
  gfx.background(255);
  gfx.textFont('Courier New');
  gfx.stroke(0);
  gfx.noFill();
  gfx.rect(1, 1, gfx.width - 1, gfx.height - 1);
  gfx.fill(0);
  gfx.textSize(12);
  gfx.textAlign(CENTER, CENTER);
  gfx.translate(gfx.width/2, gfx.width/2);
  gfx.text('m      o n d', 0, 0);
  gfx.noFill();
  gfx.stroke(0);
  const angle = 27;
  const radius = gfx.width * 1.5;
  gfx.arc(140, 0, radius, radius, PI - radians(angle), PI + radians(angle));
  return gfx;
}


function faceLook() {
  let gfx = createGraphics(200, 200);
  gfx.background(255);
  gfx.textFont('Courier New');
  // surrounding square
  gfx.stroke(0);
  gfx.noFill();
  gfx.rect(1, 1, gfx.width - 1, gfx.height - 1);
  gfx.fill(0);
  gfx.textSize(12);
  gfx.textAlign(CENTER, CENTER);
  gfx.translate(gfx.width/2, gfx.width/2);
  gfx.text('l    (o o)    k', 0, 0);
  return gfx;
}

function faceOeil() {
  let gfx = createGraphics(200, 200);
  gfx.background(255);
  gfx.textFont('Courier New');
  // surrounding square
  gfx.stroke(0);
  gfx.noFill();
  gfx.rect(1, 1, gfx.width - 1, gfx.height - 1);
  gfx.translate(gfx.width/2, gfx.width/2);
  gfx.rotate(radians(180));
  gfx.fill(0);
  gfx.textSize(12);
  // the 'oeil' bit (right)
  gfx.textAlign(CENTER, CENTER);
  let radius1 = 45;
  let radius2 = 20;
  const nOeil = 7;
  for (let i = 0; i < nOeil; i++) {
    const ang = PI - radians(30 * i);
    gfx.text('oeil', radius1 * sin(ang), radius2 * cos(ang));
  }
  // the 'o' bit (left)
  gfx.textAlign(CENTER, CENTER);
  const nO = 5;
  for (let i = 0; i < nO; i++) {
    const ang = PI + radians(40) + radians(125)/nO * i;
    gfx.text('o', radius1 * sin(ang), radius2 * cos(ang));
  }

  return gfx;
}

function faceDefault(n) {
  let gfx = createGraphics(200, 200);
  gfx.background(100 + n * 25); // Different shades for each face
  // surrounding square
  gfx.stroke(0);
  gfx.noFill();
  gfx.rect(1, 1, gfx.width - 1, gfx.height - 1);
  gfx.fill(255);
  gfx.textAlign(CENTER, CENTER);
  gfx.textSize(32);
  gfx.text('Face ' + (n + 1), 100, 100);
  return gfx;
}
