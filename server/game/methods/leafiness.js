var leafiness = function( x, y ) {
  // A sphere is leafy if it is
  // surrounded by sphere's whose valence
  // are less than its own. That is to say,
  // a sphere is not leafy if at least
  // one of it's neighbors has a valence
  // greater than it's own.
  var sphere = this.get( x, y );
  var leafy = true;
  // Sphere's that are liberties
  // cannot be leafy.
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