var chai = require( '../../../node_modules/chai/chai.js' );
var expect = chai.expect;

var Game = require('../../game/game.js');  

describe( 'a game\'s chain removal', function( ) { // A standard describe block

  var game = new Game( );

  before( function( ) {

    game.insert( '0:1', '1' );
    game.insert( '0:2', '1' );
    game.insert( '0:3', '1' );
    game.insert( '-1:0', '3' );
    game.insert( '-2:0', '2' );
    game.insert( '-3:0', '1' );
    game.insert( '1:0', '0' );
    game.insert( '2:0', '1' );
    game.insert( '3:0', '2' );
    game.insert( '0:-1', '0' );
    game.insert( '0:-2', '2' );
    game.insert( '0:-3', '3' );
    game.insert( '0:4', '1' );
    game.insert( '1:4', '0' );
    game.insert( '-1:4', '2' );
    game.insert( '-2:4', '3' );
    game.insert( '0:5', '1' );

  });

  it( 'should have destroyed the chain of 1s', function( ) {

    expect( game.board[ '0:1' ].state ).to.equal( '0' );
    expect( game.board[ '0:2' ].state ).to.equal( '2' );
    expect( game.board[ '0:3' ].state ).to.equal( '3' );
    expect( game.leaves ).to.deep.equal( [0,0,0,4] );
    expect( game.maximumValence ).to.equal( 3 );
    expect( game.minimumValence ).to.equal( 3 );

  });

  it( 'should destroy 2 chains in cascade', function( ) {

    game = new Game( );

    game.insert( '0:1', '1' );
    game.insert( '0:2', '1' );
    game.insert( '0:3', '1' );
    game.insert( '-1:0', '3' );
    game.insert( '-2:0', '2' );
    game.insert( '-3:0', '1' );
    game.insert( '1:0', '0' );
    game.insert( '2:0', '1' );
    game.insert( '3:0', '2' );
    game.insert( '0:-1', '0' );
    game.insert( '0:-2', '2' );
    game.insert( '0:-3', '3' );
    game.insert( '0:4', '1' );
    game.insert( '1:2', '0' );
    game.insert( '-1:2', '0' );
    game.insert( '-2:2', '0' );
    game.insert( '-3:2', '0' );
    game.insert( '-4:2', '0' );
    game.insert( '0:5', '1' );

    expect( game.board[ '0:1' ].state ).to.equal( 'L' );
    expect( game.minimumValence ).to.equal( 0 );
    expect( game.maximumValence ).to.equal( 3 );
    expect( game.leaves ).to.deep.equal( [1, 0, 0, 3] );

  });

});