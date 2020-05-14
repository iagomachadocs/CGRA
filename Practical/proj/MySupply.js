/**
 * MySupply
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MySupply extends CGFobject {

  constructor(scene) {
    super(scene);
    
    this.quad = new MyQuad(scene);
    this.state = SupplyStates.INACTIVE;
    
    this.reset();
  }

  display() {
    if(this.state == SupplyStates.FALLING){
      this.displayFalling();
    } else if(this.state == SupplyStates.LANDED){
      this.displayLanded();
    }
  }

  displayFalling() {
    this.scene.pushMatrix();
    this.scene.translate(this.position[0], this.position[1], this.position[2]);

    //front
    this.scene.box.apply();
    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0.5);
    this.quad.display();
    this.scene.popMatrix();

    //back
    this.scene.pushMatrix();
    this.scene.translate(0, 0, -0.5);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.quad.display();
    this.scene.popMatrix();

    //right
    this.scene.pushMatrix();
    this.scene.translate(0.5, 0, 0);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.quad.display();
    this.scene.popMatrix();

    //left
    this.scene.pushMatrix();
    this.scene.translate(-0.5, 0, 0);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.quad.display();
    this.scene.popMatrix();

    //top
    this.scene.pushMatrix();
    this.scene.translate(0, 1, 0);
    this.scene.rotate(-Math.PI/2, 1, 0, 0);
    this.quad.display();
    this.scene.popMatrix();

    //bottom
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI/2, 1, 0, 0);
    this.quad.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
  }

  displayLanded() {
    this.scene.pushMatrix();
    this.scene.translate(this.position[0], this.position[1], this.position[2]);

    //bottom
    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI/2, 1, 0, 0);
    this.quad.display();
    this.scene.popMatrix();

    //left
    this.scene.pushMatrix();
    this.scene.translate(-1, 0, 0);
    this.scene.rotate(-Math.PI/2, 1, 0, 0);
    this.quad.display();
    this.scene.popMatrix();

    //right
    this.scene.pushMatrix();
    this.scene.translate(1, 0, 0);
    this.scene.rotate(-Math.PI/2, 1, 0, 0);
    this.quad.display();
    this.scene.popMatrix();

    //front
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 1);
    this.scene.rotate(-Math.PI/2, 1, 0, 0);
    this.quad.display();
    this.scene.popMatrix();

    //back
    this.scene.pushMatrix();
    this.scene.translate(0, 0, -1);
    this.scene.rotate(-Math.PI/2, 1, 0, 0);
    this.quad.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
  }

  update(t) {
    if(this.state == SupplyStates.FALLING) {
      
      this.previousTime = this.currentTime;
      this.currentTime = t;
      this.deltaTime = (this.currentTime - this.previousTime) / 1000;
      this.deltaDistance = this.deltaTime * this.speed;
      this.position[1] = this.position[1] - this.deltaDistance;
      
      this.land()
    }
  }

  drop(dropPosition){
    this.position = dropPosition;
    this.speed = this.position[1]/3;
    this.state = SupplyStates.FALLING;
  }

  land(){
    if(this.position[1] == 0) {
      this.state = SupplyStates.LANDED;
    } 
  }

  reset() {
    this.position = [0,0,0];
    this.speed = 0;
    this.state = SupplyStates.INACTIVE;
  }

  enableNormalViz() {
    this.quad.enableNormalViz();
  }

  disableNormalViz() {
    this.quad.disableNormalViz();
  }
}

const SupplyStates = {
  INACTIVE:0,
  FALLING:1,
  LANDED:2
};
