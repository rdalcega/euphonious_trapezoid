var put = function( x, y, state ) {
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