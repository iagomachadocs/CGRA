
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

	if ((texture2D(uSampler, timeFactor*vec2(0.02,0.02)+vTextureCoord).b) < 0.5){
		offset=aVertexNormal*0.1;
	}	

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset/5.0, 1.0);
}
