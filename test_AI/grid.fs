precision highp float;

uniform vec2 uResolution;
uniform float uTime;

varying vec2 vUv;

void main() {
  vec2 st = vUv;
  vec3 color = vec3(0.0);

  float grid_size = 0.05;
  vec2 grid = vec2(grid_size,grid_size);
  vec2 grid_uv = fract(st * grid);

  if (grid_uv.x < 0.05 || grid_uv.y < 0.05) { // changed && to || here  
    color = vec3(0.5);   // changed from color += to just color =  
  }

  gl_FragColor = vec4(color, 1.0);   // added semicolon here  
}
