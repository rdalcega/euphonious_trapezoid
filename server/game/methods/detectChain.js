var parse = require( '../helpers/parse.js' );
var detectChain = function( x, y, chain ) {
  // A chain is a collection of neighboring
  // spheres with the same state.
  // This function finds the largest chain
  // that includes the piece at ( x, y )
  // on the game's board.
  var sphere = this.get( x, y );
  // Never detect chains of liberties
  if( sphere.state === 'L' ) {
    return {
      remove: false
    };
  }
  chain = chain || [];
  chain.push( x + ':' + y );
  // If any of the piece's neighbors is
  // has the same state as the piece,
  // then the chain extends to the largest chain
  // that includes the neighbor.
  this.forNeighbors( x, y, function( neighbor, coordinates ) {
    if( neighbor && neighbor.state === sphere.state ) {
      if( chain.indexOf( coordinates.x + ':' + coordinates.y ) < 0 ) {
        this.detectChain( coordinates.x, coordinates.y, chain );
      }
    }
  }.bind( this ));
  // The chain is returned in
  // order of descending valence.
  // The chain should be removed
  // if it's length is greater than
  // whatever length is defined as
  // the chain threshold in the game.
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