var rotate = require( './rotate.js' );
var adjacentKeys = require( './adjacentKeys.js' );
var parse = require( './parse.js' );

var rebalance = function( ) {

  var fallers = {};

  var rotators = {};

  var threshold = this.maximumValence - 2;

  for( var key in this.board ) {

    if( this.board[ key ].state !== 'L' && this.board[ key ].valence > threshold ) {

      fallers[ key ] = this.pop( key );

    }

  }

  fallers.keys = Object.keys( fallers ).sort( function( a, b ) {

    return fallers[ b ].valence - fallers[ a ].valence;

  });

  for( var key in this.board ) {

    rotators[ key ] = this.board[ key ].copy( );

    delete this.board[ key ];

  }

  for( var key in rotators ) {

    var coordinates = rotate( key );

    this.board[ coordinates ] = rotators[ key ];

  }

  var findClosestLiberty = function( coordinates, valence, ignore ) {

    valence = valence || fallers[ coordinates ].valence;

    ignore = ignore || [];

    var keys = adjacentKeys( coordinates );

    for( var i = 0; i < keys.length; i++ ) {

      var sphere = this.board[ keys[ i ] ];

      if( sphere && sphere.state === 'L' && sphere.valence <= valence && ignore.indexOf( keys[ i ] ) < 0 ) {

        return keys[ i ];

      }

    }

    var towardCenter;

    for( var i = 0; i < keys.length; i++ ) {

      if( !towardCenter ) {

        towardCenter = keys[ i ];

      } else {

        var towardCenterAbs = Math.abs( parse( towardCenter )[ 0 ] ) + Math.abs( parse( towardCenter )[ 1 ] );
        var keysAbs = Math.abs( parse( keys[ i ] )[ 0 ] ) + Math.abs( parse( keys[ i ] )[ 1 ] );

        if( keysAbs < towardCenterAbs ) {

          towardCenter = keys[ i ];

        }

      }

    }

    ignore.push( coordinates );

    return findClosestLiberty.call( this, towardCenter, valence, ignore );

  };

  var dontDestroy = true;

  var dontRebalance = true;

  for( var i = fallers.keys.length - 1; i >= 0; i-- ) {

    if( i === 0 ) {

      dontDestroy = dontRebalance = false;

    }

    this.insert( findClosestLiberty.call( this, fallers.keys[ i ] ), fallers[ fallers.keys[ i ] ].state, dontDestroy, dontRebalance );

  }

};

module.exports = rebalance;