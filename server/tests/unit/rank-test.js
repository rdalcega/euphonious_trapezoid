var chai = require( '../../../node_modules/chai/chai.js' );
var expect = chai.expect;
var Game = require( '../../game/game.js' );
describe( 'A game\'s rank method', function( ) { // A standard describe block
  it( 'return an array of states sorted from winner to loser', function( ) {
    var game = new Game( );
    game.put( 0, 1, '3' );
    game.put( 1, 0, '3' );
    game.put( 0, -1, '3' );
    game.put( -1, 0, '2' );
    game.put( 0, 2, '2' );
    game.put( 2, 0, '1' );
    expect( game.rank( ) ).to.deep.equal( [ '3', '2', '1', '0' ] );
  });
});