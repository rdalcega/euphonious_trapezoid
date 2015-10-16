var insertNode = function( coordinates, state ) {

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

    return true;

  }

};

module.exports = insertNode;