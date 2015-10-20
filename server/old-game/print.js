var parse = require( './parse.js' );

var print = function( liberties ) {

  var bounds = [[],[]]; // [[lowx, highx], [lowy, highy]]

  var coordinates;

  for( var key in this.board ) {

    coordinates = parse( key );

    if( bounds[ 0 ][ 0 ] ) {

      bounds[ 0 ][ 0 ] = Math.min( bounds[ 0 ][ 0 ], coordinates[ 0 ] );

    } else {

      bounds[ 0 ][ 0 ] = coordinates[ 0 ];

    }

    if( bounds[ 0 ][ 1 ] ) {

      bounds[ 0 ][ 1 ] = Math.max( bounds[ 0 ][ 1 ], coordinates[ 0 ] );

    } else {

      bounds[ 0 ][ 1 ] = coordinates[ 0 ];

    }

    if( bounds[ 1 ][ 0 ] ) {

      bounds[ 1 ][ 0 ] = Math.min( bounds[ 1 ][ 0 ], coordinates[ 1 ] );

    } else {

      bounds[ 1 ][ 0 ] = coordinates[ 1 ];

    }

    if( bounds[ 1 ][ 1 ] ) {

      bounds[ 1 ][ 1 ] = Math.max( bounds[ 1 ][ 1 ], coordinates[ 1 ] );

    } else {

      bounds[ 1 ][ 1 ] = coordinates[ 1 ];

    }

  }

  var matrix = [];

  for( var row = 0; row <= bounds[ 1 ][ 1 ] - bounds[ 1 ][ 0 ]; row++ ) {

    matrix[ row ] = [];

    for( var column = 0; column <= bounds[ 0 ][ 1 ] - bounds[ 0 ][ 0 ]; column++ ) {

      matrix[ row ][ column ] = " ";

    }

  }

  for( var key in this.board ) {

    coordinates = parse( key );

    if( liberties ) {

      matrix[ bounds[ 1 ][ 1 ] - coordinates[ 1 ] ][ coordinates[0] - bounds[ 0 ][ 0 ] ] = this.board[ key ].state;

    } else {

      if( this.board[ key ].state !== 'L' ) {

        matrix[ bounds[ 1 ][ 1 ] - coordinates[ 1 ] ][ coordinates[0] - bounds[ 0 ][ 0 ] ] = this.board[ key ].state;

      }

    }

  }

  for( var i = 0; i < matrix.length; i++ ) {

    matrix[ i ] = matrix[ i ].join(' ');

  }

  matrix = matrix.join('\n');

  console.log( matrix );

};

module.exports = print;