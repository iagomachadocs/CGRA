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

		/*
			  6______5
			 /|     /|
			7______4 |
			| 2----|-1
			|/     |/
			3______0
		*/
		this.vertices = [
			0.5, -0.5, 0.5,		//0
			0.5, -0.5, -0.5,	//1
			-0.5, -0.5, -0.5,	//2
			-0.5, -0.5, 0.5,	//3
			0.5, 0.5, 0.5,		//4
			0.5, 0.5, -0.5,		//5
			-0.5, 0.5, -0.5,	//6
			-0.5, 0.5, 0.5,		//7

			0.5, -0.5, 0.5,		//0-8
			0.5, -0.5, -0.5,	//1-9
			-0.5, -0.5, -0.5,	//2-10
			-0.5, -0.5, 0.5,	//3-11
			0.5, 0.5, 0.5,		//4-12
			0.5, 0.5, -0.5,		//5-13
			-0.5, 0.5, -0.5,	//6-14
			-0.5, 0.5, 0.5,		//7-15

			0.5, -0.5, 0.5,		//0-16
			0.5, -0.5, -0.5,	//1-17
			-0.5, -0.5, -0.5,	//2-18
			-0.5, -0.5, 0.5,	//3-19
			0.5, 0.5, 0.5,		//4-20
			0.5, 0.5, -0.5,		//5-21
			-0.5, 0.5, -0.5,	//6-22
			-0.5, 0.5, 0.5,		//7-23
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0,1,4,		//Direita
			1,5,4,

			9,10,13,	//Trás	
			10,14,13,

			2,3,6,		//Esquerda
			3,7,6,

			11,8,15,	//Frente
			8,12,15,

			20,21,22,	//Cima
			22,23,20,

			16,18,17,	//Baixo
			18,16,19
		];

		this.normals = [];

		for(var i = 0; i < 8; i++){
			if(i%4 < 2){	// Normais dos vértices da face da direita
				this.normals.push(1, 0, 0);
			} else{	// Normais dos vértices da face da esquerda
				this.normals.push(-1, 0, 0);
			}
		}

		for(var i = 0; i < 8; i ++){
			if(i%4 == 0 || i%4 == 3){	// Normais dos vértices da face da frente
				this.normals.push(0, 0, 1);
			} else{	// Normais dos vértices da face de trás
				this.normals.push(0, 0, -1);
			}
		}

		for(var i = 0; i < 8; i++){
			if(i < 4){	// Normais dos vértices da face de baixo
				this.normals.push(0, -1, 0);
			}else{	// Normais dos vértices da face de cima
				this.normals.push(0, 1, 0);
			}
		}


		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

