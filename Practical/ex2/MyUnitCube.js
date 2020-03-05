/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			0.5, -0.5, 0.5,		//0
			0.5, -0.5, -0.5,	//1
			-0.5, -0.5, -0.5,	//2
			-0.5, -0.5, 0.5,	//3
			0.5, 0.5, 0.5,		//4
			0.5, 0.5, -0.5,		//5
			-0.5, 0.5, -0.5,	//6
			-0.5, 0.5, 0.5,		//7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 4,	// Direita
			1, 5, 4,
			4, 5, 6,	// Cima
			4, 6, 7,
			2, 0, 3,	// Baixo
			2, 1, 0,
			7, 2, 3,	// Esquerda
			7, 6, 2,
			3, 0, 7,	// Frente
			0, 4, 7,
			1, 2, 6,	// Trás
			1, 6, 5,
		];
		// for(var i = 0; i < 6; i++){
		// 	this.indices.push(i, i+1, i+4, i+1, i+4+1, i+4);
		// }

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

