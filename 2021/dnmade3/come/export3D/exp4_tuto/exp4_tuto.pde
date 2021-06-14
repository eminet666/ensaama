// https://funprogramming.org/152-Exporting-3D-shapes-as-obj-files-in-Processing.html
// source : https://n-e-r-v-o-u-s.com/tools/obj/
// github : https://github.com/nervoussystem/OBJExport
// intallation : télécharger/déziper et ajouter dans Documents/Processing/Librarys/mp3agic/library
// image : https://commons.wikimedia.org/wiki/File:Far-Infrared_Image_of_M51.jpg
import nervoussystem.obj.*;

PImage img;
boolean record = false;

void setup() {
  size(600, 600, P3D);
  img = loadImage("M51.jpg");
  img.loadPixels();
  noStroke();
}

void draw() {
  if(record) {
    beginRecord("nervoussystem.obj.OBJExport", "m51.obj"); 
  }
  background(255);
  lights();
  translate(width/2, height/2);
  scale(5);
  rotateX(mouseY * 0.01);
  rotateY(mouseX * 0.01);
  //image(img, 0, 0);
  for(int x=0; x<100; x++) {
    for(int y=0; y<100; y++) {
      int imgx = (int)map(x, 0, 100, 0, img.width);
      int imgy = (int)map(y, 0, 100, 0, img.height);
      float bri = brightness(img.get(imgx, imgy));
      if(bri > 50) {
        pushMatrix();
        translate(x, y);
        box(bri/100.0);
        popMatrix();
      }
    }
  }
  if(record) {
    endRecord();
    record = false;
  }
}

void keyPressed() {
  if(key == 's' || key == 'S') {
    record = true;
  }
}
