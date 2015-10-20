var chai = require( '../../../node_modules/chai/chai.js' );
var expect = chai.expect;
var Game = require( '../../game/game.js' );
var Sphere = require( '../../game/sphere.js' );
describe( 'A game\'s forNeighbors method', function( ) { // A standard describe block
  it( 'should run a callback four times for each coordinate', function( ) {
    var game = new Game( );
    var count = 0;
    var callback = function( ) {
      count++;
    };
    game.forNeighbors( 0, 0, callback );
    expect( count ).to.equal( 4 );
  });
  it( 'should traverse through both sphere\'s and undefined nodes', function( ) {
    var game = new Game( );
    var spheres = 0;
    var notSpheres = 0;
    var callback = function( neighbor ) {
      if( neighbor instanceof Sphere ) {
        spheres++;
      } else {
        notSpheres++;
      }
    };
    game.forNeighbors( 1, 0, callback );
    expect( notSpheres ).to.equal( 3 );
    expect( spheres ).to.equal( 1 );
  });
});