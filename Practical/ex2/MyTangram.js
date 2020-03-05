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
        this.triangleBig = new MyTriangleBig(scene);
        this.triangle = new MyTriangle(scene);
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

        this.scene.pushMatrix();
        this.scene.translate(0,-2,0);
        this.scene.rotate(Math.PI,0,0,1);
        this.triangleBig.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,-2,0);
        this.triangleBig.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1,-1,0);
        this.scene.rotate(180*Math.PI/180,0,0,1);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 1.5, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.rotate(180*Math.PI/180,0,0,1);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-2, -1, 0);
        this.scene.scale(0.75, 0.75, 0.75);
        this.scene.rotate(135*Math.PI/180,0,0,1);
        this.triangle.display();
        this.scene.popMatrix();
	}
}

