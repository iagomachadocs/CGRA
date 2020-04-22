/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        //Dropdown for materials
        this.gui.add(this.scene, 'selectedMaterial', this.scene.materialIds).name('Selected Texture').onChange(this.scene.updateAppliedMaterial.bind(this.scene));

        return true;
    }
}