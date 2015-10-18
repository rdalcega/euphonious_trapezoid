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

  xit( 'should destroy 3 chains in cascade', function( ) {

    game = new Game( );

    game.insert( '0:1', '0' );
    game.insert( '0:2', '0' );
    game.insert( '0:3', '0' );
    game.insert( '-1:0', '0' );
    game.insert( '-2:0', '1' );
    game.insert( '-3:0', '2' );
    game.insert( '0:-1', '2' );
    game.insert( '0:-2', '2' );
    game.insert( '0:-3', '2' );
    game.insert( '1:0', '3' );
    game.insert( '1:-1', '1' );
    game.insert( '1:-2', '3' );
    game.insert( '2:-2', '3' );
    game.insert( '3:-2', '3' );
    game.insert( '4:-2', '1' );
    game.insert( '0:4', '0' );
    game.insert( '-4:0', '2' );
    game.insert( '-5:0', '1' );
    game.insert( '-5:-1', '3' );
    game.insert( '0:-4', '1' );
    game.insert( '-1:-4', '3' );
    game.insert( '-2:-4', '3' );
    game.insert( '1:2', '1' );
    game.insert( '2:2', '1' );
    game.insert( '3:2', '1' );
    game.insert( '4:2', '1' );
    game.insert( '3:3', '2' );
    game.insert( '3:4', '2' );
    game.insert( '-1:4', '3' );
    game.insert( '-1:3', '3' );
    game.insert( '-1:5', '3' );
    game.insert( '4:4', '2' );
    game.insert( '5:4', '2' );
    game.insert( '4:1', '2' );
    game.insert( '4:0', '2' );
    game.insert( '5:0', '2' );
    game.insert( '-1:1', '3' );

    game.insert( '-2:1', '3' );
    game.insert( '-3:1', '3' );
    game.insert( '-4:1', '3' );
    game.insert( '-1:2', '1' );
    game.insert( '-2:2', '1' );
    game.insert( '-3:2', '1' );
    game.insert( '-4:2', '1' );
    game.insert( '0:5', '0' );

    expect( game.leaves ).to.deep.equal( [0, 0, 0, 0, 0, 0, 3, 0, 1] );
    expect( game.maximumValence ).to.equal( 8 );
    expect( game.minimumValence ).to.equal( 6 );

    expect( game.board[ '0:1' ].state ).to.equal( '2' );
    expect( game.board[ '0:2' ].state ).to.equal( '2' );
    expect( game.board[ '1:2' ].state ).to.equal( '2' );
    expect( game.board[ '2:2' ].state ).to.equal( '2' );
    expect( game.board[ '3:2' ].state ).to.equal( '1' );
    expect( game.board[ '4:2' ].state ).to.equal( '2' );
    expect( game.board[ '4:1' ].state ).to.equal( '2' );
    expect( game.board[ '4:0' ].state ).to.equal( '2' );


  });

});