var chai = require( '../../../node_modules/chai/chai.js' );
// var assert = chai.assert;
var expect = chai.expect;
// var sinon = require( '../../node_modules/sinon/pkg/sinon.js' );

var Game = require( '../../game/game.js' );

describe( 'A game\'s rebalance method', function( ) { // A standard describe block
  var game;
  it( 'should rebalance an unbalanced board', function( ) {

    game = new Game( );

    game.insert( '-1:0', '1' );
    game.insert( '1:0', '1' );
    game.insert( '0:1', '2' );
    game.insert( '0:2', '2' );
    game.insert( '0:3', '2' );
    game.insert( '0:4', '1' );

    expect( game.board[ '0:1' ].state ).to.equal( '1' );
    expect( game.board[ '0:2' ].state ).to.equal( '2' );
    expect( game.board[ '0:3' ].state ).to.equal( '1' );
    expect( game.board[ '-1:0' ].state ).to.equal( '2' );
    expect( game.board[ '-2:0' ].state ).to.equal( '2' );
    expect( game.board[ '0:-1' ].state ).to.equal( '1' );

    expect( game.leaves ).to.deep.equal( [1, 1, 1, 1] );
    expect( game.maximumValence ).to.equal( 3 );
    expect( game.minimumValence ).to.equal( 0 );

  });

  it( 'should rebalance an unbalanced board', function( ) {

    game = new Game( );

    game.insert( '0:1', '0' );
    game.insert( '0:2', '1' );
    game.insert( '0:3', '2' );
    game.insert( '0:4', '3' );

    expect( game.board[ '0:1' ].state ).to.equal( '2' );
    expect( game.board[ '0:2' ].state ).to.equal( '3' );
    expect( game.board[ '-1:0' ].state ).to.equal( '0' );
    expect( game.board[ '-2:0' ].state ).to.equal( '1' );

    expect( game.leaves ).to.deep.equal( [2, 0, 2] );
    expect( game.maximumValence ).to.equal( 2 );
    expect( game.minimumValence ).to.equal( 0 );

  });

  it( 'should rebalance an unbalanced board', function( ) {

    game = new Game( );

    game.insert( '0:1', '0' );
    game.insert( '0:2', '1' );
    game.insert( '0:3', '2' );
    game.insert( '0:4', '3' );

    expect( game.board[ '0:1' ].state ).to.equal( '2' );
    expect( game.board[ '0:2' ].state ).to.equal( '3' );
    expect( game.board[ '-1:0' ].state ).to.equal( '0' );
    expect( game.board[ '-2:0' ].state ).to.equal( '1' );

    expect( game.leaves ).to.deep.equal( [2, 0, 2] );
    expect( game.maximumValence ).to.equal( 2 );
    expect( game.minimumValence ).to.equal( 0 );

  });

  it( 'should rebalance an unbalanced board', function( ) {

    game = new Game( );

    game.insert( '0:1', '0' );
    game.insert( '0:2', '1' );
    game.insert( '0:3', '2' );
    game.insert( '1:0', '0' );
    game.insert( '2:0', '1' );
    game.insert( '3:0', '2');
    game.insert( '0:4', '3' );

    expect( game.leaves ).to.deep.equal( [1,1,1,2]);


  });
});