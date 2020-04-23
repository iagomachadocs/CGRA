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

        this.quadMaterial = new CGFappearance(this);
        this.quadMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.quadMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.quadMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.quadMaterial.setShininess(10.0);

        // CubeMap Texture 1
        this.heavenLeft = new CGFappearance(this);
        this.heavenLeft.loadTexture('images/split_cubemap/left.png');
        this.heavenLeft.setTextureWrap('REPEAT', 'REPEAT');

        this.heavenRight = new CGFappearance(this);
        this.heavenRight.loadTexture('images/split_cubemap/right.png');
        this.heavenRight.setTextureWrap('REPEAT', 'REPEAT');
        
        this.heavenBottom = new CGFappearance(this);
        this.heavenBottom.loadTexture('images/split_cubemap/bottom.png');
        this.heavenBottom.setTextureWrap('REPEAT', 'REPEAT');

        this.heavenTop = new CGFappearance(this);
        this.heavenTop.loadTexture('images/split_cubemap/top.png');
        this.heavenTop.setTextureWrap('REPEAT', 'REPEAT');

        this.heavenFront = new CGFappearance(this);
        this.heavenFront.loadTexture('images/split_cubemap/front.png');
        this.heavenFront.setTextureWrap('REPEAT', 'REPEAT');

        this.heavenBack = new CGFappearance(this);
        this.heavenBack.loadTexture('images/split_cubemap/back.png');
        this.heavenBack.setTextureWrap('REPEAT', 'REPEAT');

        //CubeMap Texture 2
        this.hellLeft = new CGFappearance(this);
        this.hellLeft.loadTexture('images/split2_cubemap/left.png');
        this.hellLeft.setTextureWrap('REPEAT', 'REPEAT');

        this.hellRight = new CGFappearance(this);
        this.hellRight.loadTexture('images/split2_cubemap/right.png');
        this.hellRight.setTextureWrap('REPEAT', 'REPEAT');
        
        this.hellBottom = new CGFappearance(this);
        this.hellBottom.loadTexture('images/split2_cubemap/bottom.png');
        this.hellBottom.setTextureWrap('REPEAT', 'REPEAT');

        this.hellTop = new CGFappearance(this);
        this.hellTop.loadTexture('images/split2_cubemap/top.png');
        this.hellTop.setTextureWrap('REPEAT', 'REPEAT');

        this.hellFront = new CGFappearance(this);
        this.hellFront.loadTexture('images/split2_cubemap/front.png');
        this.hellFront.setTextureWrap('REPEAT', 'REPEAT');

        this.hellBack = new CGFappearance(this);
        this.hellBack.loadTexture('images/split2_cubemap/back.png');
        this.hellBack.setTextureWrap('REPEAT', 'REPEAT');

        this.earth = new CGFappearance(this);
        this.earth.loadTexture("images/earth.jpg");
        this.earth.setTextureWrap("REPEAT", "REPEAT");
        this.earth.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.earth.setAmbient(1.0, 1.0, 1.0, 1.0);

        // this.earthTexture = new CGFtexture(this, 'images/earth.jpg');
        // this.earth.setTexture(this.earthTexture);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.Sphere = new MySphere(this, 16, 8);
        this.cylinder = new MyCylinder(this, 10);
        this.cubeMap = new MyUnitCubeMap(this);
        this.Vehicle = new MyVehicle(this);

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.scaleFactor = 1;

        this.materialCubeMap1 = [this.heavenLeft, this.heavenRight, this.heavenFront, this.heavenBack, this.heavenTop, this.heavenBottom];
        this.materialCubeMap2 = [this.hellLeft, this.hellRight, this.hellFront, this.hellBack, this.hellTop, this.hellBottom]; 
        this.materials = [this.materialCubeMap1, this.materialCubeMap2];

        this.materialIds = { 'Heaven': 0, 'Hell': 1};
        this.selectedMaterial = 0;
        this.updateAppliedMaterial();
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    // called periodically (as per setUpdatePeriod() in init())
    update(t) {
        this.checkKeys();
    }

    
    checkKeys() {
        var text = "Keys pressed: ";
        var keysPressed = false;
        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
        //   text += " W ";
        //   keysPressed = true;

        this.Vehicle.accelerate(0.01);
        }
        if (this.gui.isKeyPressed("KeyS")) {
        //   text += " S ";
        //   keysPressed = true;

        this.Vehicle.accelerate(-0.01);
        }
        if (this.gui.isKeyPressed("KeyA")) {
            // text += " A ";
            // keysPressed = true;
    
            this.Vehicle.turn(0.01);
        }
        if (this.gui.isKeyPressed("KeyD")) {
            // text += " D ";
            // keysPressed = true;
    
            this.Vehicle.turn(-0.01);
        }
        if (this.gui.isKeyPressed("KeyR")) {
            // text += " R ";
            // keysPressed = true;
    
            this.Vehicle.reset();
        }
        // if (keysPressed) {
        //   console.log(text);
        // }
    }

    updateAppliedMaterial() {
        var m = this.materials[this.selectedMaterial];
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

        this.update();
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        var sca = [this.scaleFactor, 0.0, 0.0, 0.0,
          0.0, this.scaleFactor, 0.0, 0.0,
          0.0, 0.0, this.scaleFactor, 0.0,
          0.0, 0.0, 0.0, 1.0];
    
        this.multMatrix(sca);

        // ---- BEGIN Primitive drawing section
        // this.earth.apply();
        // this.cylinder.display();
        // this.Sphere.display();
        this.Vehicle.display();
    
        this.cubeMap.display();

        // ---- END Primitive drawing section
    }
}