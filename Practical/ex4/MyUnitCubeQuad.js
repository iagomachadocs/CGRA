/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeQuad extends CGFobject {
  constructor(scene) {
    super(scene);

    this.quad = new MyQuad(scene);
  }

  display() {
    //front
    
    this.scene.mineSide.apply();
    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0.5);
    this.quad.display();
    this.scene.popMatrix();

    //back
    this.scene.pushMatrix();
    // this.scene.mineSide.apply();
    this.scene.translate(0, 0, -0.5);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.quad.display();
    this.scene.popMatrix();

    //right
    this.scene.pushMatrix();
    // this.scene.mineSide.apply();
    this.scene.translate(0.5, 0, 0);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.quad.display();
    this.scene.popMatrix();

    //left
    this.scene.pushMatrix();
    // this.scene.mineSide.apply();
    this.scene.translate(-0.5, 0, 0);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.quad.display();
    this.scene.popMatrix();

    //top
    this.scene.mineTop.apply();
    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

    this.scene.pushMatrix();
    this.scene.translate(0, 0.5, 0);
    this.scene.rotate(-Math.PI/2, 1, 0, 0);
    this.quad.display();
    this.scene.popMatrix();

    //bottom
    this.scene.mineBottom.apply();
    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

    this.scene.pushMatrix();
    this.scene.translate(0, -0.5, 0);
    this.scene.rotate(Math.PI/2, 1, 0, 0);
    this.quad.display();
    this.scene.popMatrix();
  }

  enableNormalViz() {
    this.quad.enableNormalViz();
  }

  disableNormalViz() {
    this.quad.disableNormalViz();
  }
}
