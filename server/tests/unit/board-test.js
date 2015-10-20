var chai = require( '../../../node_modules/chai/chai.js' );
var expect = chai.expect;
var Board = require( '../../game/board.js' );
var Sphere = require( '../../game/sphere.js' );
describe( 'the board class', function( ) { // A standard describe block
  it( 'should initialize with an anchor and four liberties', function( ) {
    var board = new Board( );
    expect( board.get( 0, 0 ) ).to.be.an.instanceof( Sphere );
    expect( board.get( 0, 1 ) ).to.be.an.instanceof( Sphere );
    expect( board.get( 1, 0 ) ).to.be.an.instanceof( Sphere );
    expect( board.get( 0, -1 ) ).to.be.an.instanceof( Sphere );
    expect( board.get( -1, 0 ) ).to.be.an.instanceof( Sphere );
    expect( board.get( 0, 0 ).state ).to.equal( 'A' );
    expect( board.get( 0, 1 ).state ).to.equal( 'L' );
    expect( board.get( 1, 0 ).state ).to.equal( 'L' );
    expect( board.get( 0, -1 ).state ).to.equal( 'L' );
    expect( board.get( -1, 0 ).state ).to.equal( 'L' );
  });
  it( 'should place new pieces as long as there is no piece at the specified index', function( ) {
    var board = new Board( );
    expect( board.place( 0, 1, new Sphere({
      state: 'L',
      valence: 1,
      coordinates: {
        x: 0,
        y: 1
      }
    }))).to.be.false;
    expect( board.place( 1, 1, new Sphere({
      state: 'L',
      valence: 2,
      coordinates: {
        x: 1,
        y: 1
      }
    }))).to.be.true;
  });
  it( 'should force the sphere\'s coordinates to match the board\'s coordinates', function( ) {
    var board = new Board( );
    board.place( 1, 1, new Sphere({
      state: 'L',
      valence: 1,
      coordinates: {
        x: 0,
        y: 10
      }
    }));
    expect( board.get( 1, 1 ).coordinates.x ).to.equal( 1 );
    expect( board.get( 1, 1 ).coordinates.y ).to.equal( 1 );
  });
  it( 'should throw a RangeError when getting pieces from non-integer coordinates', function( ) {
    var board = new Board( );
    expect( board.get.bind( null, 1, 1.1 ) ).to.throw( RangeError );
  });
  it( 'should throw a RangeError when placing piece on non-integer coordinates', function( ) {
    var board = new Board( );
    var placeWrongly = function( ) {
      board.place( 1, 1.1, new Sphere({
        state: 'L',
        valence: 0,
        coordinates: {
          x: 0,
          y: 0
        }
      }));
    };
    expect( placeWrongly ).to.throw( RangeError );
  });
  it( 'should throw a TypeError when placing an object that is not a sphere', function( ) {
    var board = new Board( );
    expect( board.place.bind( null, 1, 1, {} ) ).to.throw( TypeError );
  });
});