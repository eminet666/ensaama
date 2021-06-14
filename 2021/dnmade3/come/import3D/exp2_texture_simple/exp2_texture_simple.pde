// https://forum.processing.org/two/discussion/24350/display-obj-file-in-3d
// https://opengameart.org/content/low-poly-biplane
 
import peasy.*; 
PeasyCam camera;
PShape s;
 
void setup() {
  size(600, 600, P3D);
 
  // The file must be in the data folder
  s = loadShape("biplane.obj"); 
 
  // apply its texture 
  PImage img1=loadImage("diffuse_512.png"); 
  s.setTexture(img1);
  s.scale(5);
  
  camera = new PeasyCam(this, 0, 0, 0, 50);
}
 
void draw() {
  background(192);
  lights();
  shape(s, 0, 0);
}
