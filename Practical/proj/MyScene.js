/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        this.box = new CGFappearance(this);
        this.box.loadTexture('images/box.jpg');
        this.box.setTextureWrap('REPEAT', 'REPEAT');

        // Default Appearance
        this.defaultAppearance = new CGFappearance(this);
        this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setShininess(10.0);

        // CubeMap Material
        this.cubeMapMaterial = new CGFappearance(this);
        this.cubeMapMaterial.setAmbient(1, 1, 1, 1);
        this.cubeMapMaterial.setDiffuse(0, 0, 0, 1);
        this.cubeMapMaterial.setSpecular(0, 0, 0, 1);
        this.cubeMapMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.cubeMapMaterial.setEmission(0.5, 0.5, 0.5, 1);
        
        // CubeMap Texture 1
        this.heavenLeft = new CGFtexture(this, "images/split_cubemap/left.png");
        this.heavenRight = new CGFtexture(this, "images/split_cubemap/right.png");
        this.heavenBottom = new CGFtexture(this, "images/split_cubemap/bottom.png");
        this.heavenTop = new CGFtexture(this, "images/split_cubemap/top.png");
        this.heavenFront = new CGFtexture(this, "images/split_cubemap/front.png");
        this.heavenBack = new CGFtexture(this, "images/split_cubemap/back.png");

        //CubeMap Texture 2
        this.hellLeft = new CGFtexture(this, "images/split2_cubemap/left.png");
        this.hellRight = new CGFtexture(this, "images/split2_cubemap/right.png");
        this.hellBottom = new CGFtexture(this, "images/split2_cubemap/bottom.png");
        this.hellTop = new CGFtexture(this, "images/split2_cubemap/top.png");
        this.hellFront = new CGFtexture(this, "images/split2_cubemap/front.png");
        this.hellBack = new CGFtexture(this, "images/split2_cubemap/back.png");

        this.earth = new CGFappearance(this);
        this.earth.loadTexture("images/earth.jpg");
        this.earth.setTextureWrap("REPEAT", "REPEAT");
        this.earth.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.earth.setAmbient(1.0, 1.0, 1.0, 1.0);


        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.sphere = new MySphere(this, 16, 8);
        this.cylinder = new MyCylinder(this, 20);
        this.cubeMap = new MyUnitCubeMap(this);
        this.vehicle = new MyVehicle(this);
        this.terrain = new MyTerrain(this);
        this.billboard = new MyBillboard(this);
        
        this.supply1 = new MySupply(this);
        this.supply2 = new MySupply(this);
        this.supply3 = new MySupply(this);
        this.supply4 = new MySupply(this);
        this.supply5 = new MySupply(this);
        this.supplies = [this.supply1, this.supply2, this.supply3, this.supply4, this.supply5];
        this.nSuppliesDelivered = 0;

        //Objects connected to MyInterface
        this.displayAxis = false;
        this.scaleFactor = 1;
        this.selectedObject = 2;
        this.speedFactor = 1;

        this.objects = [this.sphere, this.cylinder, this.vehicle];

        // Labels and ID's for object selection on MyInterface
        this.objectIDs = { 'Sphere': 0, 'Cylinder': 1, 'Vehicle': 2};

        this.textureCubeMap1 = [this.heavenLeft, this.heavenRight, this.heavenFront, this.heavenBack, this.heavenTop, this.heavenBottom];
        this.textureCubeMap2 = [this.hellLeft, this.hellRight, this.hellFront, this.hellBack, this.hellTop, this.hellBottom]; 
        this.textures = [this.textureCubeMap1, this.textureCubeMap2];

        this.textureIds = { 'Heaven': 0, 'Hell': 1};
        this.selectedTexture = 0;
        this.updateAppliedTexture();

        // set the scene update period 
		// (to invoke the update() method every 50ms or as close as possible to that )
        this.setUpdatePeriod(50);
        this.camera.zoom(-30);
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 15, 0));
    }
    setDefaultAppearance() {
        this.defaultAppearance.apply()
    }
    // called periodically (as per setUpdatePeriod() in init())
    update(t) {
        this.checkKeys(t);
        this.vehicle.update(t);
        for(var i = 0; i < this.supplies.length; i++){
            this.supplies[i].update(t);
        }
        this.billboard.update(t);
    }

    
    checkKeys(t) {
        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
        this.vehicle.accelerate(0.01 * this.speedFactor);
        }
        if (this.gui.isKeyPressed("KeyS")) {
        this.vehicle.accelerate(-0.01 * this.speedFactor);
        }
        if (this.gui.isKeyPressed("KeyA")) {    
            this.vehicle.turn(0.05);
        }
        if (this.gui.isKeyPressed("KeyD")) {    
            this.vehicle.turn(-0.05);
        }
        if (this.gui.isKeyPressed("KeyR")) {            
            this.nSuppliesDelivered = 0;
            this.vehicle.reset();
            for(var i = 0; i < this.supplies.length; i++){
                this.supplies[i].reset();
            }
        }
        if (this.gui.isKeyPressed("KeyP")) {
            this.vehicle.ToggleAutoPilot(t);
        }
        if (this.gui.isKeyPressed("KeyL")) {
            if(this.nSuppliesDelivered < 5){
                this.supplies[this.nSuppliesDelivered].drop(this.vehicle.position);
                this.nSuppliesDelivered += 1;
            }
        }
    }

    updateObject(){
        this.objects[this.selectedObject];
    }

    updateAppliedTexture() {
        var m = this.textures[this.selectedTexture];
        this.mapLeft = m[0];
        this.mapRight = m[1];
        this.mapFront = m[2];
        this.mapBack = m[3];
        this.mapTop = m[4];
        this.mapBottom = m[5];
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
     
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        this.pushMatrix();
        var sca = [this.scaleFactor, 0.0, 0.0, 0.0,
          0.0, this.scaleFactor, 0.0, 0.0,
          0.0, 0.0, this.scaleFactor, 0.0,
          0.0, 0.0, 0.0, 1.0];
    
        this.multMatrix(sca);

        // ---- BEGIN Primitive drawing section
        this.objects[this.selectedObject].display();
        this.popMatrix();

        for(var i = 0; i < this.supplies.length; i++){
            this.supplies[i].display();
        }

        this.billboard.display();
        
        this.pushMatrix();
        this.translate(0, 10, 0);
        this.cubeMap.display();
        this.popMatrix();
        this.terrain.display();

        // ---- END Primitive drawing section
    }
}