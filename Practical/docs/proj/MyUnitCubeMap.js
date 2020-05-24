/**
 * MyUnitCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeMap extends CGFobject {
  constructor(scene) {
    super(scene);

    this.quad = new MyQuad(scene);
  }

  display() {
    this.scene.cubeMapMaterial.apply();
    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
    //front
    this.scene.pushMatrix();
    this.scene.scale(50,50,50);

    this.scene.pushMatrix();
    this.scene.mapFront.bind(0);
    this.scene.translate(0, 0, 0.5);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.quad.display();
    this.scene.popMatrix();

    //back
    this.scene.pushMatrix();
    this.scene.mapBack.bind(0);
    this.scene.translate(0, 0, -0.5);
    this.quad.display();
    this.scene.popMatrix();

    //left
    this.scene.pushMatrix();
    this.scene.mapLeft.bind(0);
    this.scene.translate(0.5, 0, 0);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.quad.display();
    this.scene.popMatrix();

    //right
    this.scene.pushMatrix();
    this.scene.mapRight.bind(0);
    this.scene.translate(-0.5, 0, 0);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.quad.display();
    this.scene.popMatrix();

    //top
    this.scene.mapTop.bind(0);

    this.scene.pushMatrix();
    this.scene.translate(0, 0.5, 0);
    this.scene.rotate(Math.PI/2, 1, 0, 0);
    this.scene.rotate(Math.PI, 0, 0, 1);
    this.quad.display();
    this.scene.popMatrix();

    //bottom
    this.scene.mapBottom.bind(0);

    this.scene.pushMatrix();
    this.scene.translate(0, -0.5, 0);
    this.scene.rotate(-Math.PI/2, 1, 0, 0);
    this.scene.rotate(Math.PI, 0, 0, 1);
    this.quad.display();
    this.scene.popMatrix();
    this.scene.popMatrix();
  }

  enableNormalViz() {
    this.quad.enableNormalViz();
  }

  disableNormalViz() {
    this.quad.disableNormalViz();
  }
}
