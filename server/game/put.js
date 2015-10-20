var put = function( x, y, state ) {
  var sphere = this.get( x, y );
  var event = {
    coordinates: {
      x: x,
      y: y
    },
    state: state
  };
  if( sphere ) {
    if( sphere.state === 'L' ) {
      if( sphere.valence === 1 ) {
        this._leaves[ 0 ] -= 1;
      }
      sphere.state = state;
      this.restore( x, y );
      event.success = true;
      this.emit( 'put', event );
      return true;
    }
  }
  event.success = false;
  this.emit( 'put', event );
  return false;
};
module.exports = put;