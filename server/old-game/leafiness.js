var adjacentKeys = require( './adjacentKeys' );

var leafiness = function( coordinates ) {

  var keys = adjacentKeys( coordinates );

  var center = this.board[ coordinates ];

  for( var i = 0; i < keys.length; i++ ) {

    var adjacent = this.board[ keys[ i ] ];

    if( adjacent.state !== 'L' && adjacent.valence > center.valence ) {

      return false;

    }

  }

  return true;

};

module.exports = leafiness;