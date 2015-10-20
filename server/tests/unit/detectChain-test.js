var chai = require( '../../../node_modules/chai/chai.js' );
var expect = chai.expect;
var Game = require( '../../game/game.js' );
describe( 'a game\'s detect chain method', function( ) { // A standard describe block
  it( 'should detect a chain of length 1', function( ) {
    var game = new Game( );
    game.put( 1, 0, '1' );
    var chain = game.detectChain( 1, 0 );
    expect( chain.remove ).to.be.false;
    expect( chain.chain.length ).to.equal( 1 );
  });

  it( 'should detect a chain of length 2', function( ) {
    var game = new Game( );
    game.put( 1, 0, '1' );
    game.put( 1, 1, '1' );
    var chain = game.detectChain( 1, 1 );
    expect( chain.remove ).to.be.false;
    expect( chain.chain.length ).to.equal( 2 );
  });

  it( 'should detect a chain of length 3', function( ) {
    var game = new Game( );
    game.put( 1, 0, '1' );
    game.put( 1, 1, '1' );
    game.put( 0, 1, '1' );
    var chain = game.detectChain( 0, 1 );
    expect( chain.remove ).to.be.false;
    expect( chain.chain.length ).to.equal( 3 );
  });

  it( 'should detect a chain of length 4', function( ) {
    var game = new Game( );
    game.put( 1, 0, '1' );
    game.put( 1, 1, '1' );
    game.put( 0, 1, '1' );
    game.put( 0, 2, '0' );
    game.put( 0, 3, '1' );
    game.put( -1, 0, '3' );
    game.put( -2, 0, '2' );
    game.put( 2, 0, '1' );
    game.put( 0, -1, '0' );
    game.put( 0, -2, '2' );
    game.put(  0, 4, '1' );
    game.put( 1, 4, '0' );
    game.put( -1, 4, '1' );
    game.put( 0, 5, '1' );
    var chain = game.detectChain( 0, 3 );
    expect( chain.remove ).to.be.false;
    expect( chain.chain.length ).to.equal( 4 );
    chain = game.detectChain( 0, 1 );
    expect( chain.remove ).to.be.false;
    expect( chain.chain.length ).to.equal( 4 );
  });
});