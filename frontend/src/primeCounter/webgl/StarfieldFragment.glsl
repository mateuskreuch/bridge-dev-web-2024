precision highp float;

/*----------------------------------------------------------------------------//

Shaders são um pouco díficil de entender porque elas são basicamente truques de
matemática. Essencialmente, imagine ondas circulares, como as produzidas por uma
pedra atirada em um lago. Agora imagine que essas ondas são cortadas como uma
pizza, em centenas de fatias, e que cada fatia avança em uma velocidade
diferente.

É possível visualizar melhor com SIZE = 10.0;

//----------------------------------------------------------------------------*/

const float SIZE = 600.0;
const vec2  CONTAINER_OFFSET = vec2(0.28, 0.23);

uniform vec4  drag;
uniform float vmax;
uniform float time;

void main() {
  vec2  position = gl_FragCoord.xy / vmax - CONTAINER_OFFSET;
  float slice    = ceil(atan(position.x, position.y) * SIZE);
  float offset   = cos(slice);
  float invDist  = offset / dot(position, position);

  slice *= offset;

  gl_FragColor = exp(fract(invDist + slice + time) * -drag) / (0.75*invDist);
}