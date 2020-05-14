/**
 * MyVehicle
 * @constructor
 */
class MyVehicle extends CGFobject {
  constructor(scene) {
    super(scene);
    this.egg = new MyEgg(scene);
    this.cylinder = new MyCylinder(scene, 20);
    this.sphere = new MySphere(scene, 16, 8);
    this.hemisphere = new MyHemisphere(scene);
    this.triangle = new MyTriangle(scene);
    this.square = new MySquare(scene);

    this.reset();
  }

  display() {
    // this.scene.earth.apply();

    //Main body - balloon
    this.scene.pushMatrix();
    this.scene.translate(this.position[0], this.position[1], this.position[2]);
    this.scene.rotate(this.yyOrientation, 0, 1, 0);
    this.egg.display();

    //Compartment
    this.scene.pushMatrix();
    this.scene.translate(0, -1, -0.5);
    this.scene.scale(0.2, 0.2, 0.2);

    this.scene.pushMatrix();
    this.scene.scale(1, 1, 5);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.cylinder.display();
    this.scene.popMatrix();

    this.hemisphere.display();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, 5);
    this.scene.rotate(Math.PI, 1, 0, 0);
    this.hemisphere.display();
    this.scene.popMatrix();

    //Compartment's helixes
    //Left
    this.scene.pushMatrix();
    this.scene.translate(1, -0.2, -0.2);
    this.scene.scale(0.2, 0.2, 0.2);

    this.scene.pushMatrix();
    this.scene.scale(1, 1.5, 2.0);
    this.egg.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, -4);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.rotate(this.helixRotation, 0, 1, 0);
    this.scene.scale(1, 0, 1);
    this.egg.display();

    this.scene.popMatrix();
    this.scene.popMatrix();

    //Right
    this.scene.pushMatrix();
    this.scene.translate(-1, -0.2, -0.2);
    this.scene.scale(0.2, 0.2, 0.2);

    this.scene.pushMatrix();
    this.scene.scale(1, 1.5, 2.0);
    this.egg.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, -4);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.scene.rotate(this.helixRotation, 0, 1, 0);
    this.scene.scale(1, 0, 1);
    this.egg.display();

    this.scene.popMatrix();
    this.scene.popMatrix();

    this.scene.popMatrix();

    //Tails
    //Right
    this.scene.pushMatrix();
    this.scene.translate(-1, 0, -2);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.square.display();
    this.scene.translate(1, 0, 0);
    this.triangle.display();
    this.scene.popMatrix();

    //Left
    this.scene.pushMatrix();
    this.scene.translate(1, 0, -2);
    this.scene.rotate(Math.PI, 0, 0, 1);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.square.display();
    this.scene.translate(1, 0, 0);
    this.triangle.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(this.tailRotation, 0, 1, 0);

    if (!this.autoPilot) this.tailRotation = this.tailRotation / 1.05 ;

    //Up
    this.scene.pushMatrix();
    this.scene.translate(0, 1, -2);
    this.scene.rotate(-Math.PI / 2, 0, 0, 1);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.square.display();
    this.scene.translate(1, 0, 0);
    this.triangle.display();
    this.scene.popMatrix();

    //Down
    this.scene.pushMatrix();
    this.scene.translate(0, -1, -2);
    this.scene.rotate(-Math.PI / 2, 0, 0, 1);
    this.scene.rotate(Math.PI, 0, 0, 1);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.square.display();
    this.scene.translate(1, 0, 0);
    this.triangle.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
    this.scene.popMatrix();
  }

  update(t) {
    if (!this.autoPilot) {
      //normal
      this.position[0] += Math.sin(this.yyOrientation) * this.velocity;
      this.position[2] += Math.cos(this.yyOrientation) * this.velocity;

      this.helixRotation += 0.5 * this.velocity;
      this.helixRotation %= 2 * Math.PI;
    } else {
      //autopilot
      this.previousTIme = this.currentTime;
      this.currentTime = t;
      this.deltaT = (this.currentTime - this.previousTIme) / 1000;
      this.deltaAngle = (this.deltaT * this.angularSpeed) % (2 * Math.PI);

      this.initialAngle = this.yyOrientation + Math.PI;

      this.position[0] = this.center[0] + Math.cos(this.initialAngle) * 5;
      this.position[2] = this.center[2] + Math.sin(this.yyOrientation) * 5;

      this.yyOrientation += this.deltaAngle;
      this.yyOrientation %= 2 * Math.PI;

      this.helixRotation += Math.PI / 8;
      this.helixRotation %= 2 * Math.PI;
    }
  }

  turn(val) {
    if (!this.autoPilot) {
      this.yyOrientation += val;
      this.yyOrientation %= 2 * Math.PI;

      if (val > 0) {
        this.tailRotation = Math.PI / 16;
      } else {
        this.tailRotation = -Math.PI / 16;
      }
    }
  }

  accelerate(val) {
    if (!this.autoPilot) {
      this.velocity += val;
      if (this.velocity < 0) {
        this.velocity = 0;
      }
    }
  }

  ToggleAutoPilot(t) {
    if (!this.autoPilot) {
      this.initialAngle = this.yyOrientation + Math.PI;

      this.currentTime = t;

      this.center = [
        this.position[0] - Math.cos(this.initialAngle) * 5,
        this.position[1],
        this.position[2] - Math.sin(this.yyOrientation) * 5,
      ];

      this.tailRotation = Math.PI / 16;

      this.autoPilot = true;
    } else {
      this.velocity = 0;
      this.helixRotation = 0;
      this.autoPilot = false;
    }
  }

  reset() {
    this.yyOrientation = 0;
    this.velocity = 0;
    this.position = [0, 25, 0];
    this.helixRotation = 0;
    this.tailRotation = 0;
    this.autoPilot = false;
    this.angularSpeed = (2 * Math.PI) / 5;
  }
}
