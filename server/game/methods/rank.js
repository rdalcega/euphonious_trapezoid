var rank = function( ) {
  var scores = {
    '0': 0,
    '1': 0,
    '2': 0,
    '3': 0
  };
  this.board.forEach( function( sphere ) {
    if( sphere.state !== 'L' && sphere.state !== 'A' ) {
      scores[ sphere.state ]++;
    }
  });
  return ['0', '1', '2', '3'].sort( function( a, b ) {
    return scores[ b ] - scores[ a ];
  });
};
module.exports = rank;