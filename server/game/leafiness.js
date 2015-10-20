var leafiness = function( x, y ) {
  var sphere = this.get( x, y );
  var leafy = true;
  if( sphere.state === 'L' ) {
    return false;
  }
  this.forNeighbors( x, y, function( neighbor ) {
    if( neighbor && neighbor.state !== 'L' && neighbor.valence > sphere.valence ) {
      leafy = false;
    }
  });
  return leafy;
};
module.exports = leafiness;