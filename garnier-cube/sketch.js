// --------------------------------------------------------------------------------
// Ilse Garnier, "Jeu de Cubes" in *Puzzle-Alphabet*, Paris: Éditions L'herbe
// qui tremble, 2010.
//
// Jérémie Wenger, 2024
// With Iris Colomb, in the context of *Machines poétiques*: exploring textual
// systems through experimental French poetry, Goldsmiths College
// --------------------------------------------------------------------------------

// Controls:
// - space bar: toggle random rotations
// - mouse drag: rotate the square on the X and Y axes (deactivates autonomous
//   movement)

// Ideas for further development:
// - This is just one cube! The main challenge is to change the colour and the
//   main letter ('o'), and try and explore another direction!
// - Is the cube as displayed really the same as in the template? Can you spot
//   what is different, and how would you go about correcting that?
// - Some of the faces, for instance faceLook, use literally no system at all.
//   Is this satisfying to you? If not, you could think of what system led to 
//   this particular configuration of letters (or transformation of a word),
//   and see if you can recreated this hypothetical system, and apply it to
//   different words? A similar comment can be said about faceMond, which is
//   only partially systematised (and there might be better ways!).
// - Can you make the faceOeil look even more like the original? Notice that
//   here I used trigonometry and the equation of the ellipse to draw words
//   on a hidden line/trajectory, but in the original her shape is even more
//   horizontally squished, with more words on the extremities. Perhaps there
//   is a way of achieving that? Another direction would be to find the
//   equation for another shape (e.g. the 'infinity' sign?) and do something
//   with that?
// - One major path of exploration would be to do what Garnier never could:
//   animate the faces! Note that in the current state the faces are built once
//   in preload(), so that would have to be modified, so that animation could
//   be added to them!


let mode = 0; // 0 = autonomous, 1 = mouse

// for mouse mode
let angleX = 0;
let angleY = 0;
let angleZ = 0;

let lastMouseX = 0;
let lastMouseY = 0;
let rotationSpeed = 0.01;

let textures = [];

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

  if (mode === 0) {

    // Using noise (walking a 'random but smooth' landscape):
    // Try commenting out two out of three to see only one movement!
    // - noise() - .5 -> the number is within [-.5, .5], so that
    //                   sometimes we go in one direction, sometimes
    //                   the other
    // - the division at the end controls the speed, making the update
    //   smaller: /30 goes slower than /10
    // - the division inside noise defines the step size on the landscape: if
    //   the number is big, the steps are small -> the output is smoother 
    //   (locally, when you walk very slowly, the landscape isn't very random);
    //   if you make very big steps, e.g. not dividing frameCount at all, the 
    //   movement will be very jittery, even static: that's because we just produce
    //   random numbers [-.5, .5], the negative number cancelling each other out
    //   (whereas if you have often similar numbers, they add up over time!)
    // - the number added to framecount simply moves the starting point where we
    //   'walk' on the random landscape: this ensures we get different random
    //   numbers for each angle!
    // See here: https://en.wikipedia.org/wiki/Perlin_noise
    // And also the Shiffman tutorial:
    // https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/perlin/intro-to-perlin-noise

    angleX += (noise(frameCount/1000) - .5)/30;
    angleY += (noise((frameCount+5000)/1000) - .5)/10;
    angleZ += (noise((frameCount+10000)/1000) - .5)/40;

    // The first version: smooth movement only depending on angleX (note that
    // this will provoke some jitter if you use the mouse, as then angleY and
    // angleZ are reset to the value dictated by angleX as soon as you go back
    // to autonomous mode!

    // angleX += 0.01;
    // angleY = angleX * 0.4;
    // angleZ = angleX * 0.1;

    // console.log(`angleX: ${angleX}, angleY: ${angleY}, angleZ: ${angleZ}`);
  }

}

// Rotation logic:
//   - horizontal drag: rotates x
//   - vertical drag: rotates z
function mouseDragged() {
  mode = 1; // automatically move to manual
  let dx = mouseX - lastMouseX;
  let dy = mouseY - lastMouseY;
  angleX -= dy * rotationSpeed;
  angleY += dx * rotationSpeed;
  lastMouseX = mouseX;
  lastMouseY = mouseY;
  // console.log(`angleX: ${angleX}, angleY: ${angleY}, angleZ: ${angleZ}`);
}

function mousePressed() {
  // Update the last mouse position when mouse is pressed to prevent jumping.
  lastMouseX = mouseX;
  lastMouseY = mouseY;
}

function keyPressed() {
  // Press space to switch between automatic and mouse mode
  if (key === ' ') {
    mode = (mode + 1) % 2; // modulo logic to toggle between 0 & 1
    // console.log(`mode is now ${mode}`);
  }
}

// --------------------------------------------------------------------------------
// The six cube faces
// ------------------

function faceRed() {
  let gfx = createGraphics(200, 200);
  // colour stolen from the picture
  gfx.background(193, 0, 0);

  drawBoundaries(gfx); // surrounding square
  
  gfx.translate(gfx.width/2, gfx.width/2); // work from the centre

  // base circle
  gfx.noFill();
  const diameter = gfx.width * .8;
  gfx.ellipse(0, 0, diameter, diameter);

  // draw a red circle (erasing background) & write text
  function drawO(size, angle) {
    gfx.textAlign(CENTER, CENTER);
    gfx.textSize(size);
    const radius = diameter/2;
    gfx.noStroke();
    gfx.fill(193, 0, 0);
    const hideRadius = (gfx.textAscent() + gfx.textDescent()) * .7;
    // note: I use trigonometry to place the circle & text on the bigger circle!
    gfx.circle(sin(angle) * radius, cos(angle) * radius, hideRadius);
    gfx.fill(0);
    gfx.text('o', sin(angle) * radius, cos(angle) * radius);
  }

  // draw the three 'o's
  drawO(18, radians(150));
  drawO(23, radians(305));
  drawO(10, radians(55));

  return gfx;
}

function faceO() {
  let gfx = createGraphics(200, 200);
  gfx.background(255);
  // prepare font, boundaries, translate to centre, setup text
  prepareFace(gfx, 45);
  // draw text
  gfx.text('o', 0, 0);
  return gfx;
}

function faceAlphabet() {
  let gfx = createGraphics(200, 200);
  gfx.background(255);
  // prepare font, boundaries, translate to centre, setup text
  prepareFace(gfx);
  gfx.translate(-20, -20); // move back from the middle
  const al = 'abcdefghijklmnopqrstuvwxyz';
  const spacing = 12;
  let row = 0;
  let col = 0;
  // loop through all the letters
  for (let i = 0; i < al.length; i++) {
    const c = al.charAt(i);
    // skip letter 'o'
    if (c === 'o') {
    // exception for letter 'z'
    } else if (c === 'z') {
      col = 2;
      gfx.text(c, col * spacing, row * spacing);
    // all other letters
    } else {
      gfx.text(c, col * spacing, row * spacing);
    }
    // updating cols & rows
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
  // prepare font, boundaries, translate to centre, setup text
  prepareFace(gfx);
  // draw text
  gfx.text('m      o n d', 0, 0);
  // draw arc
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
  // prepare font, boundaries, translate to centre, setup text
  prepareFace(gfx);
  gfx.text('l    (o o)    k', 0, 0);
  return gfx;
}

function faceOeil() {
  let gfx = createGraphics(200, 200);
  gfx.background(255);
  // prepare font, boundaries, translate to centre, setup text
  prepareFace(gfx);
  gfx.rotate(radians(180)); // rotate entire face (after translation)

  // the 'oeil' bit (right)
  let radius1 = 45;
  let radius2 = 20;
  const nOeil = 7;
  // using trigonometry and the equation of the ellipse, see here:
  // https://math.stackexchange.com/a/2019549
  for (let i = 0; i < nOeil; i++) {
    const ang = PI - radians(30 * i);
    gfx.text('oeil', radius1 * sin(ang), radius2 * cos(ang));
  }

  // the 'o' bit (left)
  const nO = 5;
  for (let i = 0; i < nO; i++) {
    const ang = PI + radians(40) + radians(125)/nO * i;
    gfx.text('o', radius1 * sin(ang), radius2 * cos(ang));
  }

  return gfx;
}

// Default face: grey background with 'Face ' and the face number
function faceDefault(n) {
  let gfx = createGraphics(200, 200);
  gfx.background(100 + n * 25); // Different shades for each face
  drawBoundaries(gfx); // surrounding square
  gfx.translate(gfx.width/2, gfx.width/2); // work from the centre
  gfx.textAlign(CENTER, CENTER);
  gfx.textSize(32);
  gfx.fill(0);
  // write the text
  gfx.text('Face ' + (n + 1), 0, 0);
  return gfx;
}

// --------------------------------------------------------------------------------
// Face utils

function drawBoundaries(gfx) {
  gfx.stroke(0);
  gfx.noFill();
  gfx.rect(1, 1, gfx.width - 1, gfx.height - 1);
}

// default params for each face
function prepareFace(gfx, fontSize=12) {
  gfx.textFont('Courier New');
  drawBoundaries(gfx); // surrounding square
  gfx.translate(gfx.width/2, gfx.width/2); // work from the centre
  gfx.textAlign(CENTER, CENTER);
  gfx.textSize(fontSize);
  gfx.stroke(0);
  gfx.fill(0);
}
