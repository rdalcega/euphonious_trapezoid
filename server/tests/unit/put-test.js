var chai = require( '../../../node_modules/chai/chai.js' );
var expect = chai.expect;
var Game = require( '../../game/game.js' );
var Sphere = require( '../../game/sphere.js' );
describe( 'A game\'s put method', function( ) { // A standard describe block
  it( 'should put pieces if there\'s a liberty at the target coordinates', function( ) {
    var game = new Game( );
    expect( game.put( 0, 1, '0' ) ).to.be.true;
  });
  it( 'should not put pieces if there\'s no liberty at the target coordinates', function( ) {
    var game = new Game( );
    expect( game.put( 10, 10, '0' ) ).to.be.false;
    expect( game.put( 0, 0, '0' ) ).to.be.false;
  });
  it( 'should emit an event named put after succesful execution', function( done ) {
    var game = new Game( );
    game.on( 'put', function( event ) {
        expect( event.success ).to.be.true;
        expect( event.coordinates.x ).to.equal( 0 );
        expect( event.coordinates.y ).to.equal( 1 );
        expect( event.state ).to.equal( '0' );
        done( );
    });
    game.put( 0, 1, '0' );
  });
  it( 'should emit an event named put after failed execution', function( done ) {
    var game = new Game( );
    game.on( 'put', function( event ) {
        expect( event.success ).to.be.false;
        expect( event.coordinates.x ).to.equal( 10 );
        expect( event.coordinates.y ).to.equal( 10 );
        expect( event.state ).to.equal( '0' );
        done( );
    });
    game.put( 10, 10, '0' );
  });
  it( 'should update the leaves array', function( ) {
    var game = new Game( );
    expect( game.put( 0, 1, '0' ) ).to.be.true;
    expect( game.put( 0, 2, '1' ) ).to.be.true;
    expect( game.put( -1, 0, '0' ) ).to.be.true;
    expect( game.put( -2, 0, '1' ) ).to.be.true;
    expect( game.leaves ).to.deep.equal( [2, 0, 2] );
    expect( game.put( -1, 2, '2' ) ).to.be.true;
    expect( game.leaves ).to.deep.equal( [2, 0, 1, 1] );
    expect( game.put( 1, 0, '2' ) ).to.be.true;
    expect( game.leaves ).to.deep.equal( [1, 1, 1, 1] );
    expect( game.put( 0, 3, '3' ) ).to.be.true;
    expect( game.leaves ).to.deep.equal( [1, 1, 1, 2] );
  });
  it( 'should restore valence recursively after placing', function( ) {
    game = new Game( );
    expect( game.put( 0, 1, '1' ) ).to.be.true;
    expect( game.put( -1, 0, '3' ) ).to.be.true;
    expect( game.put( 0, -1, '3' ) ).to.be.true;
    expect( game.put( 1, 0, '3' ) ).to.be.true;
    expect( game.put( -2, 0, '1' ) ).to.be.true;
    expect( game.put( -3, 0, '2' ) ).to.be.true;
    expect( game.put( 0, -2, '1' ) ).to.be.true;
    expect( game.put( 0, -3, '2' ) ).to.be.true;
    expect( game.put( 2, 0, '1' ) ).to.be.true;
    expect( game.put( 3, 0, '1' ) ).to.be.true;
    expect( game.put( 0, 2, '2' ) ).to.be.true;
    expect( game.put( 0, 3, '3' ) ).to.be.true;
    expect( game.put( -3, -1, '1' ) ).to.be.true;
    expect( game.put( -3, -2, '2' ) ).to.be.true;
    expect( game.put( -4, -2, '3' ) ).to.be.true;
    expect( game.put( -1, -3, '1' ) ).to.be.true;
    expect( game.put( -1, -4, '3' ) ).to.be.true;
    expect( game.put( -2, -4, '1' ) ).to.be.true;
    expect( game.put( 3, -1, '1' ) ).to.be.true;
    expect( game.put( 4, -1, '3' ) ).to.be.true;
    expect( game.put( 4, -2, '2' ) ).to.be.true;
    expect( game.put( 0, 4, '2' ) ).to.be.true;
    expect( game.put( 1, 4, '1' ) ).to.be.true;
    expect( game.put( 2, 4, '3' ) ).to.be.true;
    expect( game.put( 2, 3, '2' ) ).to.be.true;
    expect( game.put( 2, 2, '1' ) ).to.be.true;
    expect( game.put( 1, 2, '3' ) ).to.be.true;

    expect( game.leaves ).to.deep.equal( [0, 0, 0, 0, 0, 0, 4] );
    expect( game.minimumValence ).to.equal( 6 );
    expect( game.maximumValence ).to.equal( 6 );
    expect( game.get( 1, 2 ).valence ).to.equal( 3 );
    expect( game.get( 2, 2 ).valence ).to.equal( 4 );
    expect( game.get( 2, 3 ).valence ).to.equal( 5 );
    expect( game.get( 2, 4 ).valence ).to.equal( 6 );
    expect( game.get( 1, 3 ).valence ).to.equal( 4 );
  });
});