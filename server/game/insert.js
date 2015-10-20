var insert = function( event ) {
  // We expect event to have the following form
  var coordinates = event.coordinates;
  var state = event.state;
  if( this.put( coordinates.x, coordinates.y, state ) ) {
    event.success = true;
    this.emit( 'put', event );
    var chain = this.detectChain( coordinates.x, coordinates.y );
    if( chain.remove ) {
      this.removeChain( chain.chain );
    }
    if( !this.balanced ) {
      this.rebalance( );
    }
  } else {
    event.success = false;
    this.emit( 'put', event );
  }
  if( this.ended ) {
    this.emit( 'ended', this.rank( ) );
  }
};
module.exports = insert;