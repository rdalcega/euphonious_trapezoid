var getState = function( ) {
  var state = [];
  this.board.forEach( function( sphere ) {
    if( sphere.state !== 'L' ) {
      state.push({
        coordinates: sphere.coordinates,
        state: sphere.state
      });
    }
  });
  return state;
};
module.exports = toString;