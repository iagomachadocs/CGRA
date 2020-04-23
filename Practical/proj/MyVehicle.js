/**
 * MyVehicle
 * @constructor
 */
class MyVehicle extends CGFobject {
  constructor(scene) {
    super(scene);
    this.slices = 3;
    this.stacks = 0;
    this.reset();
    this.initBuffers();
  }
  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];

    var ang = 0;
    var alphaAng = (2 * Math.PI) / this.slices;

    for (var i = 0; i < this.slices; i++) {
      // All vertices have to be declared for a given face
      // even if they are shared with others, as the normals
      // in each face will be different

      var sa = Math.sin(ang);
      var saa = Math.sin(ang + alphaAng);
      var ca = Math.cos(ang);
      var caa = Math.cos(ang + alphaAng);

      this.vertices.push(0, 0, 1);
      this.vertices.push(ca, sa, 0);
      this.vertices.push(caa, saa, 0);

      // triangle normal computed by cross product of two edges
      var normal = [saa - sa, ca * saa - sa * caa, caa - ca];

      // normalization
      var nsize = Math.sqrt(
        normal[0] * normal[0] + normal[1] * normal[1] + normal[2] * normal[2]
      );
      normal[0] /= nsize;
      normal[1] /= nsize;
      normal[2] /= nsize;

      // push normal once for each vertex of this triangle
      this.normals.push(...normal);
      this.normals.push(...normal);
      this.normals.push(...normal);

      this.indices.push(3 * i, 3 * i + 1, 3 * i + 2);

      ang += alphaAng;
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }

  display() {
    // this.scene.translate(
    //   -this.position[0],
    //   -this.position[1],
    //   -this.position[2]
    // );

    this.scene.pushMatrix();
    this.update();
    this.scene.translate(this.position[0], this.position[1], this.position[2]);
    this.scene.rotate(this.yyOrientation, 0, 1, 0);
    super.display();
    this.scene.popMatrix();
  }

  updateBuffers(complexity) {
    this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

    // reinitialize buffers
    this.initBuffers();
    this.initNormalVizBuffers();
  }

  update() {
    this.position[0] += Math.sin(this.yyOrientation) * this.velocity;
    this.position[2] += Math.cos(this.yyOrientation) * this.velocity;
    // console.log(
    //   this.position[0] + " " + this.position[1] + " " + this.position[2]
    // );
  }

  turn(val) {
    this.yyOrientation += val;
    this.yyOrientation %= 2 * Math.PI;
  }

  accelerate(val) {
    this.velocity += val;
    if (this.velocity < 0) {
      this.velocity = 0;
    }
  }

  reset() {
    this.yyOrientation = 0;
    this.velocity = 0;
    this.position = [0, 0, 0];
  }
}
