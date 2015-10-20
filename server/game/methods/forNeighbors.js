var forNeighbors = function( x, y, callback ) {
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