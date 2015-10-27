var chai = require( '../../../node_modules/chai/chai.js' );
var expect = chai.expect;
var Game = require( '../../game/game.js' );
describe( 'A game\'s getState method', function( ) { // A standard describe block
  it( 'should get pieces that are on the game\'s board', function( ) {
    var game = new Game( );
    game.put( 0, 1, '0' );
    var state = game.getState( );
    expect( state.length ).to.equal( 2 );
    if( state[ 0 ].state === 'A' ) {
      expect( state[ 0 ].coordinates.x ).to.equal( 0 );
      expect( state[ 0 ].coordinates.y ).to.equal( 0 );
      expect( state[ 1 ].state ).to.equal( '0' );
      expect( state[ 1 ].coordinates.x ).to.equal( 0 );
      expect( state[ 1 ].coordinates.y ).to.equal( 1 );
    } else {
      expect( state[ 1 ].state ).to.equal( 'A' );
      expect( state[ 1 ].coordinates.x ).to.equal( 0 );
      expect( state[ 1 ].coordinates.y ).to.equal( 0 );
      expect( state[ 0 ].state ).to.equal( '0' );
      expect( state[ 0 ].coordinates.x ).to.equal( 0 );
      expect( state[ 0 ].coordinates.y ).to.equal( 1 );
    }
  });
  it( 'should return the ids of pieces that are on the game\'s board', function( ) {
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
      state: '0'
    });
    game.insert({
      coordinates: {
        x: 0,
        y: 3
      },
      state: '0'
    });
    game.insert({
      coordinates: {
        x: 0,
        y: 4
      },
      state: '0'
    });
    var state = game.getState( );
    expect( state.length ).to.equal( 5 );
    state.forEach( function( sphere ) {
      if( sphere.coordinates.x === 0 && sphere.coordinates.y === 0 ) {
        expect( sphere.id ).to.equal( 0 );
      }
      if( sphere.coordinates.x === -1 && sphere.coordinates.y === 0 ) {
        expect( sphere.id ).to.equal( 1 );
      }
      if( sphere.coordinates.x === -2 && sphere.coordinates.y === 0 ) {
        expect( sphere.id ).to.equal( 2 );
      }
      if( sphere.coordinates.x === 0 && sphere.coordinates.y === 1 ) {
        expect( sphere.id ).to.equal( 3 );
      }
      if( sphere.coordinates.x === 0 && sphere.coordinates.y === 2 ) {
        expect( sphere.id ).to.equal( 4 );
      }
    }.bind( this ));
    game.insert({
      coordinates: {
        x: -1,
        y: 1
      },
      state: '0'
    });
    game.insert({
      coordinates: {
        x: 0,
        y: 1
      },
      state: '0'
    });
    state = game.getState( );
    expect( state.length ).to.equal( 2 );
    state.forEach( function( sphere ) {
      if( sphere.coordinates.x === 0 && sphere.coordinates.y === 0 ) {
        expect( sphere.id ).to.equal( 0 );
      }
      if( sphere.coordinates.x === 0 && sphere.coordinates.y === 1 ) {
        expect( sphere.id ).to.equal( 6 );
      }
    }.bind( this ));
  });
});