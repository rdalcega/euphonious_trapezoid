var chai = require( '../../../node_modules/chai/chai.js' );
var expect = chai.expect;
var Game = require( '../../game/game.js' );
describe( 'a game\'s removeChain method', function( ) { // A standard describe block
  it( 'should remove a chain of length 1', function( ) {
    var game = new Game( );
    game.put( 1, 0, '1' );
    var chain = game.detectChain( 1, 0 );
    game.removeChain( chain.chain );
    expect( game.get( 1, 0 ).state ).to.equal( 'L' );
    expect( game.leaves ).to.deep.equal( [4] );
  });

  it( 'should remove a chain of length 2', function( ) {
    var game = new Game( );
    game.put( 1, 0, '1' );
    game.put( 1, 1, '1' );
    var chain = game.detectChain( 1, 1 );
    game.removeChain( chain.chain );
    expect( game.get( 1, 0 ).state ).to.equal( 'L' );
    expect( game.get( 1, 1 ) ).to.be.undefined;
    expect( game.leaves ).to.deep.equal( [4] );
  });

  it( 'should remove a chain of length 3', function( ) {
    var game = new Game( );
    game.put( 1, 0, '1' );
    game.put( 1, 1, '1' );
    game.put( 0, 1, '1' );
    var chain = game.detectChain( 0, 1 );
    game.removeChain( chain.chain );
    expect( game.get( 1, 0 ).state ).to.equal( 'L' );
    expect( game.get( 1, 1 ) ).to.be.undefined;
    expect( game.leaves ).to.deep.equal( [4] );
  });
  it( 'should remove 2 chains in cascade', function( ) {
    var game = new Game( );
    game.put( 0, 1, '1' );
    game.put( 0, 2, '1' );
    game.put( 0, 3, '1' );
    game.put( 0, 3, '1' );
    game.put( 0, 4, '1' );
    game.put( 0, 5, '1' );
    game.put( 1, 2, '0' );
    game.put( 2, 2, '0' );
    game.put( -1, 2, '0' );
    game.put( -2, 2, '0' );
    game.put( -3, 2, '0' );
    game.put( -4, 2, '0' );
    game.put( -5, 2, '0' );
    var chain = game.detectChain( 0, 5 );
    game.removeChain( chain.chain );
    expect( game.leaves ).to.deep.equal( [ 4 ] );
    expect( game.get( 0, 1 ).state ).to.equal( 'L' );
    expect( game.get( 0, 2 ) ).to.be.undefined;
    expect( game.get( 2, 2 ) ).to.be.undefined;
  });
});