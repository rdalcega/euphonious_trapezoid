var chai = require( '../../../node_modules/chai/chai.js' );
var expect = chai.expect;
var Game = require( '../../game/game.js' );
describe( 'A game\'s updateLeaves method', function( ) {
  it( 'should not affect the leaves array of a new game', function( ) {
    var game = new Game( );
    expect( game.updateLeaves( 0, 0 ) );
    expect( game.leaves ).to.deep.equal( [4] );
  });
  it( 'should update the leaves array of a modified game', function( ) {
    var game = new Game( );
    game.get( 1, 0 ).state = '0';
    game._leaves[ 0 ]--;
    expect( game.place( 1, 1, 'L', 2 ) ).to.be.true;
    expect( game.place( 1, -1, 'L', 2 ) ).to.be.true;
    expect( game.place( 2, 0, 'L', 2 ) ).to.be.true;
    game.updateLeaves( 1, 0 );
    expect( game.leaves ).to.deep.equal( [3, 1] );
  });
});