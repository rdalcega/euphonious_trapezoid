var adjacentKeys = require('./adjacentKeys.js');


var anchored = function(coordinates, ignore) {

  if (coordinates === '0:0') {

    return true;

  }

  var keys = adjacentKeys( coordinates );

  for (var i = 0; i < keys.length; i++) {

    if ( keys[i] !== ignore && this.board[keys[i]] && this.board[keys[i]].state !== 'L') {

      if (this.anchored(keys[i], coordinates)) {

        return true;

      }

    }

  }

  return false;

};

module.exports = anchored;