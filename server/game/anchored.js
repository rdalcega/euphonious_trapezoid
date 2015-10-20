var anchored = function( x, y, ignore ) {
  var sphere = this.get( x, y );
  ignore = ignore || { x: x, y: y };
  if( sphere && sphere.state === 'A' ) {
    return true;
  }
  var anchor = false;
  this.forNeighbors( x, y, function( neighbor, coordinates ) {
    if( coordinates.x !== ignore.x || coordinates.y !== ignore.y ) {
      if( neighbor && neighbor.state !== 'L' ) {
        if( this.anchored( coordinates.x, coordinates.y, { x: x, y: y } ) ) {
          anchor = true;
        }
      }
    }
  }.bind( this ));
  return anchor;
};
module.exports = anchored;