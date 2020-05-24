#ifdef GL_ES
precision highp float;
#endif

varying vec3 vVertexPosition;
uniform float cutoff;

void main() {
	vec4 color = vec4(0.5, 0.5, 0.5, 1.0);

	if((vVertexPosition.x+0.5) < cutoff)
		color =  vec4(0.5 - vVertexPosition.x, 0.5 + vVertexPosition.x,0.0, 1.0);
	
	gl_FragColor = color;
}