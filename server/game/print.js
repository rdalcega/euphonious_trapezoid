var print = function( liberties ) {
  var bounds = {
    x: {
      low: undefined,
      high: undefined
    },
    y: {
      low: undefined,
      high: undefined
    }
  };
  this.board.forEach( function( sphere, coordinates ) {
    if( bounds.x.low ) {
      bounds.x.low = Math.min( bounds.x.low, coordinates.x );
    } else {
      bounds.x.low = coordinates.x;
    }
    if( bounds.x.high ) {
      bounds.x.high = Math.max( bounds.x.high, coordinates.x );
    } else {
      bounds.x.high = coordinates.x;
    }
    if( bounds.y.low ) {
      bounds.y.low = Math.min( bounds.y.low, coordinates.y );
    } else {
      bounds.y.low = coordinates.y;
    }
    if( bounds.y.high ) {
      bounds.y.high = Math.max( bounds.y.high, coordinates.y );
    } else {
      bounds.y.high = coordinates.y;
    }
  });
  var matrix = [];
  for( var row = 0; row <= bounds.y.high - bounds.y.low; row++ ) {
    matrix[ row ] = [];
    for( var column = 0; column <= bounds.x.high - bounds.y.low; column++ ) {
      matrix[ row ][ column ] = ' ';
    }
  }
  this.board.forEach( function( sphere, coordinates ) {
    if( liberties ) {
      matrix[ bounds.y.high - coordinates.y ][ coordinates.x - bounds.x.low ] = sphere.state;
    } else {
      if( sphere.state !== 'L' ) {
        matrix[ bounds.y.high - coordinates.y ][ coordinates.x - bounds.x.low ] = sphere.state;
      }
    }
  });
  for( var i = 0; i < matrix.length; i++ ) {
    matrix[ i ] = matrix[ i ].join(' ');
  }
  matrix = matrix.join('\n');
  console.log( matrix );
};

module.exports = print;