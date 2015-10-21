var get = function( x, y ) {
  // This is here to avoid writing
  // this.board.get every time we
  // need a piece.
  return this.board.get( x, y );
};
module.exports = get;