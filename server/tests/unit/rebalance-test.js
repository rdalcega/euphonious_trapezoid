var chai = require( '../../../node_modules/chai/chai.js' );
// var assert = chai.assert;
var expect = chai.expect;
// var sinon = require( '../../node_modules/sinon/pkg/sinon.js' );

var Game = require( '../../game/game.js' );

describe( 'A game\'s rebalance method', function( ) { // A standard describe block
  it( 'should rebalance an unbalanced board', function( ) {
    var game = new Game( );
    game.put( -1, 0, '1' );
    game.put( 1, 0, '1' );
    game.put( 0, 1, '2' );
    game.put( 0, 2, '2' );
    game.put( 0, 3, '2' );
    game.put( 0, 4, '1' );
    game.rebalance( );
    expect( game.balanced ).to.be.true;
    expect( game.leaves ).to.deep.equal( [ 1, 1, 1, 1 ] );
    expect( game.get( 0, 1 ).state ).to.equal( '1' );
    expect( game.get( 0, 2 ).state ).to.equal( '2' );
    expect( game.get( 0, 3 ).state ).to.equal( '1' );
    expect( game.get( -1, 0 ).state ).to.equal( '2' );
    expect( game.get( -2, 0 ).state ).to.equal( '2' );
    expect( game.get( 0, -1 ).state ).to.equal( '1' );
  });
  it( 'should rebalance an unbalanced board', function( ) {
    var game = new Game( );
    game.put( 0, 1, '0' );
    game.put( 0, 2, '1' );
    game.put( 0, 3, '2' );
    game.put( 0, 4, '3' );
    game.rebalance( );
    expect( game.balanced ).to.be.true;
    expect( game.get(0, 1).state ).to.equal( '2' );
    expect( game.get(0, 2).state ).to.equal( '3' );
    expect( game.get(-1, 0).state ).to.equal( '0' );
    expect( game.get(-2, 0).state ).to.equal( '1' );
    expect( game.leaves ).to.deep.equal( [2, 0, 2] );
  });
  it( 'should rebalance an unbalanced board', function( ) {
    var game = new Game( );
    game.put( 0, 1, '0' );
    game.put( 0, 2, '1' );
    game.put( 0, 3, '2' );
    game.put( 1, 0, '0' );
    game.put( 2, 0, '1' );
    game.put( 3, 0, '2');
    game.put( 0, 4, '3' );
    game.rebalance( );
    expect( game.balanced ).to.be.true;
    expect( game.leaves ).to.deep.equal( [ 1, 1, 1, 2 ] );
    expect( game.get( 0, 2 ).valence ).to.equal( 2 );
    expect( game.get( 0, 3 ).valence ).to.equal( 3 );
    expect( game.get( -1, 2 ).valence ).to.equal( 3 );
  });
  it( 'should destroy chains if encountered during rebalancing', function( ) {
    var game = new Game( );
    game.put( 0, 1, '0' );
    game.put( 0, 2, '1' );
    game.put( 0, 3, '0' );
    game.put( 0, 4, '1' );
    game.put( 1, 1, '0' );
    game.put( -1, 1, '0' );
    game.put( 1, 0, '0' );
    game.rebalance( );
    expect( game.balanced ).to.be.true;
    expect( game.leaves ).to.deep.equal( [2, 2] );
    expect( game.get( 0, 1 ).state ).to.equal( '1' );
    expect( game.get( -1, 0 ).state ).to.equal( '1' );
  });
});