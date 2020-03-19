/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			0, 0, 0,	//0
			1, 1, 0,	//1
			3, 1, 0,	//2
			2, 0, 0,	//3

			0, 0, 0,	//0-4
			1, 1, 0,	//1-5
			3, 1, 0,	//2-6
			2, 0, 0		//3-7
		];//x  y  z

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 2, 1,
			2, 0, 3,
			5, 6, 4,
			7, 4, 6
		];

		this.normals = [];
		for(var i = 0; i < 8; i++){
			if(i < 4){
				this.normals.push(0,0,1);
			}else{
				this.normals.push(0,0,-1);
			}
		}

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

