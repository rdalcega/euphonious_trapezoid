var parse = require( './parse.js' );

var rotate = function( coordinates ) {

  var tuple = parse( coordinates );

  return '' + (-tuple[ 1 ]) + ':' + tuple[ 0 ];

};

module.exports = rotate;