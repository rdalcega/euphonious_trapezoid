var chai = require( '../../../node_modules/chai/chai.js' );
var expect = chai.expect;
var Game = require( '../../game/game.js' );
describe( 'A game\'s getState method', function( ) { // A standard describe block
  it( 'should get pieces that are on the game\'s board', function( ) {
    var game = new Game( );
    game.put( 0, 1, '0' );
    var state = game.getState( );
    expect( state.length ).to.equal( 2 );
    if( state[ 0 ].state === 'A' ) {
      expect( state[ 0 ].coordinates.x ).to.equal( 0 );
      expect( state[ 0 ].coordinates.y ).to.equal( 0 );
      expect( state[ 1 ].state ).to.equal( '0' );
      expect( state[ 1 ].coordinates.x ).to.equal( 0 );
      expect( state[ 1 ].coordinates.y ).to.equal( 1 );
    } else {
      expect( state[ 1 ].state ).to.equal( 'A' );
      expect( state[ 1 ].coordinates.x ).to.equal( 0 );
      expect( state[ 1 ].coordinates.y ).to.equal( 0 );
      expect( state[ 0 ].state ).to.equal( '0' );
      expect( state[ 0 ].coordinates.x ).to.equal( 0 );
      expect( state[ 0 ].coordinates.y ).to.equal( 1 );
    }
  });
});