var chai = require( '../../../node_modules/chai/chai.js' );
var expect = chai.expect;
var Sphere = require( '../../game/sphere.js' );
describe( 'the sphere class', function( ) {
  it( 'should initialize with state, valence, leafy, and coordinates properties', function( ) {
    var sphere = new Sphere({
      state: 'A',
      valence: 0,
      leafy: false,
      coordinates: {
        x: 0,
        y: 0
      }
    });
    expect( sphere.state ).to.equal( 'A' );
    expect( sphere.valence ).to.equal( 0 );
    expect( sphere.leafy ).to.be.false;
    expect( sphere.coordinates.x ).to.equal( 0 );
    expect( sphere.coordinates.y ).to.equal( 0 );
  });
  it( 'should initialize with state, valence, and coordinates properties', function( ) {
    var sphere = new Sphere({
      state: 'L',
      valence: 1,
      coordinates: {
        x: 1,
        y: 0
      }
    });
    expect( sphere.state ).to.equal( 'L' );
    expect( sphere.valence ).to.equal( 1 );
    expect( sphere.leafy ).to.be.false;
    expect( sphere.coordinates.x ).to.equal( 1 );
    expect( sphere.coordinates.y ).to.equal( 0 );
  });
  it( 'should throw a TypeError when intializing without state, valence, or coordinates property', function( ) {
    expect( Sphere.call.bind( Sphere, {}, {
      valence: 0,
      coordinates: {
        x: 0,
        y: 0
      }
    })).to.throw( TypeError );
    expect( Sphere.call.bind( Sphere, {}, {
      state: 'A',
      coordinates: {
        x: 0,
        y: 0
      }
    })).to.throw( TypeError );
    expect( Sphere.call.bind( Sphere, {}, {
      state: 'A',
      valence: 0
    })).to.throw( TypeError );
  });
  it( 'should throw a RangeError when trying to initialize with an invalid state', function( ) {
    expect( Sphere.call.bind( Sphere, {}, {
      state: '4',
      valence: 0,
      coordinates: {
        x: 0,
        y: 0
      }
    })).to.throw( RangeError );
  });
  it( 'should throw a TypeError when trying to initialize with a non-string state', function( ) {
    expect( Sphere.call.bind( Sphere, {}, {
      state: 22,
      valence: 0,
      coordinates: {
        x: 0,
        y: 0
      }
    })).to.throw( TypeError );
  });
  it( 'should throw a RangeError when trying to initialize an off-center anchor', function( ) {
    expect( Sphere.call.bind( Sphere, {}, {
      state: 'A',
      valence: 0,
      coordinates: {
        x: 1,
        y: 0
      }
    })).to.throw( RangeError );
    expect( Sphere.call.bind( Sphere, {}, {
      state: 'A',
      valence: 1,
      coordinates: {
        x: 0,
        y: 0
      }
    })).to.throw( RangeError );
  });
  it( 'should throw a RangeError when trying to initialize a centered piece or liberty', function( ) {
    expect( Sphere.call.bind( Sphere, {}, {
      state: 'L',
      valence: 0,
      coordinates: {
        x: 0,
        y: 1
      }
    })).to.throw( RangeError );
    expect( Sphere.call.bind( Sphere, {}, {
      state: '0',
      valence: 1,
      coordinates: {
        x: 0,
        y: 0
      }
    })).to.throw( RangeError );
  });
  it( 'should throw a TypeError when trying to initialize with a non-number valence', function( ) {
    expect( Sphere.call.bind( Sphere, {}, {
      state: '0',
      valence: '1',
      coordinates: {
        x: 1,
        y: 0
      }
    })).to.throw( TypeError );
  });
  it( 'should throw a RangeError when trying to initialize a leafy anchor', function( ) {
    expect( Sphere.call.bind( Sphere, {}, {
      state: 'A',
      valence: 0,
      coordinates: {
        x: 0,
        y: 0
      },
      leafy: true
    })).to.throw( RangeError );
  });
  it( 'should throw a TypeError when trying to initialize with a non-boolean leafy', function( ) {
    expect( Sphere.call.bind( Sphere, {}, {
      state: 'A',
      valence: 0,
      coordinates: {
        x: 0,
        y: 0
      },
      leafy: 'false'
    })).to.throw( TypeError );
  });
  it( 'should throw a TypeError when trying to initialize with non-integer coordinates', function( ) {
    expect( Sphere.call.bind( Sphere, {}, {
      state: 'L',
      valence: 1,
      coordinates: {
        x: 1.1,
        y: 0
      }
    })).to.throw( TypeError );
  });
  it( 'should throw a TypeError when trying to initialize with non-cartesian coordinates', function( ) {
    expect( Sphere.call.bind( Sphere, {}, {
      state: 'L',
      valence: 1,
      coordinates: {
        x: 1
      }
    })).to.throw( TypeError );
  });
  it( 'should throw errors when trying to set invalid properties', function( ) {
    var sphere = new Sphere({
      state: 'A',
      valence: 0,
      coordinates: {
        x: 0,
        y: 0
      },
      leafy: false
    });
    var setWrongState = function( ) {
      sphere.state = 0;
    };
    expect( setWrongState ).to.throw( TypeError );
    var setWrongValence = function( ) {
      sphere.valence = 1;
    };
    expect( setWrongValence ).to.throw( RangeError );
    var setWrongCoordinates = function( ) {
      sphere.coordinates = {};
    };
    expect( setWrongCoordinates ).to.throw( TypeError );
    var setWrongLeafy = function( ) {
      sphere.leafy = true;
    };
    expect( setWrongLeafy ).to.throw( RangeError );
  });
});
