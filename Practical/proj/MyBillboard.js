/**
 * MyBillboard
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBillboard extends CGFobject {
	constructor(scene) {
        super(scene);
        this.plane = MyPlane(scene);
		this.initBuffers();
    }
    
    initBuffers() {
        this.scene.billboardAppearance = new CGFappearance(this.scene);
        
        this.scene.bilboardTexture = new CGFtexture(this.scene, "images/billboard.png");

        this.scene.billboardAppearance.setTexture(this.scene.bilboardTexture);
    }

    
    display() {

    }
}