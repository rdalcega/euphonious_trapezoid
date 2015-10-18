var chai = require( '../../../node_modules/chai/chai.js' );
// var assert = chai.assert;
var expect = chai.expect;
// var sinon = require( '../../node_modules/sinon/pkg/sinon.js' );
var Game = require( '../../game/game.js' );

describe( 'a game\'s detect chain method', function( ) { // A standard describe block
  var game = new Game( );

  it( 'should detect a chain of length 1', function( ) {

    game.insert( '1:0', '1' );

    var chain = game.detectChain( '1:0' );

    expect( chain.destroy ).to.be.false;

    expect( chain.chain.length ).to.equal( 1 );
    
  });

  it( 'should detect a chain of length 2', function( ) {

    game.insert( '1:1', '1' );

    var chain = game.detectChain( '1:1' );

    expect( chain.destroy ).to.be.false;

    expect( chain.chain.length ).to.equal( 2 );

  });

  it( 'should detect a chain of length 3', function( ) {

    game.insert( '0:1', '1' );

    var chain = game.detectChain( '0:1' );

    expect( chain.destroy ).to.be.false;

    expect( chain.chain.length ).to.equal( 3 );

  });

  it( 'should detect a chain of length 4', function( ) {

    game.insert( '0:2', '0' );
    game.insert( '0:3', '1' );
    game.insert( '-1:0', '3' );
    game.insert( '-2:0', '2' );
    game.insert( '2:0', '1' );
    game.insert( '0:-1', '0' );
    game.insert( '0:-2', '2' );
    game.insert( '0:4', '1' );
    game.insert( '1:4', '0' );
    game.insert( '-1:4', '1' );
    game.insert( '0:5', '1' );

    var chain = game.detectChain( '0:3' );

    expect( chain.destroy ).to.be.false;

    expect( chain.chain.length ).to.equal( 4 );

    chain = game.detectChain( '0:1' );

    expect( chain.destroy ).to.be.false;

    expect( chain.chain.length ).to.equal( 4 );

  });

});