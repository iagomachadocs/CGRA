/**
 * MyFlag
 * @constructor
 */
class MyFlag extends CGFobject {
  constructor(scene) {
    super(scene);
    this.plane = new MyPlaneFlag(scene, 20);

    this.initMaterials();
  }

  initMaterials() {
    this.black = new CGFappearance(this.scene);
    this.black.setAmbient(0, 0, 0, 1.0);
    this.black.setDiffuse(0, 0, 0, 1.0);
    this.black.setSpecular(0, 0, 0, 1.0);
    this.black.setShininess(10);

    this.flagAppearance = new CGFappearance(this.scene);
    this.flagAppearance.setAmbient(0.3, 0.3, 0.3, 1);
    this.flagAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
    this.flagAppearance.setSpecular(0.0, 0.0, 0.0, 1);
    this.flagAppearance.setShininess(120);
    this.flagAppearance.setTextureWrap("REPEAT", "REPEAT");

    this.flagShader = new CGFshader(
      this.scene.gl,
      "shaders/flag.vert",
      "shaders/flag.frag"
    );

    this.flagTexture = new CGFtexture(this.scene, "images/ft4.jpeg");

    this.angularSpeed = 1.0;
    this.phase = 0;

    this.flagShader.setUniformsValues({
      angularSpeed: this.angularSpeed,
      phase: this.phase,
    });

    this.flagAppearance.setTexture(this.flagTexture);
  }

  display() {
    //Rope
    this.scene.pushMatrix();
    this.black.apply();
    this.scene.translate(0, 0.5, 2.1);
    this.scene.scale(0.05, 0.05, 2.4);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.plane.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.translate(0, -0.5, 2.1);
    this.scene.scale(0.05, 0.05, 2.4);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.plane.display();
    this.scene.popMatrix();

    //Flag
    this.flagAppearance.apply();
    this.scene.setActiveShader(this.flagShader);
    this.scene.pushMatrix();
    this.scene.scale(1, 1, 2);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.plane.display();
    this.scene.popMatrix();

    this.scene.setActiveShader(this.scene.defaultShader);
    this.scene.setDefaultAppearance();

  }

  update(t, speed) {
    if (this.phase == 0) {
      this.currentTime = t;
      this.phase = 0.01;
    }

    this.previousTime = this.currentTime;
    this.currentTime = t;

    this.deltaT = this.currentTime - this.previousTime;
    this.deltaX = (this.deltaT * speed) / 100.0;

    this.phase += this.deltaX;
    this.angularSpeed = speed * 10 + 5;

    this.flagShader.setUniformsValues({
      phase: this.phase,
      angularSpeed: this.angularSpeed,
    });
  }
}
