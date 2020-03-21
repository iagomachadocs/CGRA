/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyDiamond extends CGFobject {
	constructor(scene, coords) {
		super(scene);
		this.initBuffers();
		if (coords != undefined)
			this.updateTexCoords(coords);
	}
	initBuffers() {
		this.vertices = [
			-1, 0, 0,	//0
			0, -1, 0,	//1
			0, 1, 0,	//2
			1, 0, 0,	//3
			
			-1, 0, 0,	//0-4
			0, -1, 0,	//1-5
			0, 1, 0,	//2-6
			1, 0, 0		//3-7
		];//x  y  z

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			1, 3, 2
		];

		this.normals = [];
		for(var i = 0; i < 4; i++){
			this.normals.push(0,0,1);
		}

		this.texCoords = [
			0, 1,
			1, 1,
			0, 0,
			1, 0,
			//Ao contrário
			// 1, 0,
			// 0, 0,
			// 1, 1,
			// 0, 1,
		]
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}

