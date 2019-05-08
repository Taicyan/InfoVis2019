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

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );
//insert
  var geometry = new THREE.Geometry();
  var material = new THREE.MeshLambertMaterial();

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
//insert
    var material = new THREE.MeshLambertMaterial({
            color: 0x00ffff
    });
   material.side = THREE.DoubleSide;
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    var light = new THREE.PointLight(0xffffff);
    light.position.set( 1, 1, 1);
    scene.add( light );
  
    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        cube.rotation.x += 0.02;
        cube.rotation.y += 0.03;
        renderer.render( scene, camera );
    }
}