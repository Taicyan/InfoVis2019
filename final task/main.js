function main()
{
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();
    
    screen.init( volume, {
        width: window.innerWidth,
        height: window.innerHeight,
        enableAutoResize: false
    });
    
    
    //outline object
    var bounds = Bounds( volume );
    screen.scene.add( bounds );
    var isovalue = 128;
    //default surface
    var surfaces = Isosurfaces( volume, isovalue, 'Phong', '#ffffff', 1.0 );
    screen.scene.add( surfaces );
    
    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth, window.innerHeight ] );
    });
    
    screen.loop();
    
    
    var DefaultSquare = function() {
        this.Color = "#ffffff";
        this.Opacity = 1;
        this.Reflection = 'Phong';
    };    
    
    window.onload = function() {
    square = new DefaultSquare();
    var gui = new dat.GUI();
    gui.addColor(square, 'Color').onFinishChange(setValue);
    gui.add(square, 'Opacity', 0, 1.0).step(0.01).onFinishChange(setValue);
    gui.add(square, 'Reflection', [ 'Phong', 'Lambertian' ]).onFinishChange(setValue);
	gui.add(square, '')

    };
    
    function setValue() 
    {
        screen.scene.remove(surfaces);
        surfaces = Isosurfaces( volume, 128, square.Reflection, square.Color, square.Opacity);
        screen.scene.add(surfaces);
    }
}
