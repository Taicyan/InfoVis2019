function main()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );

    var light = new THREE.PointLight();
    light.position.set( 5, 5, 5 );
    scene.add( light );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var vertices = [
    [-0.5,-0.5,-0.5],
    [0.5,-0.5,-0.5],
    [-0.5,0.5,-0.5],
    [0.5,0.5,-0.5],
    [-0.5,-0.5,0.5],
    [0.5,-0.5,0.5],
    [-0.5,0.5,0.5],
    [0.5,0.5,0.5],
    ];
    
    var faces = [
    [0,2,1],
    [3,1,2],
    [0,1,4],
    [5,4,1],
    [5,1,7],
    [3,7,1],
    [7,3,6],
    [2,6,3],
    [4,5,6],
    [7,6,5],
    [4,6,0],
    [2,0,6]
    ];


    var geometry = new THREE.Geometry();
    var material = new THREE.MeshLambertMaterial();

    var nvertices = vertices.length;
    for ( var i = 0; i < nvertices; i++ )
    {
        var vertex = new THREE.Vector3().fromArray( vertices[i] );
        geometry.vertices.push( vertex );
    }

    var nfaces = faces.length;
    for ( var i = 0; i < nfaces; i++ )
    {
        var id = faces[i];
        var face = new THREE.Face3( id[0], id[1], id[2] );
        geometry.faces.push( face );
    }

  material.vertexColors = THREE.FaceColors;
  for ( var i = 0; i < nfaces; i++ )
  {
    geometry.faces[i].color = new THREE.Color( 1, 1, 1 );
  }
    
 
    geometry.computeFaceNormals();

    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

  document.addEventListener( 'mousedown', mouse_down_event );
  function mouse_down_event( event ){
 
    var x_win = event.clientX;
    var y_win = event.clientY;
    var vx = renderer.domElement.offsetLeft;
    var vy = renderer.domElement.offsetTop;
    var vw = renderer.domElement.width;
    var vh = renderer.domElement.height;
    var x_NDC = 2 * (x_win - vx)/vw -1;
    var y_NDC = -(2 * (y_win - vy)/vh - 1);
    
    var p_NDC = new THREE.Vector3( x_NDC, y_NDC, 1 );
    var p_wld = p_NDC.unproject( camera );
    var origin = camera.position;
    var direction = p_wld.sub(camera.position).normalize();
 
    var raycaster = new THREE.Raycaster(origin,direction);
    var intersects = raycaster.intersectObject(cube);
    if ( intersects.length > 0 )
    {
      //console.log(x_NDC);
      //console.log(y_NDC);
     
      intersects[0].face.color.setRGB( 1, 0, 0 );
      intersects[0].object.geometry.colorsNeedUpdate = true;
    
    }
  }

    

    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        cube.rotation.x += 0.025;
        cube.rotation.y += 0.015;
        renderer.render( scene, camera );
    }
}