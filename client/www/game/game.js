sphero.factory('game', function () {

  var gameDomElement;
  var svg;
  var grid;

  var gameWidth;
  var gameHeight;

  var gridSize;
  var gridStepIncrement;
  var playerNum;

  var setSize = function () {
    gameWidth = gameDomElement.offsetWidth || window.innerWidth;
    gameHeight = gameDomElement.offsetHeight || window.innerHeight;

    svg
      .attr("width", gameWidth)
      .attr("height", gameHeight)

//    gridStepIncrement = Math.min(gameWidth, gameHeight) / gridSize;
    
    var svgWidth = svg.attr("width");
    var svgHeight = svg.attr("height");

    grid.attr( "width", Math.min(svgWidth, svgHeight) );
    grid.attr( "height", grid.attr("width") );

    grid.attr( "x", svgWidth/2 - (grid.attr("width")/2) );
    grid.attr( "y", svgHeight/2 - (grid.attr("height")/2) );

  };

  var updateBoard = function ( data ) {
    console.log("data: ", data );

    var spheres = d3.select('#grid').selectAll('circle')
      .data( data, function (d) {
        return d.id;
      } );

    spheres.enter()
      .append('circle')
      .attr("r", 0)
      .attr("fill", "none");

    spheres
      .transition()
      .duration(100)
      .attr("cx", function (d) {
        var pos = (100/20) * d.coordinates.x + 50;
        var posString = String(pos) + "%";
        return posString;
      })
      .attr("cy", function (d) {
        var pos = (-100/20) * d.coordinates.y + 50;
        var posString = String(pos) + "%";
        return posString;
      })
      .attr("r", 100/(20*2.1) + "%")
      .style("fill", function (d) {
        var colors = { 
        A: "yellow",
        0: "red", 
        1: "green", 
        2: "blue", 
        3: "cyan"};

        return colors[d.state];
      });

    spheres.exit().transition().duration(1000).attr("r", 0).remove();

  };

  var getPosition = function (mouseX, mouseY) {

    var coordinates = {};

    var gridLeft = grid.attr("x");
    var gridTop = grid.attr("y");
    var gridCenter = grid.attr("width")/2;

    var gridSize = grid.attr("width");

    var relativeX = mouseX - gridLeft;
    var relativeY = mouseY - gridTop;

    var distFromCenterX = relativeX - gridCenter;
    var distFromCenterY = gridCenter - relativeY;

    coordinates.x = Math.round(distFromCenterX * (20 / gridSize));
    coordinates.y = Math.round(distFromCenterY * (20 / gridSize));

    return coordinates;
  };


  var i = 0;
  var particle = function () {
    var m = d3.mouse(this);
    svg.insert("circle")
        .attr("cx", m[0])
        .attr("cy", m[1])
        .attr("r", 1e-6)
        .style("fill", "none")
        .style("stroke-width", "2.5px")
        .style("stroke", d3.hsl((i = (i + 1) % 360), 1, .5))
        .style("stroke-opacity", 1)
      .transition()
        .duration(2000)
        .ease(Math.sqrt)
        .attr("r", 100)
        .style("stroke-opacity", 1e-6)
       .remove();

    d3.event.preventDefault();
  };



  var init = function (element, size) {
    gameDomElement = element || document.getElementById("game");
    gridSize = size || 20;

    svg = d3.select(gameDomElement).append("svg");
    svg
      .style("pointer-events", "all")
//      .on("ontouchstart" in document ? "touchmove" : "mousemove", particle);

    grid = svg.append("svg").attr("id", "grid");

    setSize();
    // svg.insert("circle")
    //     .attr("cx", "50%")
    //     .attr("cy", "50%")
    //     .attr("r", '2%')
    //     .style("fill", "blue")
  };



  return {
    playerNum: playerNum,

    init: init,
    setSize: setSize,
    getPosition: getPosition,
    updateBoard: updateBoard
  };

});