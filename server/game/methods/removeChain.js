var removeChain = function( chain ) {
  var reanchor = function( anchored ) {
    this.forNeighbors( anchored.x, anchored.y, function( neighbor, coordinates ) {
      if( neighbor && !this.anchored( coordinates.x, coordinates.y ) ) {
        if( neighbor.state === 'L' ) {
          this.delete( coordinates.x, coordinates.y );
        } else if( neighbor ) {
          replace( anchored, coordinates );
        }
      }
    }.bind( this ));
  }.bind( this );
  var replace = function( to, from ) {
    var event = {
      to: to,
      from: from
    };
    from = this.get( from.x, from.y );
    event.state = from.state;
    from.state = 'L';
    from = from.coordinates;
    this.updateLeaves( from.x, from.y );
    this.put( to.x, to.y, event.state );
    event.success = true;
    this.emit( 'moved', event );
    reanchor( from );
  }.bind( this );
  var remove = function( x, y ) {
    var sphere = this.get( x, y );
    var event = {
      coordinates: {
        x: x,
        y: y
      },
      state: sphere.state
    };
    var cascade = { should: sphere.state };
    sphere.state = 'L';
    this.updateLeaves( x, y );
    if( sphere.valence === 1 ){
      this.leaves[ 0 ] += 1;
    }
    event.success = true;
    this.emit( 'removed', event );
    reanchor( { x: x, y: y } );
    cascade.chain = this.detectChain( x, y );
    cascade.should = !( this.get( x, y ).state === cascade.should );
    cascade.should = cascade.should && cascade.chain.remove;
    if( cascade.should ) {
      this.removeChain( cascade.chain.chain );
    }
  }.bind( this );
  chain.forEach( function( coordinates ) {
    remove( coordinates.x, coordinates.y );
  }.bind( this ));
};
module.exports = removeChain;