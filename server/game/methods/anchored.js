var anchored = function( x, y, ignore ) {
  // A piece is anchored if there is a
  // path, over pieces that are not liberties,
  // from that piece to the anchor.
  // This functions determines whether or
  // not such a path exists.
  var sphere = this.get( x, y );
  ignore = ignore || { x: x, y: y };
  // Baduh, the anchor is anchored.
  if( sphere && sphere.state === 'A' ) {
    return true;
  }
  // Other pieces are anchored only
  // if one of their neighboring pieces
  // that is not a liberty is anchored.
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