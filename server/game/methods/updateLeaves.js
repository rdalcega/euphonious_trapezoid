var updateLeaves = function( x, y, options ) {
  var sphere = this.get( x, y );
  options = options || {};
  // options.increment is the
  // function that will be used
  // to increment the leaves array
  // in the case that a new leaf has been
  // created.
  if( !options.increment ) {
    options.increment = function( ) {
      this._leaves[ sphere.valence ] =
        this._leaves[ sphere.valence ] || 0;
      this._leaves[ sphere.valence ]++;
    }.bind( this );
  }
  // options.decrement is the function
  // that will be used to decrement
  // the leaves array in the case
  // that an old leaf has been removed.
  if( !options.decrement ) {
    options.decrement = function( ) {
      this._leaves[ sphere.valence ]--;
    }.bind( this );
  }
  // For the most part, incrementing
  // and decrementing will be handled by
  // the default functions. The one extant
  // exception exists inside of restore,
  // where the decrement function takes
  // factors other than the sphere.valence into account.
  if( sphere.state === 'A' ) {
    // Never call update leaves on
    // the anchor! But in case you do,
    // it won't do anything. We've got your back.
    return;
  }
  // If the boolean property leafy of
  // the sphere is not the same as
  // the boolean value returned
  // by the leafiness method,
  // this is because the leafiness of
  // the sphere has changed. We must
  // therefore increment if a new leaf has
  // come to existence, or decrement
  // if an old leaf has vanished.
  var leafy = this.leafiness( x, y );
  if( sphere.leafy !== leafy ) {
    sphere.leafy = leafy;
    if( sphere.leafy ) {
      options.increment( );
    } else {
      options.decrement( );
    }
  }
};
module.exports = updateLeaves;