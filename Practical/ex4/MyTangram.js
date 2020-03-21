/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
		
		this.diamond = new MyDiamond(scene, [
            0, 0.5,
			0, 0.5,
			0.5, 0.5,
			0.25, 0.25]);
        this.parallelogram = new MyParallelogram(scene, [
            0.25, 0.75,
			0.75, 0.75,
			1, 1,
			0.5, 1,
			// Ao contrário
			0.25, 0.75,
			0.75, 0.75,
			1, 1,
			0.5, 1]);
        this.triangleBigOrange = new MyTriangleBig(scene, [
            0.5, 0.5,
			1, 0,
			1, 1,]);
        this.triangleBigBlue = new MyTriangleBig(scene, [
            0, 0,
            1, 0,
            0.5, 0.5]);
        this.triangleRed = new MyTriangle(scene, [
			0.5, 0.5,
			0.75, 0.75,
			0.25, 0.75]);
        this.trianglePurple = new MyTriangle(scene, [
			0, 0,
			0.25, 0.25,
			0, 0.5]);
        this.trianglePink = new MyTriangle(scene, [
			0, 0.5,
			0.5, 1,
			0, 1]);
        this.initMaterials();
    }
    
    initMaterials() {
        this.scene.red = new CGFappearance(this.scene);
        this.scene.red.setAmbient(255, 0, 0, 1.0);
        this.scene.red.setDiffuse(255, 0, 0, 1.0);
        this.scene.red.setSpecular(255, 255, 255, 1.0);
        this.scene.red.setShininess(10);

        this.scene.green = new CGFappearance(this.scene);
        this.scene.green.setAmbient(0, 255, 0, 1.0);
        this.scene.green.setDiffuse(0, 255, 0, 1.0);
        this.scene.green.setSpecular(255, 255, 255, 1.0);
        this.scene.green.setShininess(10);

        this.scene.blue = new CGFappearance(this.scene);
        this.scene.blue.setAmbient(0, 0, 255, 1.0);
        this.scene.blue.setDiffuse(0, 0, 255, 1.0);
        this.scene.blue.setSpecular(255, 255, 255, 1.0);
        this.scene.blue.setShininess(10);

        this.scene.pink = new CGFappearance(this.scene);
        this.scene.pink.setAmbient(25.5, 15.5, 20.7, 1.0);
        this.scene.pink.setDiffuse(255, 155, 207, 1.0);
        this.scene.pink.setSpecular(255, 255, 255, 1.0);
        this.scene.pink.setShininess(10);

        this.scene.yellow = new CGFappearance(this.scene);
        this.scene.yellow.setAmbient(255, 255, 0, 1.0);
        this.scene.yellow.setDiffuse(255, 255, 0, 1.0);
        this.scene.yellow.setSpecular(255, 255, 255, 1.0);
        this.scene.yellow.setShininess(10);

        this.scene.purple = new CGFappearance(this.scene);
        this.scene.purple.setAmbient(15.0, 8.0, 19.0, 1.0);
        this.scene.purple.setDiffuse(150, 80, 190, 1.0);
        this.scene.purple.setSpecular(255, 255, 255, 1.0);
        this.scene.purple.setShininess(10);

        this.scene.orange = new CGFappearance(this.scene);
        this.scene.orange.setAmbient(25.5, 15.3, 0, 1.0);
        this.scene.orange.setDiffuse(255, 153, 0, 1.0);
        this.scene.orange.setSpecular(255, 255, 255, 1.0);
        this.scene.orange.setShininess(10);
    }
	display() {

        this.scene.pushMatrix();
        this.scene.customMaterial.apply();
        var trans = [1.0, 0.0, 0.0, 0.0,
                     0.0, 1.0, 0.0, 0.0,
                     0.0, 0.0, 1.0, 0.0,
                    -1.0, 0.0, 0.0, 1.0];
        this.scene.multMatrix(trans);
        this.diamond.display();
        this.scene.popMatrix();
        
        // this.scene.setdefaultappearance();
        
        this.scene.pushMatrix();
        this.scene.customMaterial.apply();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.translate(-1, -1, 0);
        this.parallelogram.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.customMaterial.apply();
        this.scene.translate(0,-2,0);
        this.scene.rotate(Math.PI,0,0,1);
        this.triangleBigOrange.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.customMaterial.apply();
        this.scene.translate(0,-2,0);
        this.triangleBigBlue.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.customMaterial.apply();
        this.scene.translate(1,-1,0);
        this.scene.rotate(Math.PI,0,0,1);
        this.trianglePink.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.customMaterial.apply();
        this.scene.translate(-0.71, 1.71, 0);
        this.scene.scale(0.71, 0.71, 0.71);
        this.scene.rotate(Math.PI,0,0,1);
        this.trianglePurple.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.customMaterial.apply();
        this.scene.translate(-2, -1, 0);
        this.scene.scale(0.71, 0.71, 0.71);
        this.scene.rotate(135*Math.PI/180,0,0,1);
        this.triangleRed.display();
        this.scene.popMatrix();
    }

    enableNormalViz(){
        this.diamond.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.triangle.enableNormalViz();
        this.triangleBig.enableNormalViz();
    }

    disableNormalViz(){
        this.diamond.disableNormalViz();
        this.parallelogram.disableNormalViz();
        this.triangle.disableNormalViz();
        this.triangleBig.disableNormalViz();

    }
}

