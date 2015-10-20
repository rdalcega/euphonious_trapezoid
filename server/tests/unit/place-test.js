var chai = require( '../../../node_modules/chai/chai.js' );
var expect = chai.expect;
var Game = require( '../../game/game.js' );
var Sphere = require( '../../game/sphere.js' );
describe( 'A game\'s place method', function( ) { // A standard describe block
  it( 'should place pieces that are liberties on the game\'s board', function( ) {
    var game = new Game( );
    expect( game.place( 1, 1, 'L', 2 ) ).to.be.true;
    expect( game.get( 1, 1 ) ).to.be.an.instanceof( Sphere );
    expect( game.get( 1, 1 ).state ).to.equal( 'L' );
  });
  it( 'should throw a TypeError when placing pieces that are not liberties', function( ) {
    var game = new Game( );
    expect( game.place.bind( null, 1, 1, '0', 2 ) ).to.throw( TypeError );
  });
  it( 'should not place pieces on spots that are already occupied', function( ) {
    var game = new Game( );
    expect( game.place( 1, 0, 'L', 1 ) ).to.be.false;
  });
});