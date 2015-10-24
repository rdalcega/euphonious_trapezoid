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
  it( 'should emit a rotated event on rebalance', function( done ) {
    var game = new Game( );
    game.on( 'rotated', function( event ) {
      expect( event.length ).to.equal( 2 );
      expect( event[ 0 ].to.x ).to.not.be.undefined;
      expect( event[ 0 ].to.y ).to.not.be.undefined;
      expect( event[ 0 ].from.x ).to.not.be.undefined;
      expect( event[ 0 ].from.y ).to.not.be.undefined;
      expect( event[ 0 ].state ).to.not.be.undefined;
      expect( event[ 0 ].success ).to.be.true;
      expect( event[ 1 ].to.x ).to.not.be.undefined;
      expect( event[ 1 ].to.y ).to.not.be.undefined;
      expect( event[ 1 ].from.x ).to.not.be.undefined;
      expect( event[ 1 ].from.y ).to.not.be.undefined;
      expect( event[ 1 ].state ).to.not.be.undefined;
      expect( event[ 1 ].success ).to.be.true;
      done( );
    });
    game.put( 0, 1, '0' );
    game.put( 0, 2, '1' );
    game.put( 0, 3, '2' );
    game.put( 0, 4, '3' );
    game.rebalance( );
  });
  it( 'should emit a fell event on rebalance for every piece that falls', function( done ) {
    var game = new Game( );
    var count = 0;
    game.on( 'fell', function( ) {
      count++;
      if( count === 2 ) {
        done( );
      }
    });
    game.put( 0, 1, '0' );
    game.put( 0, 2, '1' );
    game.put( 0, 3, '2' );
    game.put( 0, 4, '3' );
    game.rebalance( );
  });
  it( 'should emit a suspended event on rebalance for every piece that will fall', function( done ) {
    var game = new Game( );
    var count = 0;
    game.on( 'suspended', function( ) {
      count++;
      if( count === 2 ) {
        done( );
      }
    });
    game.put( 0, 1, '0' );
    game.put( 0, 2, '1' );
    game.put( 0, 3, '2' );
    game.put( 0, 4, '3' );
    game.rebalance( );
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