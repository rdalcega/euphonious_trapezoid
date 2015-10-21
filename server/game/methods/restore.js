var restore = function( x, y ) {
  // Restore corrects the valence
  // of all the pieces on the board
  // by propagating from (x, y) assuming
  // that before the state of x, y changed,
  // the valence of all the pieces on
  // the board was correct.
  var sphere = this.get( x, y );
  // Don't call restore on a leaf
  // if you can avoid it! But if you do,
  // here's some protection.
  if( sphere.state === 'L' ) {
    return;
  }
  // Because the restore function must
  // propagate for any neighbor sphere
  // that is changed during restoration,
  // we must queue and keep track of those
  // changes.
  var changed = {};
  var queue = [];
  // The valence of a neighboring sphere must
  // always be at most one more than the valence
  // of the first sphere. If the neighboring sphere
  // does not exist, we create a new liberty because
  // each spot around an existing sphere must be a sphere,
  // even if that sphere is a liberty.
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
  // We update leaves at the center.
  this.updateLeaves( x, y );
  // Then we update leaves for each of
  // the neighbors, using a modified decrement
  // function that takes into account that
  // some of the neighbors had a higher valence
  // before the execution of the code above.
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
  // Finally, propagate restore to all spheres
  // that were changed.
  queue.forEach( function( coordinates ) {
    this.restore( coordinates.x, coordinates.y );
  }.bind( this ));
};
module.exports = restore;