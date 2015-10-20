var updateLeaves = function( x, y, options ) {
  var sphere = this.get( x, y );
  options = options || {};
  if( !options.increment ) {
    options.increment = function( ) {
      this._leaves[ sphere.valence ] =
        this._leaves[ sphere.valence ] || 0;
      this._leaves[ sphere.valence ]++;
    }.bind( this );
  }
  if( !options.decrement ) {
    options.decrement = function( ) {
      this._leaves[ sphere.valence ]--;
    }.bind( this );
  }
  if( sphere.state === 'A' ) {
    return;
  }
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