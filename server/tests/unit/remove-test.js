var chai = require( '../../../node_modules/chai/chai.js' );
// var assert = chai.assert;
var expect = chai.expect;
// var sinon = require( '../../node_modules/sinon/pkg/sinon.js' );
var Game = require( '../../game/game.js' );


describe( 'should remove a piece from the board', function( ) { // A standard describe block

  var game = new Game( );

  before( function( ) {

    game.insert( '0:1', '1' );
    game.insert( '0:2', '1' );
    game.insert( '0:3', '1' );
    game.insert( '-1:0', '3' );
    game.insert( '-2:0', '2' );
    game.insert( '-3:0', '2' );
    game.insert( '1:0', '0' );
    game.insert( '2:0', '1' );
    game.insert( '3:0', '1' );
    game.insert( '0:-1', '0' );
    game.insert( '0:-2', '2' );
    game.insert( '0:-3', '2' );
    game.insert( '0:4', '1' );
    game.insert( '1:4', '0' );
    game.insert( '-1:4', '2' );
    game.insert( '-2:4', '3' );


  });

  // it( 'should remove the piece at 0:5', function( ) {

  //   game.remove( '0:5' );

  //   expect( game.board[ '0:5' ].state ).to.equal( 'L' );
  //   expect( game.board[ '0:6' ] ).to.be.undefined;
  //   expect( game.leaves ).to.deep.equal( [0, 0, 3, 0, 0, 1, 1 ] );


  // });

  it( 'should remove the piece at 0:4', function( ) {

    game.remove( '0:4' );

    expect( game.board[ '0:4' ].state ).to.equal( '0' );
    expect( game.board[ '1:4' ].state ).to.equal( 'L' );
    expect( game.board[ '0:5' ].state ).to.equal( 'L' );
    expect( game.leaves ).to.deep.equal( [0, 0, 0, 3, 0, 0, 1] );


  });

  it( 'should remove the piece at 0:3', function( ) {

    game.remove( '0:3' );

    expect( game.board[ '0:3' ].state ).to.equal( '0' );
    expect( game.board[ '0:4' ].state ).to.equal( '2' );
    expect( game.board[ '-1:4' ].state ).to.equal( '3' );
    expect( game.leaves ).to.deep.equal( [0, 0, 0, 3, 0, 1] );


  });

  it( 'should remove the piece at 0:2', function( ) {

    game.remove( '0:2' );

    expect( game.board[ '0:2' ].state ).to.equal( '0' );
    expect( game.board[ '0:3' ].state ).to.equal( '2' );
    expect( game.board[ '0:4' ].state ).to.equal( '3' );
    expect( game.leaves ).to.deep.equal( [0, 0, 0, 3, 1] );


  });

  it( 'should remove the piece at 0:1', function( ) {

    game.remove( '0:1' );

    expect( game.board[ '0:1' ].state ).to.equal( '0' );
    expect( game.board[ '0:2' ].state ).to.equal( '2' );
    expect( game.board[ '0:3' ].state ).to.equal( '3' );
    expect( game.leaves ).to.deep.equal( [0, 0, 0, 4] );


  });

});