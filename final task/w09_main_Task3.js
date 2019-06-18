function main()
{
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();

    screen.init( volume, {
        width: window.innerWidth,
        height: window.innerHeight,
		targetDom: document.getElementById('display'),
        enableAutoResize: false
    });

    var bounds = Bounds( volume );
    screen.scene.add( bounds );
    var isovalue = 128;
	var surfaces = Isosurfaces( volume, isovalue, 'Gouraud', 'Phong', '#ff0000', 1.0 );
    screen.scene.add( surfaces );

    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth, window.innerHeight ] );
    });

    screen.loop();

    var DefaultSquare = function() {
        this.Color = "#ff0000";
        //Reflection config
		this.Isovalue = 128;
        this.Reflection = 'Phong';
        //Shader config
        this.Shader = 'Gouraud';
    };    

	window.onload = function() {
	    square = new DefaultSquare();
	    var gui = new dat.GUI();
	    gui.addColor(square, 'Color').onFinishChange(setValue);
	    gui.add(square, 'Reflection', [ 'Phong', 'Lambertian', 'Blinn-Phong', 'Cook-Torrance', 'Toon' ] ).onFinishChange(setValue);
		gui.add(square, 'Isovalue', 0, 255).step(1).onFinishChange(setValue);
	    gui.add(square, 'Shader', [ 'Gouraud', 'Phong' ] ).onFinishChange(setValue);
	    };

 function setValue() 
    {
        screen.scene.remove(surfaces);
        surfaces = Isosurfaces( volume, square.Isovalue, square.Shader, square.Reflection, square.Color);
        screen.scene.add(surfaces);
    }
}
