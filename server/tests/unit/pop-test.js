var chai = require( '../../../node_modules/chai/chai.js' );
// var assert = chai.assert;
var expect = chai.expect;
// var sinon = require( '../../node_modules/sinon/pkg/sinon.js' );

var Game = require( '../../game/game.js' );

describe( 'A game\'s pop method', function( ) { // A standard describe block
  var game = new Game();
  it( 'should pop restoring the board\'s state', function( ) {
    game.insert( '1:0', '1' );
    game.insert( '0:1', '1' );
    game.insert( '-1:0', '1' );
    game.insert( '0:-1', '1' );
    game.insert( '2:0', '2' );
    game.insert( '3:0', '3' );
    game.insert( '4:0', '0' );

    var three = game.pop( '3:0' );
    var four = game.pop( '4:0' );

    expect( three.state ).to.equal( '3' );
    expect( four.state ).to.equal( '0' );
    expect( three.valence ).to.equal( 3 );
    expect( four.valence ).to.equal( 4 );

    expect( game.leaves ).to.deep.equal( [0, 3, 1] );
    expect( game.maximumValence ).to.equal( 2 );
    expect( game.minimumValence ).to.equal( 1 );

    expect( game.board[ '3:0' ].state ).to.equal( 'L' );
    expect( game.board[ '4:0' ] ).to.be.undefined;

  });
});