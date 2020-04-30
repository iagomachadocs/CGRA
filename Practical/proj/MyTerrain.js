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
        this.scene.pushMatrix();
        this.scene.translate(0, -24.9, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(50,50,50);
        this.plane.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}
