sphero.factory('game', function () {
  // declare game globals
  var SCREEN_WIDTH = window.innerWidth;
  var SCREEN_HEIGHT = window.innerHeight;
  var GAME_WIDTH;
  var GAME_HEIGHT;
  var gameDomElement; // <- DOM element that the game is inside of

  var scene, camera, RENDERER;
  var light;

  // objects in the 3d space
  var gridSize;
  var gridStep;
  var gridPlane;

  // the board
  var board;
  //controls to rotate the camera with mouse, will probably be disabled in actual game
  var controls;

  var init = function (element, gridSize, gridStepIncrement) {

    // initialize variables
    gameDomElement = element;
    GAME_WIDTH = element.offsetWidth;
    GAME_HEIGHT = element.offsetHeight;
    gridSize = gridSize || 2000;
    gridStepIncrement = gridStepIncrement || 10;
    gridStep = gridSize/gridStepIncrement;

    // create the scene
    scene = new THREE.Scene();

    // create and position camera
    camera = new THREE.PerspectiveCamera(
      75, // field of view
      GAME_WIDTH/GAME_HEIGHT, // aspect ratio
      1,  // near clipping plane
      10000 // far clipping plane
    );
    camera.position.z = 1000;
    camera.position.y = -200;

    // initialize webGL renderer
    RENDERER = new THREE.WebGLRenderer( {antialias: true} );
    RENDERER.setSize( GAME_WIDTH, GAME_HEIGHT);
    // setSize(window.innerWidth/2, window.innerHeight/2, false) will render your app at half resolution, given that your <canvas> has 100% width and height.
    RENDERER.setClearColor(0x333F47, 1);
    // Position the webGL container in the DOM
    // RENDERER.domElement.style.width = GAME_WIDTH;
    // RENDERER.domElement.style.height = GAME_HEIGHT;
    element.appendChild( RENDERER.domElement );

    // Prepare lights and add them to scene.
    light = new THREE.PointLight(0xffffff);
    light.position.set(0,0,500);
    scene.add(light);

    // Board
    board = {};

    // optional orbit controls
    controls = new THREE.OrbitControls(camera, RENDERER.domElement);

    // start adding 3d objects to the scene
    objects = [];
    ballMaterial = new THREE.MeshPhongMaterial({color: 0xF47333});
    ballGeometry = new THREE.SphereGeometry(50, 8, 8);

    // Add our grid
    var gridGeometry = new THREE.Geometry();
    for ( var i = - gridSize/2; i <= gridSize/2; i += gridStep ) {

      gridGeometry.vertices.push( new THREE.Vector3( - gridSize/2, i, 0 ) );
      gridGeometry.vertices.push( new THREE.Vector3(   gridSize/2, i, 0 ) );

      gridGeometry.vertices.push( new THREE.Vector3( i, - gridSize/2, 0 ) );
      gridGeometry.vertices.push( new THREE.Vector3( i,   gridSize/2, 0 ) );

    }
    var lineMaterial = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } );
    var line = new THREE.LineSegments( gridGeometry, lineMaterial );

    scene.add( line );  
   
    // Add our helper plane
    var geometry = new THREE.PlaneBufferGeometry( gridSize, gridSize );
    gridPlane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: 0xFF0000, visible: false } ) );
    objects.push(gridPlane);
    scene.add( gridPlane );
  // Add our anchor
    addPiece(0, 0, 'A', new THREE.Vector3( 0, 0, 1));

  // Start the render sequence
    render();
  };

  var render = function () {
    requestAnimationFrame(render);
    RENDERER.render(scene, camera);
    controls.update();
  }

  var resize = function () {
    GAME_WIDTH = gameDomElement.offsetWidth;
    GAME_HEIGHT = gameDomElement.offsetHeight;
    RENDERER.setSize(GAME_WIDTH, GAME_HEIGHT);
    camera.aspect = GAME_WIDTH / GAME_HEIGHT;
    camera.updateProjectionMatrix();
  };

  var getGridPosition = function (mouseDownEvent, callback) {
    if (mouseDownEvent.clientX >= gameDomElement.offsetLeft && mouseDownEvent.clientY >= gameDomElement.offsetTop) {
      var mouseVector = new THREE.Vector3;
      mouseVector.x = 2 * ( (mouseDownEvent.clientX - gameDomElement.offsetLeft) / GAME_WIDTH) - 1; 
      mouseVector.y = 1 - 2 * ( (mouseDownEvent.clientY - gameDomElement.offsetTop)  / GAME_HEIGHT );
      
      var raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouseVector, camera);

      var intersects = raycaster.intersectObjects( objects );
      var intersect = intersects[0];

      var position2d = {x: Math.round(intersect.point.x/gridStep), y: Math.round(intersect.point.y/gridStep)};

      if (callback) {
        callback(position2d);
      }
    }
  };



  var addPiece = function (x, y, state, normal) {
    // create the 3d piece
    var ball = new THREE.Mesh(ballGeometry.clone(), ballMaterial);

    // if there are any other 3d objects at that position, remove them
    if (board[x + "_" + y] !== undefined) scene.remove(board[x + "_" + y].piece)
    board[x + "_" + y] = {state: state, valence: 'calculate this', leafy: 'calculate this', piece: ball };

    // position the ball
    ball.position.set(x * gridStep, y * gridStep, 0);
    // set the position vector to be pointing up (may not be necessary)
    normal = normal || new THREE.Vector3( ball.position.x, ball.position.y, 1000)
    ball.position.add(normal);
    
    // add the ball to scene
    scene.add(ball);
    console.log(board);
  };


  return {
    init: init,
    resize: resize,
    getGridPosition: getGridPosition,
    addPiece: addPiece
  };
});


