var Sphere = function( options ) {
  // options object must have 'state', 'valence',
  // and 'coordinates' properties. It can have 'leafy'
  // property. If 'leafy' is not specified, it defaults
  // to false.
  options.leafy = options.leafy || false;
  if( !options.state || options.valence === undefined || !options.coordinates ) {
    throw new TypeError(
      'Options object must have "state", "valence", and "coordinates" properties.' +
      ' If "leafy" is not specified, it defaults to false.'
    );
  }
  var valid = {};
  valid.states = {

    'A': true,
    'L': true,
    '0': true,
    '1': true,
    '2': true,
    '3': true

  };
  valid.ate = function( property, value ) {
    if( property === 'state' ) {

      if( typeof value === 'string' ) {
        if( valid.states[ value ] ) {
          return true;
        } else {
          throw new RangeError(
            'State must be A, L, or 0-3'
          );
        }
      } else {
        throw new TypeError(
          'State must be a string'
        );
      }

    } else if( property === 'valence' ) {

      if( typeof value === 'number' ) {
        if( this.state === 'A' ) {
          if( value === 0 ) return true;
          else {
            throw new RangeError(
              'Valence must be 0 for the anchor'
            );
          }
        } else {
          if( value > 0 ) return true;
          else {
            throw new RangeError(
              'Valence must be greater than 0 for non-anchor spheres'
            );
          }
        }
      } else {
        throw new TypeError(
          'Valence must be a number'
        );
      }

    } else if( property === 'leafy' ) {

      if( typeof value === 'boolean' ) {
        if( this.state === 'A' || this.state === 'L' ) {
          if( value === false ) {
            return true;
          } else {
            throw new RangeError(
              'Leafy must be false for the anchor and for any liberty'
            );
          }
        } else {
          return true;
        }
      } else {
        throw new TypeError(
          'Leafy must be a boolean'
        );
      }

    } else if( property === 'coordinates' ) {

      if( value.hasOwnProperty( 'x' ) && value.hasOwnProperty( 'y' ) ) {
        if( typeof value.x === 'number' && typeof value.y === 'number' ) {
          if( value.x % 1 === 0 && value.y % 1 === 0 ) {
            if( this.state === 'A' ) {
              if( value.x === 0 && value.y === 0 ) {
                return true;
              } else {
                throw new RangeError(
                  'The anchor must be at ( 0, 0 )'
                );
              }
            } else {
              if( value.x === 0 && value.y === 0 ) {
                throw new RangeError(
                  'Only the anchor can be placed at ( 0, 0 )'
                );
              } else {
                return true;
              }
            }
          } else {
            throw new TypeError(
              'Both x and y must be integers'
            );
          }
        } else {
          throw new TypeError(
            'Both x and y must be numbers'
          );
        }
      } else {
        throw new TypeError(
          'Coordinates must have an x property and a y property'
        );
      }

    }
  };
  var set = function( property ) {
    return function( value ) {
      if( valid.ate.call( this, property, value ) ) {
        options[ property ] = value;
      }
    };
  };
  var get = function( property ) {
    return function() {
      return options[ property ];
    };
  };
  [ 'state', 'valence', 'leafy', 'coordinates' ].
    forEach( function( property ) {
      valid.ate.call( this, property, options[ property ] );
      Object.defineProperty(
        this,
        property,
        {
          get: get( property ),
          set: set( property )
        }
      );
    }.bind( this ));
};
Sphere.prototype.copy = function( ) {
  return new Sphere({
    state: this.state,
    valence: this.valence,
    coordinates: this.coordinates,
    leafy: this.leafy
  });
};
module.exports = Sphere;