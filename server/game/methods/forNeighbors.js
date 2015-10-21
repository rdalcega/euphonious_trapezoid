var forNeighbors = function( x, y, callback ) {
  // Use this method to perform an 
  // operation on each neighbor of
  // the piece at x, y. The operation
  // delineated by callback will run
  // even if the neighbor is undefined.
  [
    { x: x, y: y + 1 },
    { x: x + 1, y: y },
    { x: x, y: y - 1 },
    { x: x - 1, y: y }
  ].forEach( function( coordinates ) {
    callback( this.get( coordinates.x, coordinates.y ), coordinates );
  }.bind( this ) );
};
module.exports = forNeighbors;