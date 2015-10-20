var searchAndDestroy = function( coordinates ) {

  if( this.board[ coordinates ].state === 'L' ) {

    return;

  }

  var chain = this.detectChain( coordinates );

  if( chain.destroy ) {

    chain.chain = chain.chain.sort( function( key1, key2 ) {

      return this.board[ key2 ].valence - this.board[ key1 ].valence;

    }.bind( this ));

    for( var i = 0; i < chain.chain.length; i++ ) {

      this.remove( chain.chain[ i ] );

    }

  }

};

module.exports = searchAndDestroy;