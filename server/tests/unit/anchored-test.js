var chai = require( '../../../node_modules/chai/chai.js' );
var expect = chai.expect;
var Game = require('../../game/game.js');
describe( 'a game\'s anchored method', function( ) {
  it( 'should return true for pieces that are anchored', function( ) {
    var game = new Game( );
    game.put( 0, 1, '1' );
    game.put( 0, 2, '1');
    game.put( 0, 3, '1');
    expect( game.anchored( 0, 3 ) ).to.be.true;
  });
  it( 'should return false for pieces that are not anchored', function() {
    var game = new Game( );
    game.place( 0, 5, 'L', 5 );
    expect( game.anchored( 0, 5 ) ).to.be.false;
  });
});