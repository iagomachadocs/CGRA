/**
 * MyBillboard
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBillboard extends CGFobject {
  constructor(scene) {
    super(scene);
    this.plane = new MyPlaneFlag(scene);
    this.progressBar = 0.0;
    this.initMaterials();
  }

  initMaterials() {
    this.billboardAppearance = new CGFappearance(this.scene);
    this.billboardAppearance.setAmbient(0.3, 0.3, 0.3, 1);
    this.billboardAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
    this.billboardAppearance.setSpecular(0.0, 0.0, 0.0, 1);
    this.billboardAppearance.setShininess(120);
    this.billboardAppearance.setTextureWrap("REPEAT", "REPEAT");

    this.bilboardTexture = new CGFtexture(this.scene, "images/billboard.png");

    this.billboardAppearance.setTexture(this.bilboardTexture);

    this.billboardShader = new CGFshader(
      this.scene.gl,
      "shaders/billboard.vert",
      "shaders/billboard.frag"
    );

    this.billboardShader.setUniformsValues({
      progressBar: this.progressBar,
    });

  }

  display() {
    this.billboardAppearance.apply();
    this.scene.setActiveShader(this.billboardShader);
    this.scene.pushMatrix();
    this.scene.scale(20, 10, 1);
    this.plane.display();
    this.scene.popMatrix();

    this.scene.setActiveShader(this.scene.defaultShader);
    this.scene.setDefaultAppearance();
  }
}
