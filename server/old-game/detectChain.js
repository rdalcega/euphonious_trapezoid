var adjacentKeys = require( './adjacentKeys.js' );

var detectChain = function( coordinates, chain ) {

  chain = chain || [];

  chain.push( coordinates );

  var keys = adjacentKeys( coordinates );

  for( var i = 0; i < keys.length; i++ ) {

    var sphere = this.board[ keys[ i ] ];

    if( chain.indexOf( keys[ i ] ) < 0 && sphere.state === this.board[ coordinates ].state ) {

      this.detectChain( keys[ i ], chain );

    }

  }

  return {

    destroy: chain.length >= 5,

    chain: chain

  };

};

module.exports = detectChain;