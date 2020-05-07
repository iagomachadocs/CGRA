/**
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object
 * TODO: Fix max height at shaders
 */
class MyTerrain extends CGFobject {
	constructor(scene) {
        super(scene);
        this.plane = new MyPlane(scene, 20);
		this.initBuffers();
	}
	
	initBuffers() {
        this.scene.appearance = new CGFappearance(this.scene);
        this.scene.appearance.setAmbient(1, 1, 1, 1);
        this.scene.appearance.setDiffuse(0, 0, 0, 1);
        this.scene.appearance.setSpecular(0, 0, 0, 1);
        
        this.scene.terrainShader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.scene.heightmapTexture = new CGFtexture(this.scene, "images/heightmap.jpg");
        this.scene.terrainTexture = new CGFtexture(this.scene, "images/terrain.jpg");
        this.scene.terrainShader.setUniformsValues({ uSampler2: 1, maxHeight: 8.0 });

        this.scene.appearance.setTexture(this.scene.heightmapTexture);
    }
    
    display(){
        this.scene.appearance.apply();
        this.scene.setActiveShader(this.scene.terrainShader);
        this.scene.terrainTexture.bind(1);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.pushMatrix();
        this.scene.translate(0,-24, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(50,50,1);
        this.plane.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}
