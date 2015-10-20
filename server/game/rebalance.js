var Board = require( './board.js' );
var rebalance = function( ) {
  var remove = function( x, y ) {
    var sphere = this.get( x,  y );
    var copy = sphere.copy( );
    sphere.state = 'L';
    this.updateLeaves( x, y );
    this.forNeighbors( x, y, function( neighbor, coordinates ) {
      var anchored = this.anchored( coordinates.x, coordinates.y );
      if( neighbor ) {
        if( neighbor.state === 'L' ) {
          if( !anchored ) {
            this.delete( coordinates.x, coordinates.y );
          }
        } else if( anchored ) {
          if( neighbor.state === 'A' ) {
            this.leaves[ 0 ] += 1;
          } else {
            this.updateLeaves( coordinates.x, coordinates.y );
          }
        }
      }
    }.bind( this ));
    if( !this.anchored( x, y ) ) {
      this.delete( x, y );
    }
    return copy;
  }.bind( this );
  var findClosestLiberty = function( coordinates, valence, ignore ) {
    if( coordinates.x === 0 && coordinates.y === 0 ) {
      return false;
    }
    ignore = ignore || [];
    var liberty;
    this.forNeighbors( coordinates.x, coordinates.y, function( neighbor ) {
      if( neighbor && neighbor.state === 'L' && neighbor.valence <= valence ) {
        if( ignore.indexOf( coordinates.x + ':' + coordinates.y ) < 0 ) {
          liberty = neighbor;
        }
      }
    }.bind( this ));
    if( liberty ) {
      return liberty;
    }
    var paths = [];
    this.forNeighbors( coordinates.x, coordinates.y, function( neighbor, coordinates ) {
      paths.push( coordinates );
    });
    paths.sort( function( aCoordinates, theCoordinates ) {
      return Math.abs( aCoordinates.x ) + Math.abs( aCoordinates.y ) -
        Math.abs( theCoordinates.x ) - Math.abs( theCoordinates.y );
    });
    for( var i = 0; i < paths.length; i++ ) {
      var path = paths[ i ];
      ignore.push( coordinates );
      liberty = findClosestLiberty( path, valence, ignore );
      if( liberty ) {
        return liberty;
      }
      ignore.pop( );
    }
  }.bind( this );
  var fallers = [];
  var rotators = [];
  var event = [];
  var threshold = this.maximumValence - 2;
  this.board.forEach( function( sphere ) {
    if( sphere.state !== 'L' && sphere.valence > threshold ) {
      fallers.push( remove( sphere.coordinates.x, sphere.coordinates.y ) );
    }
  }.bind( this ));
  fallers = fallers.sort( function( aSphere, theSphere ) {
    return aSphere.valence - theSphere.valence;
  });
  this.board.forEach( function( sphere, coordinates ) {
    rotators.push( sphere.copy( ) );
    this.delete( coordinates.x, coordinates.y );
  }.bind( this ));
  this.board = new Board( );
  this._leaves = [4];
  while( rotators.length > 0 ) {
    for( var i = 0; i < rotators.length; i++ ) {
      var sphere = rotators[ i ];
      if( sphere.state !== 'L' && sphere.state !== 'A' ) {
        if( this.put( -sphere.coordinates.y, sphere.coordinates.x, sphere.state ) ) {
          event.push({
            to: {
              x: -sphere.coordinates.y,
              y: sphere.coordinates.x
            },
            from: {
              x: sphere.coordinates.x,
              y: sphere.coordinates.y
            },
            state: sphere.state,
            success: true
          });
          rotators.splice( i, 1 );
        }
      } else {
        rotators.splice( i, 1 );
      }
    }
  }
  this.emit( 'rotated', event );
  fallers.forEach( function( sphere ) {
    var liberty = findClosestLiberty( sphere.coordinates, sphere.valence );
    this.put( liberty.coordinates.x, liberty.coordinates.y, sphere.state );
    event = {
      to: {
        x: liberty.coordinates.x,
        y: liberty.coordinates.y
      },
      from: {
        x: sphere.coordinates.x,
        y: sphere.coordinates.y
      },
      state: sphere.state,
      success: true
    }
    this.emit( 'moved', event );
    var chain = this.detectChain( liberty.coordinates.x, liberty.coordinates.y );
    if( chain.remove ) {
      this.removeChain( chain.chain );
    }
  }.bind( this ));
  if( !this.balanced ) {
    this.rebalance( );
  }
};
module.exports = rebalance;