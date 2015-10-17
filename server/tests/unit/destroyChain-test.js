var chai = require( '../../node_modules/chai/chai.js' );
var expect = chai.expect;

var Game = require('../../game/game.js');  

describe( 'a game\'s chain removal', function( ) { // A standard describe block

  var game = new Game( );

  before( function( ) {

    game.insert( '0:1', '1' );
    game.insert( '0:2', '1' );
    game.insert( '0:3', '1' );
    game.insert( '-1:0', '3' );
    game.insert( '-2:0', '2' );
    game.insert( '1:0', '0' );
    game.insert( '2:0', '1' );
    game.insert( '0:-1', '0' );
    game.insert( '0:-2', '2' );
    game.insert( '0:4', '1' );
    game.insert( '1:4', '0' );
    game.insert( '-1:4', '1' );
    game.insert( '-2:4', '3' );
    game.insert( '0:5', '1' );

  });

  it( 'should have destroyed the chain of 1s', function( ) {
    game.print( );
  });
});