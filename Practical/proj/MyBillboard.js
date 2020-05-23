/**
 * MyBillboard
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBillboard extends CGFobject {
  constructor(scene) {
    super(scene);
    this.plane = new MyPlane(scene);
    this.initMaterials();
  }

  initMaterials() {
    this.billboardAppearance = new CGFappearance(this.scene);
    this.billboardAppearance.setAmbient(0.3, 0.3, 0.3, 1);
    this.billboardAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
    this.billboardAppearance.setSpecular(0.0, 0.0, 0.0, 1);
    this.billboardAppearance.setShininess(120);
    this.billboardAppearance.setTextureWrap("REPEAT", "REPEAT");

    this.bilboardTexture = new CGFtexture(this.scene, "images/Billboard.png");

    this.billboardAppearance.setTexture(this.bilboardTexture);

    this.billboardShader = new CGFshader(
      this.scene.gl,
      "shaders/billboard.vert",
      "shaders/billboard.frag"
    );

    this.billboardShader.setUniformsValues({
      cutoff: this.scene.nSuppliesDelivered/5.0,
    });

    this.beamAppearance = new CGFappearance(this.scene);
    this.beamTexture = new CGFtexture(this.scene, "images/wood.jpg");
    this.beamAppearance.setTexture(this.beamTexture);

  }

  update(t){
    this.billboardShader.setUniformsValues({
      cutoff: this.scene.nSuppliesDelivered/5.0,
    });
  }

  display() {
    //Billboard
    this.billboardAppearance.apply();
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI/4, 0, 1, 0);
    this.scene.translate(0, 12.5, -15);
    this.scene.scale(2, 1, 1);
    this.scene.scale(5, 5, 1);
    this.plane.display();
    this.scene.popMatrix();

    //Left beam
    this.beamAppearance.apply();
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI/4, 0, 1, 0);
    this.scene.translate(-4.8, 7.5, -15);
    this.scene.scale(0.04, 1, 1);
    this.scene.scale(5, 5, 1);
    this.plane.display();
    this.scene.popMatrix();

    //Right beam
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI/4, 0, 1, 0);
    this.scene.translate(4.8, 7.5, -15);
    this.scene.scale(0.04, 1, 1);
    this.scene.scale(5, 5, 1);
    this.plane.display();
    this.scene.popMatrix();

    this.scene.setDefaultAppearance();

    //Progress bar
    this.scene.setActiveShader(this.billboardShader);
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI/4, 0, 1, 0);
    this.scene.translate(0, 12, -14.99);
    this.scene.scale(1.5, 0.2, 1);
    this.scene.scale(5, 5, 1);
    this.plane.display();
    this.scene.popMatrix();
    this.scene.setActiveShader(this.scene.defaultShader);

  }
}
