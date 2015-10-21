var chai = require( '../../../node_modules/chai/chai.js' );
var expect = chai.expect;
var Game = require( '../../game/game.js' );
describe( 'A game\'s insert method', function( ) { // A standard describe block
  it( 'should remove chains as soon as they are placed', function( ) {
    var game = new Game( );
    game.insert({
      coordinates: {
        x: 0,
        y: 1
      },
      state: '0'
    });
    game.insert({
      coordinates: {
        x: 1,
        y: 0
      },
      state: '0'
    });
    game.insert({
      coordinates: {
        x: 1,
        y: 1
      },
      state: '0'
    });
    game.insert({
      coordinates: {
        x: -1,
        y: 0
      },
      state: '0'
    });
    game.insert({
      coordinates: {
        x: -1,
        y: 1
      },
      state: '0'
    });
    expect( game.leaves ).to.deep.equal( [4] );
    expect( game.get( 0, 1 ).state ).to.equal( 'L' );
    expect( game.get( 1, 0 ).state ).to.equal( 'L' );
    expect( game.get( 0, -1 ).state ).to.equal( 'L' );
    expect( game.get( -1, 0 ).state ).to.equal( 'L' );
    expect( game.get( 1, 1 ) ).to.be.undefined;
    expect( game.get( -1, 1 ) ).to.be.undefined;
  });
  it( 'should rebalance boards as soon as they go out of balance', function( ) {
    var game = new Game( );
    game.insert({
      coordinates: {
        x: 0,
        y: 1
      },
      state: '0'
    });
    game.insert({
      coordinates: {
        x: 0,
        y: 2
      },
      state: '1'
    });
    game.insert({
      coordinates: {
        x: 0,
        y: 3
      },
      state: '2'
    });
    game.insert({
      coordinates: {
        x: 0,
        y: 4
      },
      state: '3'
    });
    expect( game.balanced ).to.equal( true );
    expect( game.leaves ).to.deep.equal( [2, 0, 2] );
    expect( game.get( 0, 1 ).state ).to.equal( '2' );
    expect( game.get( 0, 2 ).state ).to.equal( '3' );
    expect( game.get( -1, 0 ).state ).to.equal( '0' );
    expect( game.get( -2, 0 ).state ).to.equal( '1' );
  });
  it( 'should emit a put event on succesful insertion', function( done ) {
    var game = new Game( );
    game.on( 'put', function( event ) {
      expect( event.coordinates.x ).to.equal( 0 );
      expect( event.coordinates.y ).to.equal( 1 );
      expect( event.state ).to.equal( '0' );
      expect( event.success ).to.equal( true );
      done( );
    });
    game.insert({
      coordinates: {
        x: 0,
        y: 1
      },
      state: '0'
    });
  });
  it( 'should emit a put event on unsuccesful insertion', function( done ) {
    var game = new Game( );
    game.on( 'put', function( event ) {
      expect( event.coordinates.x ).to.equal( 1 );
      expect( event.coordinates.y ).to.equal( 1 );
      expect( event.state ).to.equal( '0' );
      expect( event.success ).to.equal( false );
      done( );
    });
    game.insert({
      coordinates: {
        x: 1,
        y: 1
      },
      state: '0'
    });
  });
});