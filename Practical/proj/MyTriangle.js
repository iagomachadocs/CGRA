/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTriangle extends CGFobject {
	constructor(scene, coords) {
		super(scene);
		this.initBuffers();
		if (coords != undefined)
			this.updateTexCoords(coords);
	}
	initBuffers() {
		this.vertices = [
			-1, 1, 0,	//0
			1, -1, 0,	//1
			-1, -1, 0,	//2
			-1, 1, 0,	//3
			1, -1, 0,	//4
			-1, -1, 0	//5
		];//x  y  z

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 2, 1,
			1, 2, 0
		];

		this.normals = [];
		for(var i = 0; i < 3; i++){
			this.normals.push(0,0,1);
		}
		for(var i = 0; i < 3; i++){
			this.normals.push(0,0,-1);
		}

		this.texCoords = [
			0, 0.5,
			0.5, 1,
			0, 1,
			0, 0.5,
			0.5, 1,
			0, 1
		]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

		/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the quad
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
	
	display(){
		this.scene.scale(0.5, 0.5, 0.5);
		super.display();
	}
}

