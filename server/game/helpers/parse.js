var parse = function( string ) {
  var pair = string.split( ':' ).map( function( string ) {
    return +string;
  });
  return {
    x: pair[ 0 ],
    y: pair[ 1 ]
  };
};
module.exports = parse;