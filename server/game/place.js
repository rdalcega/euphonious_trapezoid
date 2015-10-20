var Sphere = require( './sphere.js' );
var place = function( x, y, state, valence ) {
  return this.board.place( x, y, new Sphere({
    state: state,
    valence: valence,
    coordinates: {
      x: x,
      y: y
    }
  }));
};
module.exports = place;