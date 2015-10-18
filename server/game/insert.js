var insert = function( coordinates, state, dontSearchChains, dontRebalance ) {

  var node = this.board[ coordinates ];

  if( !node || node.state !== 'L' ) {

    return false;

  } else {

    node.state = state;

    if( node.valence === 1 ) {

      this.leaves[ 0 ] -= 1;

    }

    this.adjust( coordinates );

    // Check for chains!

    if( !dontSearchChains ) {

      this.searchAndDestroy( coordinates );

    }

    if( !dontRebalance && this.maximumValence > this.minimumValence + 3 ) {

      this.rebalance( );

    }

    return true;

  }

};

module.exports = insert;