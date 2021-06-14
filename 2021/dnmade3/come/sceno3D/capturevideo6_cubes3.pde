//Côme Brocas et copyright (c) Coding Train Daniel Shiffman
//permet de détourer ce qui bouge devant un fond statique (choisir l'image de fond en cliquant)


//importation de la librairie video
import processing.video.*;

Capture video;
PImage prev;
int depth = 0;

void setup() {
  size(640, 480, P3D);

  video = new Capture(this, 640, 480, 30);
  video.start();

  prev = createImage(640, 480, RGB);
}

void mousePressed() {
  prev.copy(video, 0, 0, video.width, video.height, 0, 0, prev.width, prev.height);
  prev.updatePixels();
}

void keyPressed() {
  saveFrame("capture####.png");
}

void captureEvent(Capture video) {
  video.read();
}

void draw() {

  video.loadPixels();
  prev.loadPixels();

  int w = video.width;
  int h = video.height;
  image(video, 0, 0, w, h);
  image(prev, w, 0, w, h);

  float threshold = 55;
  background(255, 0, 255);
  loadPixels();
  rotateY(-0.5); 
  
  translate(0, 0, depth);
  depth -= 10;
  // Begin loop to walk through every pixel;
  for (int x = 0; x < w; x+=10 ) {
    for (int y = 0; y < h; y+=10 ) {
      int loc = x + y * w;
      // What is current color
      color currentColor = video.pixels[loc];
      float r1 = red(currentColor);
      float g1 = green(currentColor);
      float b1 = blue(currentColor);
      color prevColor = prev.pixels[loc];
      float r2 = red(prevColor);
      float g2 = green(prevColor);
      float b2 = blue(prevColor);

      float d = distSq(r1, g1, b1, r2, g2, b2); 

      pushMatrix();

      if (d > threshold*threshold) {
        //int rng1 = int(random(255));
        //int rng2 = int(random(255));
        //int rng3 = int(random(255));
        //fill(rng1, rng2, rng3);
        fill(255);
        stroke(0);
        //ellipse(x, y, 10, 10);
        translate(x, y, depth);
        box(10);
      } else {       
        noFill();
        noStroke();
        //rect(x, y, 10, 10);
        translate(x, y, depth);
        box(10);
      }
      popMatrix();
    }
  }
  //updatePixels();
}

//différence entre les couleurs, optimisé pour pas utiliser la fonction racine carrée
float distSq(float x1, float y1, float z1, float x2, float y2, float z2) {
  float d = (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1) +(z2-z1)*(z2-z1);
  return d;
}
