/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyQuad extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			0.5, -0.5, -0.5,	//0
			-0.5, -0.5, -0.5,	//1
			-0.5, -0.5, 0.5,	//2
			0.5, -0.5, 0.5,	//3
			0.5, 0.5, -0.5,	//4
			-0.5, 0.5, -0.5,	//5
			-0.5, 0.5, 0.5,	//6
			0.5, 0.5, 0.5,	//7
		];//x  y  z

		//Counter-clockwise reference of vertices
		this.indices = [];

		for(var i = 0; i < 4; i++){
			this.indices.push(i%4, (i+1)%4, i%4+4,
								(i+1)%4, (i+1)%4+4, i%4+4);
				
		}

		this.indices.push(2,1,0,
							0,3,2,
							4,5,7,
							7,5,6);

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

