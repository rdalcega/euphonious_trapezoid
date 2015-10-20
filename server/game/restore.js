var restore = function( x, y ) {
  var sphere = this.get( x, y );
  if( sphere.state === 'L' ) {
    return;
  }
  var changed = {};
  var queue = [];
  this.forNeighbors( x, y, function( neighbor, coordinates ) {
    if( neighbor ) {
      if( neighbor.valence > sphere.valence + 1 ) {
        changed[
          coordinates.x + ':' +
          coordinates.y
        ] = neighbor.valence;
        queue.push({
          x: coordinates.x,
          y: coordinates.y
        });
        neighbor.valence = sphere.valence + 1;
      }
    } else {
      if( this.place( coordinates.x, coordinates.y, 'L', sphere.valence + 1 ) ) {
        return true;
      } else {
        return false;
      }
    }
  }.bind( this ));
  this.updateLeaves( x, y );
  this.forNeighbors( x, y, function( neighbor, coordinates ) {
    if( neighbor.state !== 'L' ) {
      this.updateLeaves( coordinates.x, coordinates.y, {
        decrement: function( ) {
          var key = coordinates.x + ':' +
                    coordinates.y;
          if( changed[ key ] ) {
            this._leaves[ changed[ key ] ] -= 1;
          } else {
            this._leaves[ neighbor.valence ] -= 1;
          }
        }.bind( this )
      });
    }
  }.bind( this ));
  queue.forEach( function( coordinates ) {
    this.restore( coordinates.x, coordinates.y );
  }.bind( this ));
};
module.exports = restore;