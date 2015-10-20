var adjacentKeys = require( './adjacentKeys.js' );

var remove = function( coordinates ) {

  var replace = function( destination, origin ) {

    var original = this.board[ origin ];

    var destinational = this.board[ destination ];

    var state = original.state;

    original.state = 'L';

    if( original.leafy ) {

      this.leaves[ original.valence ] -= 1;

      original.leafy = false;

      while( this.leaves[ this.leaves.length - 1 ] === 0 ) {

        this.leaves.pop( );

      }

    }

    this.insert( destination, state, true, true );

    var keys = adjacentKeys( origin );

    reanchor.call( this, origin, keys );

  };

  var reanchor = function( hook, keys ) {

    for( var i = 0; i < keys.length; i++ ) {

      if( !this.anchored( keys[ i ] ) ) {

        var sphere = this.board[ keys[ i ] ];

        if( sphere && sphere.state === 'L' ) {

          delete this.board[ keys[ i ] ];

        } else if( sphere ) {

          replace.call( this, hook, keys[ i ] );

        }

      }

    }

  };

  var itself = this.board[ coordinates ];

  itself.state = 'L';

  if( itself.leafy ) {

    this.leaves[ itself.valence ] -= 1;

    itself.leafy = false;

    while( this.leaves[ this.leaves.length - 1 ] === 0 ) {

      this.leaves.pop( );

    }

  }

  if( itself.valence === 1 ) {

    this.leaves[ 0 ] += 1;

  }

  var keys = adjacentKeys( coordinates );

  reanchor.call( this, coordinates, keys );

  this.searchAndDestroy( coordinates );

};

module.exports = remove;