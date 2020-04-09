#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);
	vec4 filter = texture2D(uSampler2, vec2(0.0,0)+vTextureCoord);

	if (filter.b > 0.5)
		color= texture2D(uSampler2, vTextureCoord+timeFactor*0.01);
	
	gl_FragColor = color;
}