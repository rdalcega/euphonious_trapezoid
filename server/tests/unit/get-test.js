var chai = require( '../../../node_modules/chai/chai.js' );
var expect = chai.expect;
var Game = require( '../../game/game.js' );
var Sphere = require( '../../game/sphere.js' );
describe( 'A game\'s get method', function( ) { // A standard describe block
  it( 'should get pieces that are on the game\'s board', function( ) {
    var game = new Game( );
    expect( game.get( 0, 0 ) ).to.be.an.instanceof( Sphere );
    expect( game.get( 0, 0 ).state ).to.equal( 'A' );
    expect( game.get( 0, 1 ).state ).to.equal( 'L' );
    expect( game.get( 1, 0 ).state ).to.equal( 'L' );
    expect( game.get( 0, -1 ).state ).to.equal( 'L' );
    expect( game.get( -1, 0 ).state ).to.equal( 'L' );
  });
  it( 'should return undefined for pieces that are\'nt on the game\'s board', function( ) {
    var game = new Game( );
    expect( game.get( 1, 1 ) ).to.be.undefined;
  });
});