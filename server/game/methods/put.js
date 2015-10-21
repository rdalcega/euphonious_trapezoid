var put = function( x, y, state ) {
  // Put not only changes the state of a liberty.
  // Put changes the state of a liberty and
  // then restores the board to a state
  // where all the leaves and valences are
  // correct. Most of the work for this
  // second behavior is handled by the
  // restore methods.
  var sphere = this.get( x, y );
  if( sphere ) {
    if( sphere.state === 'L' ) {
      if( sphere.valence === 1 ) {
        this._leaves[ 0 ] -= 1;
      }
      sphere.state = state;
      this.restore( x, y );
      return true;
    }
  }
  return false;
};
module.exports = put;