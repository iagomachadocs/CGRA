/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
		
		this.diamond = new MyDiamond(scene);
        this.parallelogram = new MyParallelogram(scene);
	}
	display() {
		this.scene.pushMatrix();
        var trans = [1.0, 0.0, 0.0, 0.0,
                     0.0, 1.0, 0.0, 0.0,
                     0.0, 0.0, 1.0, 0.0,
                    -1.0, 0.0, 0.0, 1.0];
        this.scene.multMatrix(trans);
        
        this.diamond.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.translate(-1, -1, 0);
        this.parallelogram.display();
        this.scene.popMatrix();
	}
}

