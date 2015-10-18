var chai = require( '../../../node_modules/chai/chai.js' );
// var assert = chai.assert;
var expect = chai.expect;
// var sinon = require( '../../node_modules/sinon/pkg/sinon.js' );

var rotate = require( '../../game/rotate.js' );

describe( 'the rotate function', function( ) { // A standard describe block
  it( 'return -y:x for x:y', function( ) {

    expect( rotate( '1:2' ) ).to.equal( '-2:1' );
    expect( rotate( '-1:1' ) ).to.equal( '-1:-1' );
    expect( rotate( '0:0' ) ).to.equal( '0:0' );

  });
});