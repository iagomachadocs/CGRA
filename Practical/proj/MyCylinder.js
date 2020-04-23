/**
 * MyCylinder
 * @constructor
 */
class MyCylinder extends CGFobject {
  constructor(scene, slices) {
    super(scene);
    this.slices = slices;
    this.initBuffers();
  }
  initBuffers() {
    this.latDivs = 1;
    this.longDivs = this.slices;

    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var phi = 0;
    var theta = 0;
    var phiInc = Math.PI / this.latDivs;
    var thetaInc = (2 * Math.PI) / this.longDivs;
    var latVertices = this.longDivs + 1;

    // build an all-around stack at a time, starting on "north pole" and proceeding "south"
    for (let latitude = 0; latitude <= this.latDivs; latitude++) {
      var cosPhi = this.latDivs - latitude;

      theta = 0;
      for (let longitude = 0; longitude <= this.longDivs; longitude++) {
        //--- Vertices coordinates
        var x = -Math.cos(theta);
        var y = cosPhi;
        var z = -Math.sin(-theta);
        this.vertices.push(x, y, z);

        //--- Indices
        if (latitude < this.latDivs && longitude < this.longDivs) {
          var current = latitude * latVertices + longitude;
          var next = current + latVertices;
          // pushing two triangles using indices from this round (current, current+1)
          // and the ones directly south (next, next+1)
          // (i.e. one full round of slices ahead)

          this.indices.push(current + 1, current, next);
          this.indices.push(current + 1, next, next + 1);

          this.indices.push(next, current, current + 1);
          this.indices.push(next + 1, next, current + 1);
        }

        //--- Normals
        this.normals.push(x, y, z);
        theta += thetaInc;

        //--- Texture Coordinates
        this.texCoords.push(longitude / this.longDivs, latitude / this.latDivs);
      }
      phi += phiInc;
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }

  updateBuffers(complexity) {
    this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

    // reinitialize buffers
    this.initBuffers();
    this.initNormalVizBuffers();
  }

  display() {
    this.scene.earth.apply();
    super.display();
  }
}
