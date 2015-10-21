var Sphere = require( '../sphere.js' );
var place = function( x, y, state, valence ) {
  // place is the unopinionated way to place
  // a sphere on the board. This method is
  // meant to be used by put and works, mostly,
  // to avoid writing
  // this.board.place( x, y, new Sphere({...}))
  // each time we intend to modify the board.
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