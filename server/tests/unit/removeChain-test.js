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
  it( 'should emit a removed event for each sphere in the chain removed', function( done ) {
    var game = new Game( );
    var count = 0;
    game.on( 'removed', function( ) {
      count++;
      if( count === 3 ) {
        done( );
      }
    });
    game.put( 1, 0, '1' );
    game.put( 1, 1, '1' );
    game.put( 0, 1, '1' );
    var chain = game.detectChain( 0, 1 );
    game.removeChain( chain.chain );
  });
  it( 'should emit a moved event for each sphere that is moved when removing a chain', function( done ) {
    var game = new Game( );
    var first = true;
    game.on( 'removed', function( event ) {
      expect( first ).to.be.true;
      first = false;
      expect( event.coordinates.x ).to.equal( 0 );
      expect( event.coordinates.y ).to.equal( 1 );
      expect( event.state ).to.equal( '1' );
      expect( event.success ).to.be.true;
    });
    game.on( 'moved', function( event ) {
      expect( first ).to.be.false;
      expect( event.from.x ).to.equal( 0 );
      expect( event.from.y ).to.equal( 2 );
      expect( event.to.x ).to.equal( 0 );
      expect( event.to.y ).to.equal( 1 );
      expect( event.state ).to.equal( '0' );
      expect( event.success ).to.be.true;
      done( );
    });
    game.put( 0, 1, '1' );
    game.put( 0, 2, '0' );
    var chain = game.detectChain( 0, 1 );
    game.removeChain( chain.chain );
  });
  it( 'should emit a removed event for each sphere when removing chains in cascade', function( done ) {
    var game = new Game( );
    var count = 0;
    game.on( 'removed', function( ) {
      count++;
      if( count === 13 ) {
        done( );
      }
    });
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
  });
});