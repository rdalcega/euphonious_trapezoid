var insert = function( coordinates, state ) {

  var node = this.board[ coordinates ];

  if( !node || node.state !== 'L' ) {

    return false;

  } else {

    node.state = state;

    if( node.valence === 1 ) {

      this.leaves[ 0 ] -= 1;

    }

    this.adjust( coordinates );

    this.maximumValence = this.leaves.length - 1;

    for( var i = 0; i < this.leaves.length; i++ ) {

      if( this.leaves[ i ] !== 0 ) {

        this.minimumValence = i;

        break;

      }

    }

    // Check for chains!

    var chain = this.detectChain( coordinates );

    if( chain.destroy ) {

      chain.chain = chain.chain.sort( function( key1, key2 ) {

        return this.board[ key2 ].valence - this.board[ key1 ].valence;

      }.bind( this ));

      for( var i = 0; i < chain.chain.length; i++ ) {

        this.remove( chain.chain[ i ] );

      }

    }

    return true;

  }

};

module.exports = insert;