var chai = require( '../../../node_modules/chai/chai.js' );
// var assert = chai.assert;
var expect = chai.expect;
// var sinon = require( '../../node_modules/sinon/pkg/sinon.js' );
var Game = require('../../game/game.js');

var Node = require( '../../game/node.js');

describe( 'a game\'s anchored method', function( ) { // A standard describe block
  var game = new Game();
  it( 'should return true for pieces that are anchored', function( ) {
    // Here's where the assertions go.
    game.insert('0:1', '1');
    game.insert('0:2', '1');
    game.insert('0:3', '1');

    expect(game.anchored('0:3')).to.be.true;


  });

  it( 'should return false for pieces that are not anchored', function() {

    game.board['0:4'] = new Node('L', 4);
    expect(game.anchored('-1:4')).to.be.false;

  });
});