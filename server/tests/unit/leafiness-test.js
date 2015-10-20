var chai = require( '../../../node_modules/chai/chai.js' );
var expect = chai.expect;
var Game = require( '../../game/game.js' );
describe( 'A game\'s leafiness method', function( ) { // A standard describe block
  it( 'should return true for the anchor of a new game', function( ) {
    var game = new Game( );
    expect( game.leafiness( 0, 0 ) ).to.be.true;
  });
  it( 'should return false for the anchor of a modified game', function( ) {
    var game = new Game( );
    game.get( 0, 1 ).state = '0';
    expect( game.leafiness( 0, 0 ) ).to.be.false;
  });
});