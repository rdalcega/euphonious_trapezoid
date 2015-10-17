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

// var anchored = function(coordinates, ignore) {

//   if (coordinates === '0:0') {

//     return true;

//   }

//   var keys = adjacentKeys( coordinates );

//   for (var i = 0; i < keys.length; i++) {

//     if ( keys[i] !== ignore && this.board[keys[i]] && this.board[keys[i]].state !== 'L') {

//       if (this.anchored(keys[i], coordinates)) {

//         return true;

//       }

//     }

//   }

//   return false;

// };

module.exports = detectChain;