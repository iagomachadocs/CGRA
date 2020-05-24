/** Represents a plane with nrDivs divisions along both axis, with center at (0,0) */
class MyPlaneFlag extends CGFobject {
  constructor(scene, nrDivs, minS, maxS, minT, maxT) {
    super(scene);
    nrDivs = typeof nrDivs !== "undefined" ? nrDivs : 1;
    this.nrDivs = nrDivs;
    this.patchLength = 1.0 / nrDivs;
    this.minS = minS || 0;
    this.maxS = maxS || 1;
    this.minT = minT || 0;
    this.maxT = maxT || 1;
    this.q = (this.maxS - this.minS) / this.nrDivs;
    this.w = (this.maxT - this.minT) / this.nrDivs;
    this.verticePerFace = Math.pow(this.nrDivs + 1, 2) - 1;
    this.initBuffers();
  }
  initBuffers() {
    // Generate vertices, normals, and texCoords
    this.vertices = [];
    this.normals = [];
    this.texCoords = [];

    var yCoord = 0.5;
    for (var j = 0; j <= (this.nrDivs + 1) * 2; j++) {
      var xCoord = -0.5;
      for (var i = 0; i <= this.nrDivs; i++) {
        this.vertices.push(xCoord, yCoord, 0);
        if (j <= this.nrDivs) {
          this.normals.push(0, 0, 1);
          this.texCoords.push(this.minS + i * this.q, this.minT + j * this.w);
        } else {
          this.normals.push(0, 0, -1);
          this.texCoords.push(
            1 - (this.minS + i * this.q),
            this.minT + (j - this.nrDivs - 1) * this.w
          );
        }
        xCoord += this.patchLength;
      }
      if (j == this.nrDivs) yCoord = 0.5;
      else yCoord -= this.patchLength;
    }

    // Generating indices
    this.indices = [];

    var ind = 0;
    for (var j = 0; j < this.nrDivs; j++) {
      for (var i = 0; i < this.nrDivs; i++) {
        this.indices.push(i, (j + 1) * (this.nrDivs + 1) + i, i + 1);
        this.indices.push(
          (j + 1) * (this.nrDivs + 1) + i,
          (j + 1) * (this.nrDivs + 1) + i + 1,
          i + 1
        );
      }
    }

    ind = this.verticePerFace + 1;
    for (var j = 0; j < this.nrDivs; j++) {
      for (var i = 0; i < this.nrDivs; i++) {
        this.indices.push(
          ind + (j + 1) * (this.nrDivs + 1) + i,
          ind + i,
          ind + i + 1
        );
        this.indices.push(
          ind + (j + 1) * (this.nrDivs + 1) + i + 1,
          ind + (j + 1) * (this.nrDivs + 1) + i,
          ind + i + 1
        );
      }
    }
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }

  setFillMode() {
    this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
  }

  setLineMode() {
    this.primitiveType = this.scene.gl.LINES;
  }
}
