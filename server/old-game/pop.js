var adjacentKeys = require( './adjacentKeys.js' );
var Node = require( './node.js' );

var pop = function( coordinates ) {

  var sphere = this.board[ coordinates ];

  if( sphere.leafy ) {

    this.leaves[ sphere.valence ] -= 1;

    while( this.leaves[ this.leaves.length - 1 ] === 0 ) {

      this.leaves.pop( );

    }

  }

  var copy = new Node( sphere.state, sphere.valence, sphere.leafy );

  sphere.state = 'L';

  var keys = adjacentKeys( coordinates );

  for( var i = 0; i < keys.length; i++ ) {

    var adjacent = this.board[ keys[ i ] ];

    if( adjacent && adjacent.state === 'L' && !this.anchored( keys[ i ] ) ) {

      delete this.board[ keys[ i ] ];

    }

    if( adjacent && adjacent.state !== 'L' && this.anchored( keys[ i ] ) ) {

      if( adjacent.state === 'A' ) {

        this.leaves[ 0 ] += 1;

      } else {

        var adjacentLeafy = this.leafiness( keys[ i ] );

        if( adjacent.leafy !== adjacentLeafy ) {

          adjacent.leafy = adjacentLeafy;

          if( adjacent.leafy ) {

            this.leaves[ adjacent.valence ] =

              this.leaves[ adjacent.valence ] || 0;

            this.leaves[ adjacent.valence ] += 1;

          } else {

            this.leaves[ adjacent.valence ] -= 1;

            while( this.leaves[ this.leaves.length -1 ] === 0 ) {

              this.leaves.pop( );

            }

          }

        }

      }

    }

  }

  if( !this.anchored( coordinates ) ) {

    delete this.board[ coordinates ];

  }

  return copy;

};

module.exports = pop;