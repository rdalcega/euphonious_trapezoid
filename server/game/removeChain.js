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
  var replace = function( destination, origin ) {
    var original = this.get( origin.x, origin.y );
    var originalState = original.state;
    original.state = 'L';
    this.updateLeaves( origin.x, origin.y );
    this.put( destination.x, destination.y, originalState );
    reanchor( origin );
  }.bind( this );
  var remove = function( x, y ) {
    var sphere = this.get( x, y );
    var cascade = { should: sphere.state };
    sphere.state = 'L';
    this.updateLeaves( x, y );
    if( sphere.valence === 1 ){
      this.leaves[ 0 ] += 1;
    }
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