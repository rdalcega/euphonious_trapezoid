var parse = require( './parse.js' );
var detectChain = function( x, y, chain ) {
  var sphere = this.get( x, y );
  chain = chain || [];
  chain.push( x + ':' + y );
  this.forNeighbors( x, y, function( neighbor, coordinates ) {
    if( neighbor && neighbor.state === sphere.state ) {
      if( chain.indexOf( coordinates.x + ':' + coordinates.y ) < 0 ) {
        this.detectChain( coordinates.x, coordinates.y, chain );
      }
    }
  }.bind( this ));
  return {
    remove: chain.length > this.chainThreshold,
    chain: chain.map( function( coordinates ) {
      coordinates = parse( coordinates );
      return {
        x: coordinates.x,
        y: coordinates.y
      };
    }).sort( function( a, the ) {
      return this.get( the.x, the.y ).valence - this.get( a.x, a.y ).valence;
    }.bind( this ))
  };
};
module.exports = detectChain;