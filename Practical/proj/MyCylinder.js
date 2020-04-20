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
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){

            var sa=Math.sin(ang);
            var ca=Math.cos(ang);

            this.vertices.push(ca,0,-sa);
            this.vertices.push(ca,1,-sa);

            this.normals.push(ca,0,-sa);
            this.normals.push(ca,1,-sa);

            ang+=alphaAng;
        }
        
        for(var i = 0; i < this.slices; i++){
            this.indices.push(2*i, (2*i+2)%(2*this.slices), (2*i+1)%(2*this.slices));
            this.indices.push((2*i+2)%(2*this.slices), (2*i+3)%(2*this.slices), (2*i+1)%(2*this.slices));

            this.indices.push((2*i+1)%(2*this.slices), (2*i+2)%(2*this.slices), 2*i);
            this.indices.push((2*i+1)%(2*this.slices), (2*i+3)%(2*this.slices), (2*i+2)%(2*this.slices));
        }


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}


