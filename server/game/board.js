var Sphere = require( './sphere.js' );
var Board = function( ) {
  var spheres = {
    '0:0': new Sphere({ // Anchor
      state: 'A',
      valence: 0,
      coordinates: {
        x: 0,
        y: 0
      }
    }),
    '0:1': new Sphere({ // Liberty
      state: 'L',
      valence: 1,
      coordinates: {
        x: 0,
        y: 1
      }
    }),
    '1:0': new Sphere({ // Liberty
      state: 'L',
      valence: 1,
      coordinates: {
        x: 1,
        y: 0
      }
    }),
    '0:-1': new Sphere({ // Liberty
      state: 'L',
      valence: 1,
      coordinates: {
        x: 0,
        y: -1
      }
    }),
    '-1:0': new Sphere({ // Liberty
      state: 'L',
      valence: 1,
      coordinates: {
        x: -1,
        y: 0
      }
    })
  };
  this.get = function( x, y ) {
    if( x % 1 === 0 && y % 1 === 0 ) {
      return spheres[ x + ':' + y ];
    } else {
      throw new RangeError(
        'Either ' + x + ' or ' + y + ' is not an integer'
      );
    }
  };
  this.place = function( x, y, sphere ) {
    if( this.get( x, y ) ) {
      return false;
    } else {
      if( sphere instanceof Sphere ) {
        sphere.coordinates = {
          x: x,
          y: y
        };
        spheres[ x + ':' + y ] = sphere;
        return true;
      } else {
        throw new TypeError(
          sphere + ' is not of type sphere'
        );
      }
    }
  };
  this.delete = function( x, y ) {
    delete spheres[ x + ':' + y ];
  };
  this.forEach = function( callback ) {
    for( var coordinates in spheres ) {
      callback( spheres[ coordinates ], spheres[ coordinates ].coordinates );
    }
  };
};
module.exports = Board;