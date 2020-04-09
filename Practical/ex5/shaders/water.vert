
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;


void main() {
	vec3 offset=vec3(0.0,0.0,0.0);
	
	vTextureCoord = aTextureCoord;

	if ((texture2D(uSampler, vec2(0.01*timeFactor,0.01*timeFactor)+vTextureCoord).b) > 0.5)
		offset=aVertexNormal*0.1*sin(timeFactor*0.5);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset*0.5, 1.0);
}
