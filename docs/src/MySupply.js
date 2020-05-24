/**
 * MySupply
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MySupply extends CGFobject {

  constructor(scene) {
    super(scene);

    this.SupplyStates = {
      INACTIVE:0,
      FALLING:1,
      LANDED:2
    };
    
    this.quad = new MyQuad(scene);
    
    this.reset();
  }

  display() {
    if(this.state == this.SupplyStates.FALLING){
      this.displayFalling();
    } else if(this.state == this.SupplyStates.LANDED){
      this.displayLanded();
    }
  }

  displayFalling() {
    this.scene.pushMatrix();
    this.scene.translate(this.position[0], this.position[1], this.position[2]);

    //front
    this.scene.box.apply();

    this.scene.pushMatrix();
    this.scene.translate(0, 0.5, 0.5);
    this.quad.display();
    this.scene.popMatrix();

    //back
    this.scene.pushMatrix();
    this.scene.translate(0, 0.5, -0.5);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.quad.display();
    this.scene.popMatrix();

    //right
    this.scene.pushMatrix();
    this.scene.translate(0.5, 0.5, 0);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.quad.display();
    this.scene.popMatrix();

    //left
    this.scene.pushMatrix();
    this.scene.translate(-0.5, 0.5, 0);
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
    this.scene.translate(this.position[0], 0.01, this.position[2]);
    this.scene.box.apply();

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
    if(this.state == this.SupplyStates.FALLING) {
      if(this.previousTime == 0){
        this.currentTime = t;
      }
      this.previousTime = this.currentTime;
      this.currentTime = t;
      this.deltaTime = (this.currentTime - this.previousTime) / 1000;
      this.deltaDistance = this.deltaTime * this.speed;
      this.position[1] = this.position[1] - this.deltaDistance;
      
      this.land()
    }
  }

  drop(dropPosition){
    this.position = [dropPosition[0], 9.5, dropPosition[2]];
    this.speed = this.position[1]/3;
    this.state = this.SupplyStates.FALLING;
  }

  land(){
    if(this.position[1] <= 0) {
      this.state = this.SupplyStates.LANDED;
    } 
  }

  reset() {
    this.previousTime = 0;
    this.state = this.SupplyStates.INACTIVE;
    this.position = [0,9.5,0];
    this.speed = 0;
  }

  enableNormalViz() {
    this.quad.enableNormalViz();
  }

  disableNormalViz() {
    this.quad.disableNormalViz();
  }
}
