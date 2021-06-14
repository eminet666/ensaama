// https://funprogramming.org/152-Exporting-3D-shapes-as-obj-files-in-Processing.html
// source : https://n-e-r-v-o-u-s.com/tools/obj/
// github : https://github.com/nervoussystem/OBJExport
// intallation : télécharger/déziper et ajouter dans Documents/Processing/Librarys/mp3agic/library
import nervoussystem.obj.*;
boolean record = false;

void setup() {
  size(400, 400,P3D);
}

void draw() {
  if (record) {
    beginRecord("nervoussystem.obj.OBJExport", "filename.obj"); 
  }  
  box(100,100,100);
  if (record) {
    endRecord();
    record = false;
  }
}

void mousePressed() {
  record = true;
}
