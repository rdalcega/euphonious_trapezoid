sphero.factory('game', ['scales', function (scales) {
  // MUSIC STUFFS!
  // ------
  var context = new AudioContext( );
  var elements = {}; // { id: { element: sequenceElement, note: integer } }
  var scale; // The working scale is not chosen until the first element is placed on the board
  var filter = context.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 1000;
  filter.connect( context.destination );
  // -------
  var gameDomElement;
  var svg;
  var background;
  var grid;
  var indicator;

  var gameWidth;
  var gameHeight;

  var gridSize;
  var gridStepIncrement;
  var wiggleRoom;
  var radius;
  var anchorRadius;
  var borderMaxRadius;

  var gameInfo = {};

  var colors = { 
  A: ["#fd3132", "#8a2225", "#ffffff"], 
  0: ["#fc9bcb", "#fccfe6", "#8c3e65"], // light pink #fccfe6 dark pink #8c3e65 other dark pink #b96890
  1: ["#97d9a1", "#c3d9c6", "#499755"], // light green #c3d9c6 dark green #499755
  2: ["#00a8db", "#017ba0", "#017ba0"], // light blue #6ec2db dark blue #017ba0
  3: ["#787b8c", "#b2b5c3", "#525460"] }; // light gray #b2b5c3 dark gray #525460

  var radius;

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

  var showTurnChange = function () {
    console.log('current players turn: ', gameInfo.currentTurn);
    indicator
      .style("fill", colors[gameInfo.currentTurn][2]);

    // d3.select(".A")
    //   .attr('cx', '50%')
    //   .attr('cy', '50%')
    //   .style('fill', colors[player][2])
    //   .attr('r', Number(radius.slice(0, -1)) * .2 + "%")

    //   .transition()
    //   .duration(duration/2) // change 1000 to a variable representing turn duration
    //   .attr('r', Number(radius.slice(0, -1)) * (2+wiggleRoom)/2 + "%" )

    //   .transition()
    //   .duration(duration/2)
    //   .attr('r', Number(radius.slice(0, -1)) * .2 + "%" );

  };

  var updateBoard = function ( data ) {
    var duration = 50;
    var spheres = d3.select('#grid').selectAll('.piece')
      .data( data, function (d) {
        return d.id;
      } );

    spheres.enter()
      .insert('circle', '.indicator')
      .attr("r", 0)
      .attr("fill", "none")
      .attr("class", function (d) {
        return d.state + " piece";
      });

    spheres
      .transition()
      .duration(duration)
      .attr("cx", function (d) {
        var pos = (100/gridSize) * d.coordinates.x + 50;
        var posString = String(pos) + "%";
        return posString;
      })
      .attr("cy", function (d) {
        var pos = (-100/gridSize) * d.coordinates.y + 50;
        var posString = String(pos) + "%";
        return posString;
      })
      .attr("r", function (d) {
        if (d.state === 'A') {
          return anchorRadius;
        } else {
          return radius;
        }
        
      })
      .style("fill", function (d) {
        return colors[d.state][0];
      });

    spheres.exit().remove();
    // -----
    // Update the filter frequency.
    // The more spheres there are on the
    // game, the larger the filter frequency.
    // Note that a board with valence 8 can have at most
    // 113 spheres on a terminating condition
    filter.frequency.value = 500 + data.length * 2500 / 113;
    // Choose scale if non exists or if the number of pieces
    // in the board is less than the scale's length
    // if( data.length < scale.length ) {
    //   // We use a random index offset to ensure we choose
    //   // a new scale each time around.
    //   var offset = Math.floor( Math.random( ) * ( scales.length - 1 ) );
    //   // The new scale must contain the note corresponding
    //   // to each sphere on the board.
    //   for( var i = 0; i < scales.length; i++ ) {
    //     var aScale = scales[ ( i + offset ) % scales.length ];
    //     var valid = true;
    //     for( var j = 0; j < data.length; j++ ) {
    //       var sphere = data[ j ];

    //       if( aScale.indexOf( sphere.note % 12 ) < 0 ) {
    //         valid = false;
    //         break;
    //       }
    //     }
    //     if( valid ) {
    //       scale = aScale;
    //       break;
    //     }
    //   }
    // }
    // ----
    return duration;
  };

  var getPosition = function (mouseX, mouseY) {

    var coordinates = {};

    var gridLeft = grid.attr("x");
    var gridTop = grid.attr("y");
    var gridCenter = grid.attr("width")/2;

    var gridLength = grid.attr("width");

    var relativeX = mouseX - gridLeft;
    var relativeY = mouseY - gridTop;

    var distFromCenterX = relativeX - gridCenter;
    var distFromCenterY = gridCenter - relativeY;

    coordinates.x = Math.round(distFromCenterX * (gridSize / gridLength));
    coordinates.y = Math.round(distFromCenterY * (gridSize / gridLength));

    return coordinates;
  };

  var getSvgPosition = function (coordinates) {
    var posX = (100/gridSize) * coordinates.x + 50;
    var posStringX = String(posX) + "%";
    var posY = (-100/gridSize) * coordinates.y + 50;
    var posStringY = String(posY) + "%";

    return {
      x: posStringX,
      y: posStringY
    };
  };

  var put = function (data) {
    var duration;
    if (data.success) {
      // -----
      // We create a new sequence element that will correspond to this
      // sphere until it's valence changes.
      // We choose the midiNote
      var midiNote;
      // In order to choose the note,
      // we will need access to the sphere's
      // neighbors.
      var neighbors = d3.select('#grid').selectAll('circle').filter( function(d) {
        var condition =
          d.coordinates.x === data.coordinates.x + 1 && d.coordinates.y === data.coordinates.y ||
          d.coordinates.x === data.coordinates.x - 1 && d.coordinates.y === data.coordinates.y ||
          d.coordinates.x === data.coordinates.x && d.coordinates.y === data.coordinates.y + 1 ||
          d.coordinates.x === data.coordinates.x && d.coordinates.y === data.coordinates.y - 1;
        return condition;
      });
      // In the special case that the only neighbor
      // of a sphere is the anchor, the note for
      // the element is chosen randomly within the chosen
      // scale and within the 24 - 36 octave.
      if( data.valence === 1 && neighbors.length === 1 ) {
        midiNote = 36 + scale[ ~~( Math.random( ) * scale.length ) ];
      } else {
        // In every other case, the value of the midiNote
        // is determined from one of it's neighbors. Preference
        // is given to notes on the scale that are closest to the
        // note of one of it's neighbors.
        var absNeighborMidiNote = 0;
        neighbors.each( function( d ) {
          if( elements[ d.id ] ) {
            absNeighborMidiNote += elements[d.id].midiNote;
          }
        });
        absNeighborMidiNote = Math.floor( absNeighborMidiNote / neighbors.size() );
        console.log( 'average neighbor: ', absNeighborMidiNote );
        var relNeighborMidiNote = absNeighborMidiNote % 12;
        var octave = absNeighborMidiNote - relNeighborMidiNote;
        var screen = Math.random( );
        var stepSize;
        if( screen < 0.25 ) {
          stepSize = ( ~~(Math.random( ) * 2)*2 - 1 ) * 4; // third
        } else if( screen < 0.5 ) {
          stepSize = ( ~~(Math.random( ) * 2)*2 - 1 ) * 5; // fourth
        } else if( screen < 0.70 ) {
          stepSize = ( ~~(Math.random( ) * 2)*2 - 1 ) * 7; // fifth
        } else if( screen < 0.85 ) {
          stepSize = ( ~~(Math.random( ) * 2)*2 - 1 ) * 2; // whole
        } else if( screen < 0.925 ) {
          stepSize = ( ~~(Math.random( ) * 2)*2 - 1 ) * 9; // sixth
        } else if( screen < 0.975 ) {
          stepSize = ( ~~(Math.random( ) * 2)*2 - 1 ) * 11; // seventh
        } else {
          stepSize = ( ~~(Math.random( ) * 2)*2 - 1 ) * 12; //octave
        }
        midiNote = relNeighborMidiNote + stepSize;
        if( midiNote > 12 ) {
          octave += 12;
          midiNote = midiNote % 12;
        } else if( midiNote < 0 ) {
          octave -= 12;
          midiNote = midiNote + 12;
        }
        midiNote = scale.reduce( function( closest, current ) {
          if( Math.abs( midiNote - closest ) > Math.abs( midiNote - current ) ) {
            return current;
          } else {
            return closest;
          }
        });
        midiNote += octave;
        if( midiNote < 36 ) {
          midiNote = 36 + scale[ 0 ];
        } else if( midiNote > 84 ) {
          midiNote = 72 + scale[ scale.length - 1 ];
        }
      }
      // Now that we have the midiNote, we can create the remove sound
      var removed = context.createRemovedElement( midiNote, data.valence );
      //var put = context.createPutElement( midiNote, data.valence );
      var sequence = context.createSequenceElement( midiNote, data.valence );
      removed.connect( filter );
      sequence.connect( filter );
      //put.connect( filter );
      //put.start( context.currentTime );
      elements[ data.id ] = {
        removed: removed,
        //put: put,
        sequence: sequence,
        midiNote: midiNote
      };
      // -----
      duration = 100;
      d3.select("#grid").append("circle").datum( {coordinates: data.coordinates, id: data.id, state: data.state} )
      .attr("r", 0)
      .attr("class", function (d) { return d.state + " piece"; })
      .style("fill", "white")
      .attr("cx", getSvgPosition(data.coordinates).x)
      .attr("cy", getSvgPosition(data.coordinates).y)
      .transition()
      .duration(duration)
      .ease('bounce')
      .attr("r", radius)
      .style("fill", colors[data.state][0]);
    } else {
      var sphere = d3.select("#grid").selectAll(".piece")
      .filter( function (d) {
        return d.coordinates.x === data.coordinates.x && d.coordinates.y === data.coordinates.y;
      });
      console.log('sphere size: ', sphere);
      if (sphere.size() === 1) {
        duration = 200
        var numPositions = Math.floor(100 + (Math.random() * 5));
        var vibrationRange = 2 * Math.abs( 100/(gridSize * 2) - 100/(gridSize*(2 + wiggleRoom)) );
        for (var i = 0; i < numPositions; i++) {
          sphere = sphere
          .transition()
          .duration(duration/(numPositions + 1))
          .ease("sin")
          .attr("cx", function(d) {
            var current = getSvgPosition(d.coordinates).x;
            current = Number(current.slice(0, -1));
            return current + Math.random() * vibrationRange - (vibrationRange/2) + "%";
          })
          .attr("cy", function(d) {
            var current = getSvgPosition(d.coordinates).y;
            current = Number(current.slice(0, -1));
            return current + Math.random() * vibrationRange - (vibrationRange/2) + "%";
          });
        }

        sphere
        .transition()
        .duration(duration/(numPositions + 1))
        .ease("sin")
        .attr("cx", getSvgPosition(data.coordinates).x)
        .attr("cy", getSvgPosition(data.coordinates).y)

      } else {
        duration = 100;
        sphere = d3.select("#grid").append("circle").datum( { id: NaN } )
        .attr("r", 0)
        .attr("class", "blip")
        .style("fill", "black")
        .attr("cx", getSvgPosition(data.coordinates).x)
        .attr("cy", getSvgPosition(data.coordinates).y)
        .transition()
        .duration(duration/2)
        .ease("elastic")
        .attr("r", Number(radius.slice(0, -1)) * 0.5 + "%" )

        .transition()
        .duration(duration/2)
        .ease("linear")
        .style("fill", "black")
        // .attr("r", 0)
        .remove();
      }
    }

    return duration + 25;
  };

  var removed = function (data) {
    var duration = 100;
    var sphere = d3.select("#grid").selectAll(".piece").filter( function (d) { return d.id === data.id });
    sphere
//    .style("stroke", colors["A"][1])
//    .style("stroke-width", 0)
    .transition()
    .duration(duration *  (2/3))
    .ease("elastic")
    .attr("r", Number(radius.slice(0, -1)) * (2+wiggleRoom)/2 + "%") 
//    .style("stroke-width", 1)
    .style("fill", colors[data.state][1])
    .each( 'start', function( d ) {
      elements[ d.id ].removed.start( context.currentTime );
    })
    .transition()
    .duration( duration/3 )
    .ease("linear")
    .attr("r", 0)
    .each('end', function( d ) {
      elements[ d.id ].removed.disconnect( );
      //elements[ d.id ].put.disconnect( );
      delete elements[ d.id ];
    })
    .remove();

    return duration + 25;
  };

  var moved = function (data) {
    var duration = 100;

    var sphere = d3.select("#grid").selectAll(".piece").filter( function (d) { return d.id === data.id } );

    sphere.transition()
    .duration( duration * .15 )
    .ease("cubic")
    .attr("r", Number(radius.slice(0, -1)) * 0.75 + "%" )
    .transition()
    .duration( duration * 0.7 )
    .ease("cubic-in-out")
    .attr("cx", getSvgPosition(data.to).x )
    .attr("cy", getSvgPosition(data.to).y )
    .transition()
    .duration( duration * 0.15 )
    .ease("elastic")
    .attr("r", radius)
    .each('end', function( d ) {
      elements[ d.id ].removed.disconnect();
      elements[ d.id ].removed =
        context.createRemovedElement( elements[ d.id ].midiNote, data.valence );
      elements[ d.id ].removed.connect( filter );
    });


    sphere.datum( {id: data.id, state: data.state, coordinates: data.to } );

    return duration + 25;
  };

  var fell = function (data) {
    var duration = 200;

    var sphere = d3.select("#grid").selectAll(".piece").filter( function (d) { return d.id === data.id } );

    sphere.transition()
    .duration( duration )
    .ease("elastic")
    .attr("cx", getSvgPosition(data.to).x )
    .attr("cy", getSvgPosition(data.to).y )
    .attr("r", radius)
    .each( 'end', function( d ) {
      elements[ d.id ].removed.disconnect();
      elements[ d.id ].removed =
        context.createRemovedElement( elements[ d.id ].midiNote, data.valence );
      elements[ d.id ].removed.connect( filter );
    });


    sphere.datum( {id: data.id, state: data.state, coordinates: data.to } );

    return duration + 50;

  }

  var suspended = function (data) {
    var duration = 500 + Math.random() * 100;
    var sphere = d3.select("#grid").selectAll(".piece").filter( function (d) { return d.id === data.id} );

    var getSmaller = function () {
      sphere.transition()
      .duration(duration * 0.5)
      .ease("sin")
      .attr("r",  Number( radius.slice(0, -1)) * 0.7 + "%")
      .style("fill", colors[data.state][1])
      .transition()
      .duration(duration * 0.5)
      .ease("sin")
      .style("fill", colors[data.state][0])
      .attr("r", Number( radius.slice(0, -1)) * 0.8 + "%")
    };
    getSmaller();
    return 0;
  }

  var rotated = function (data) {
    var duration = 200;
    var antiClockwiseAngle = (Math.PI/2) * 1.35;
    var antiClockwiseSteps = 90 * 1.25;
    var antiClockwiseResolution = antiClockwiseAngle/antiClockwiseSteps;
    var antiClockwiseDuration = duration * .65;
    var clockwiseAngle = -Math.PI/2 * .35;
    var clockwiseSteps = 90 * .25;
    var clockwiseResolution = clockwiseAngle/clockwiseSteps;
    var clockwiseDuration = duration * .35;

    var spheres = d3.select("#grid").selectAll(".piece")
    .filter( function (d) {
      var mid, low, high;
      low = 0;
      high = data.length - 1;
      mid = Math.floor( (low + high)/2 )
      while ( data[mid].id !== d.id) {
        if ( low >= high ) {
          return false;
        } else if (data[mid].id < d.id) {
          if( mid === data.length ) {
            return false;
          }
          low = mid + 1;
        } else if (data[mid].id > d.id) {
          if (mid === 0) {
            return false;
          }
          high = mid - 1;
        }
        mid = Math.floor( (low + high)/2 );
      }
      return true;
    });

    var transition = spheres;

    var rotateTheta = function (x, y, theta) {
      return { 
        x: x * Math.cos(theta) - y * Math.sin(theta),
        y: x * Math.sin(theta) + y * Math.cos(theta)
      };
    };
    for (var i = 0; i <= antiClockwiseAngle; i+= antiClockwiseResolution) {
      transition = transition.transition().duration( antiClockwiseDuration/antiClockwiseSteps ).ease('linear')
                .attr("cx", function (d) {
                  var coordinates = rotateTheta( d.coordinates.x, d.coordinates.y, antiClockwiseResolution );
                  d.coordinates.x = coordinates.x;
                  d.coordinates.y = coordinates.y;
                  return getSvgPosition(d.coordinates).x;
                })
                .attr("cy", function (d) {
                  return getSvgPosition(d.coordinates).y;
                });
    }

    for ( var i = 0; i >= clockwiseAngle; i += clockwiseResolution ) {
      transition = transition.transition().duration( clockwiseDuration/clockwiseSteps ).ease('linear')
                .attr("cx", function (d) {
                  var coordinates = rotateTheta( d.coordinates.x, d.coordinates.y, clockwiseResolution );
                  d.coordinates.x = coordinates.x;
                  d.coordinates.y = coordinates.y;
                  return getSvgPosition(d.coordinates).x;
                })
                .attr("cy", function (d) {
                  return getSvgPosition(d.coordinates).y;
                });

      if (i <= clockwiseAngle + clockwiseResolution/2 ) {
        transition.attr("cx", function (d) {
          d.coordinates.x = Math.round(d.coordinates.x);
          d.coordinates.y = Math.round(d.coordinates.y);
          return getSvgPosition(d.coordinates).x;
        })
        .attr("cy", function (d) {
          return getSvgPosition(d.coordinates).y;
        });
      }
    }

    return duration + 50;
  }

  var showBorder = function () {
    var borderSpheres = d3.select('#grid').selectAll(".border").data( function () {
      var data = [];
      for ( var i = 0; i < gameInfo.maxValence; i++ ) {
        data.push({
          id: null,
          bordernum: i,
          quadrant: Math.floor(i/gameInfo.maxValence),
          coordinates: {
            x: i,
            y: gameInfo.maxValence - i
          }
        });
      }
      for (var i = gameInfo.maxValence; i < gameInfo.maxValence * 2; i ++) {
        data.push({
          id: null,
          bordernum: i,
          quadrant: Math.floor(i/gameInfo.maxValence),
          coordinates: {
            x: gameInfo.maxValence - (i % gameInfo.maxValence),
            y: -1 * (i % gameInfo.maxValence)
          }
        });
      }
      for (var i = gameInfo.maxValence * 2; i < gameInfo.maxValence * 3; i++) {
        data.push({
          id: null,
          bordernum: i,
          quadrant: Math.floor(i/gameInfo.maxValence),
          coordinates: {
            x: -1 * (i % gameInfo.maxValence),
            y: (-1 * gameInfo.maxValence) + (i % gameInfo.maxValence)
          }
        });
      }
      for (var i = gameInfo.maxValence * 3; i < gameInfo.maxValence * 4; i++) {
        data.push({
          id: null,
          bordernum: i,
          quadrant: Math.floor(i/gameInfo.maxValence),
          coordinates: {
            x: (-1 * gameInfo.maxValence) + (i % gameInfo.maxValence),
            y: i % gameInfo.maxValence
          }
        });
      }
      return data;
    });

    var numBorderSpheres = borderSpheres.enter()
      .append('circle')
      .attr('class', 'border')
      .style('fill', function (d) {
        return colors[ d.quadrant ][0];
      })
      .attr('r', 0)
      .attr('cx', function (d) {
        return getSvgPosition(d.coordinates).x;
      })
      .attr('cy', function (d) {
        return getSvgPosition(d.coordinates).y;
      }).size();


    d3.selectAll('.border')
      .each( function (d, i) {
        var circle = this;

        var animate = function () {
          d3.select(circle)
          .transition()
          .duration( 250 )
          .attr('r', borderMaxRadius)

          .transition()
          .duration( 250 )
          .attr('r', 0)
          
          .transition()
          .duration( 2000 )
          .attr('r', borderMaxRadius)

          .transition()
          .duration( 2000 )
          .attr('r', 0)

          .transition()
          .duration( ((numBorderSpheres -1 ) * 250) - 4500 )
          .attr('r', 0)
          .each('end', animate)
        };

        d3.select(circle)
        .transition()
        .delay( i * 250 )
        .each('start', animate);

      });
  };

  var indicatorOscillate = function () {
    duration = 1000;

    indicator.transition()
    .duration(duration * 0.5)
    .ease("sin")
    .attr("r",  radius)
    .transition()
    .duration(duration * 0.5)
    .ease("sin")
    .attr("r", anchorRadius)
     .each( "end", indicatorOscillate);
  };

  var i = 0;
  var particle = function () {
    var m = d3.mouse(this);
    svg.insert("circle")
        .attr("cx", m[0])
        .attr("cy", m[1])
        .attr("r", 1e-6)
        .attr("class", "particle")
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
    gridSize = size || 12;
    wiggleRoom = wiggleRoom || .5;

    radius = 100/(gridSize* (2 + wiggleRoom)) + "%";
    anchorRadius = Number(radius.slice(0, -1)) * .3 + "%";
    borderMaxRadius = Number(radius.slice(0, -1)) * .2 + "%";


    svg = d3.select(gameDomElement).append("svg");
    svg
      .style("pointer-events", "all")
//      .on("ontouchstart" in document ? "touchmove" : "mousemove", particle);
    
    var defs = svg.append('defs');
    var gradient = defs.append('linearGradient').attr("id", "gameGradient");
    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#010708");
    gradient.append("stop").attr("offset", "70%").attr("stop-color", "#011218");

    background = svg.append("rect").attr("width", "100%").attr("height", "100%")
    .attr("id", "gradientBackground").attr("fill", "url(#gameGradient)");

    grid = svg.append("svg").attr("id", "grid");
    indicator = grid.append("circle").datum( {id: null} ).attr("r", anchorRadius).attr("cx", "50%").attr("cy", "50%")
    .style("fill", colors[gameInfo.currentTurn][2]).attr("class", "indicator").attr("id", "indicator");
    setSize();
    showBorder();
    indicatorOscillate();
    // svg.insert("circle")
    //     .attr("cx", "50%")
    //     .attr("cy", "50%")
    //     .attr("r", '2%')
    //     .style("fill", "blue")
    // ---
    // MUSIC stuff
    if( !scale ) {
      scale = scales[ Math.floor( Math.random() * ( scales.length - 1 ))];
    }
    // Create the anchor element
    var anchorElement = context.createAnchorElement( 24 + scale[ 0 ] );
    anchorElement.connect( filter );
    // Sequence
    var ms = Math.pow( 10, -3 );
    var timeoutLength = 300 * ms; // ms
    var sixteenthTime = 125 * ms; // ms
    var lastScheduledTime = context.currentTime;
    var lastScheduledAnchorTime = context.currentTime;
    var lastScheduledCoordinates;
    var sequence = function( ) {
      setTimeout( sequence, timeoutLength );
      var timeoutStart = context.currentTime;
      var screen = Math.random( );
      while( lastScheduledTime + sixteenthTime < timeoutStart + timeoutLength ) {
        if( lastScheduledAnchorTime + 8 * sixteenthTime < timeoutStart + timeoutLength ) {
          anchorElement.start( lastScheduledAnchorTime + 8 * sixteenthTime );
          lastScheduledAnchorTime += 8 * sixteenthTime;
          d3.select('#grid').selectAll('circle').filter( function( d ) {
            return d.state === 'A';
          }).transition( )
            .delay( ( lastScheduledAnchorTime - context.currentTime ) * 1000 )
            .duration( 1 * sixteenthTime * 1000 )
            .ease( 'cubic-in-out' )
            .attr('r', Number( radius.slice( 0, -1 ) )*0.75 + '%' )
            .style( 'fill', function( d ) {
              return colors[ d.state ][ 1 ];
            })
            .transition( )
            .duration( 3 * sixteenthTime * 1000 )
            .ease( 'bounce' )
            .attr('r', radius)
            .style( 'fill', function( d ) {
              return colors[ d.state ][ 0 ];
            });
        }
        var ids = Object.keys( elements );
        if( ids.length > 0 && screen > 0.1 ) {
          if( !lastScheduledCoordinates ) {
            var choice = ~~( Math.random( ) * ids.length );
            var sphere = d3.select('#grid').selectAll('circle')
              .filter( function( d ) {
                return Number( ids[ choice ] ) === d.id;
              });
            sphere.each( function( d ) {
              lastScheduledCoordinates = d.coordinates;
            });
            elements[ ids[ choice ] ].sequence.start( lastScheduledTime + sixteenthTime );
            lastScheduledTime += sixteenthTime;
            sphere.transition( )
              .delay( ( lastScheduledTime - context.currentTime ) * 1000 )
              .duration( ( sixteenthTime / 2 ) * 1000 )
              .ease( 'cubic-in-out' )
              .attr( 'r', Number( radius.slice( 0, -1 ) ) * 0.75 + '%' )
              .style( 'fill', function( d ) {
                return colors[ d.state ][ 1 ];
              })
              .transition( )
              .duration( ( sixteenthTime / 2 ) * 1000 )
              .ease( 'elastic' )
              .attr( 'r', radius )
              .style( 'fill', function( d ) {
                return colors[ d.state ][ 0 ];
              });
          } else {
            var neighbors = d3.select('#grid').selectAll('circle').filter( function(d) {
              var condition =
                d.coordinates.x === lastScheduledCoordinates.x + 1 && d.coordinates.y === lastScheduledCoordinates.y ||
                d.coordinates.x === lastScheduledCoordinates.x - 1 && d.coordinates.y === lastScheduledCoordinates.y ||
                d.coordinates.x === lastScheduledCoordinates.x && d.coordinates.y === lastScheduledCoordinates.y + 1 ||
                d.coordinates.x === lastScheduledCoordinates.x && d.coordinates.y === lastScheduledCoordinates.y - 1;
              return condition;
            });
            var choice = ~~(Math.random()*neighbors.size( ));
            var id;
            neighbors.each( function( d, i ) {
              if( i === choice && d.state !== 'A' ) {
                id = d.id;
              } else if( i === choice ) {
                id = -1;
              }
            });
            if( id >= 0 ) {
              var sphere = d3.select('#grid').selectAll('circle')
                .filter( function( d ) {
                  return id === d.id;
                });
              sphere.each( function( d ) {
                lastScheduledCoordinates = d.coordinates;
              });
              elements[ id ].sequence.start( lastScheduledTime + sixteenthTime );
              lastScheduledTime += sixteenthTime;
              sphere.transition( )
                .delay( ( lastScheduledTime - context.currentTime ) * 1000 )
                .duration( ( sixteenthTime / 2 ) * 1000 )
                .ease( 'cubic-in-out' )
                .attr( 'r', Number( radius.slice( 0, -1 ) ) * 0.75 + '%' )
                .style( 'fill', function( d ) {
                  return colors[ d.state ][ 1 ];
                })
                .transition( )
                .duration( ( sixteenthTime / 2 ) * 1000 )
                .ease( 'elastic' )
                .attr( 'r', radius )
                .style( 'fill', function( d ) {
                  return colors[ d.state ][ 0 ];
                });
            } else {
              lastScheduledCoordinates = undefined;
              lastScheduledTime += sixteenthTime;
            }
          }
        } else {
          lastScheduledTime += sixteenthTime;
        }
      }
    };
    sequence( );
  };
  return {

    gameInfo: gameInfo,
    colors: colors,

    init: init,
    setSize: setSize,
    showTurnChange: showTurnChange,
    getPosition: getPosition,
    updateBoard: updateBoard,
    put: put,
    removed: removed,
    moved: moved,
    fell: fell,
    suspended: suspended,
    rotated: rotated
  };

}]);