var insert = function( event ) {
  // We expect event to have the following form
  var coordinates = event.coordinates;
  var state = event.state;
  if( this.put( coordinates.x, coordinates.y, state ) ) {
    var chain = this.detectChain( coordinates.x, coordinates.y );
    if( chain.remove ) {
      this.removeChain( chain.chain );
    }
    if( !this.balanced ) {
      this.rebalanced( );
    }
  }
};
module.exports = insert;