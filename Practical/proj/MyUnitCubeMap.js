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
    //front
    this.scene.pushMatrix();
    this.scene.scale(50,50,50);

    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

    this.scene.pushMatrix();
    this.scene.mapFront.apply()
    this.scene.translate(0, 0, 0.5);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.quad.display();
    this.scene.popMatrix();

    //back
    this.scene.pushMatrix();
    this.scene.mapBack.apply();
    this.scene.translate(0, 0, -0.5);
    this.quad.display();
    this.scene.popMatrix();

    //left
    this.scene.pushMatrix();
    this.scene.mapLeft.apply();
    this.scene.translate(0.5, 0, 0);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.quad.display();
    this.scene.popMatrix();

    //right
    this.scene.pushMatrix();
    this.scene.mapRight.apply();
    this.scene.translate(-0.5, 0, 0);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.quad.display();
    this.scene.popMatrix();

    //top
    this.scene.mapTop.apply();
    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

    this.scene.pushMatrix();
    this.scene.translate(0, 0.5, 0);
    this.scene.rotate(Math.PI/2, 1, 0, 0);
    this.scene.rotate(Math.PI, 0, 0, 1);
    this.quad.display();
    this.scene.popMatrix();

    //bottom
    this.scene.mapBottom.apply();
    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

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
