// https://forum.processing.org/two/discussion/24350/display-obj-file-in-3d
// https : // opengameart.org/content/hextraction-base-player-pod
import peasy.*;
PeasyCam camera;
PShape s;
 
void setup() {
  size(600, 600, P3D);
 
  // The file and all other data must be in the data folder
  s = loadShape("hextraction_pod.obj"); 
 
  camera = new PeasyCam(this, 0, 0, 0, 50);
}
 
void draw() {
  background(192);
  lights();
  shape(s, 0, 0);
}
