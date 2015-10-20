var chai = require( '../../../node_modules/chai/chai.js' );
var expect = chai.expect;
var Game = require( '../../game/game.js' );
var Sphere = require( '../../game/sphere.js' );
describe( 'A game\'s restore method', function( ) {
  it( 'should not affect a new game', function( ) {
    var game = new Game( );
    game.restore( 0, 0 );
    expect( game.leaves ).to.deep.equal( [4] );
    expect( game.get( 0, 0 ).state ).to.equal( 'A' );
    expect( game.get( 0, 1 ).state ).to.equal( 'L' );
    expect( game.get( 1, 0 ).state ).to.equal( 'L' );
    expect( game.get( 0, -1 ).state ).to.equal( 'L' );
    expect( game.get( -1, 0 ).state ).to.equal( 'L' );
  });
  it( 'should restore the game\'s state appropriately after a change', function( ) {
    var game = new Game( );
    game.get( 0, 1 ).state = '0';
    game._leaves[ 0 ]--;
    game.restore( 0, 1 );
    expect( game.leaves ).to.deep.equal( [3, 1] );
    expect( game.minimumValence ).to.equal( 0 );
    expect( game.maximumValence ).to.equal( 1 );
    expect( game.get( 0, 2 ) ).to.be.an.instanceof( Sphere );
    expect( game.get( 1, 1 ) ).to.be.an.instanceof( Sphere );
    expect( game.get( -1, 1 ) ).to.be.an.instanceof( Sphere );
    expect( game.get( 0, 2 ).state ).to.equal( 'L' );
    expect( game.get( 1, 1 ).state ).to.equal( 'L' );
    expect( game.get( -1, 1 ).state ).to.equal( 'L' );
    expect( game.get( 0, 0 ).state ).to.equal( 'A' );
    game.get( 0, 2 ).state = '1';
    game.restore( 0, 2 );
    expect( game.leaves ).to.deep.equal( [3, 0, 1] );
    expect( game.minimumValence ).to.equal( 0 );
    expect( game.maximumValence ).to.equal( 2 );
    expect( game.get( 0, 3 ) ).to.be.an.instanceof( Sphere );
    expect( game.get( 1, 2 ) ).to.be.an.instanceof( Sphere );
    expect( game.get( 0, 1 ) ).to.be.an.instanceof( Sphere );
    expect( game.get( -1, 2 ) ).to.be.an.instanceof( Sphere );
    expect( game.get( 0, 3 ).state ).to.equal( 'L' );
    expect( game.get( 1, 2 ).state ).to.equal( 'L' );
    expect( game.get( 0, 1 ).state ).to.equal( '0' );
    expect( game.get( -1, 2 ).state ).to.equal( 'L' );


  });
});