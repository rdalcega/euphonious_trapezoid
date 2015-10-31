var getState = function( ) {
  var state = [];
  this.board.forEach( function( sphere ) {
    if( sphere.state !== 'L' ) {
      state.push({
        coordinates: sphere.coordinates,
        state: sphere.state,
        valence: sphere.valence,
        id: sphere.id
      });
    }
  });
  return state;
};
module.exports = getState;