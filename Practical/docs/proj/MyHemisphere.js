/**
 * MyHemisphere
 * @constructor
 */
class MyHemisphere extends CGFobject {
  constructor(scene) {
    super(scene);
    this.slices = 20;
    this.initBuffers();
  }
  initBuffers() {
    this.latDivs = 20;
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

    var phiS = 0;
    var thetaS = 0;
    var phiIncS = Math.PI / this.latDivs;
    var thetaIncS = (2 * Math.PI) / this.longDivs;
    var latVerticesS = this.longDivs + 1;

    // build an all-around stack at a time, starting on "north pole" and proceeding "south"
    for (let latitude = 0; latitude <= this.latDivs / 2; latitude++) {
      var sinPhiS = Math.sin(phiS);
      var cosPhiS = Math.cos(phiS);

      // in each stack, build all the slices around, starting on longitude 0
      thetaS = 0;
      for (let longitude = 0; longitude <= this.longDivs; longitude++) {
        //--- Vertices coordinates
        var x = Math.cos(thetaS) * sinPhiS;
        var y = Math.sin(-thetaS) * sinPhiS;
        var z = -cosPhiS;
        this.vertices.push(x, y, z);

        //--- Indices
        if (latitude < this.latDivs && longitude < this.longDivs) {
          var current = latitude * latVerticesS + longitude;
          var next = current + latVerticesS;
          // pushing two triangles using indices from this round (current, current+1)
          // and the ones directly south (next, next+1)
          // (i.e. one full round of slices ahead)

          this.indices.push(current + 1, current, next);
          this.indices.push(current + 1, next, next + 1);
        }

        //--- Normals
        // at each vertex, the direction of the normal is equal to
        // the vector from the center of the sphere to the vertex.
        // in a sphere of radius equal to one, the vector length is one.
        // therefore, the value of the normal is equal to the position vectro
        this.normals.push(x, y, z);
        thetaS += thetaIncS;

        //--- Texture Coordinates
        // To be done...
        // May need some additional code also in the beginning of the function.

        this.texCoords.push(longitude / this.longDivs, latitude / this.latDivs);
      }
      phiS += phiIncS;
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
    super.display();
  }
}
