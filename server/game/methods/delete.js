var deletion = function( x, y ) {
  // This is needed because the board
  // class protects the spheres array
  // from bracket access.
  this.board.delete( x, y );
};
module.exports = deletion;