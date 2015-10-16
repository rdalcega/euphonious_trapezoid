var Node = require( './node.js' );
var adjacentKeys = require( './adjacentKeys.js' );

var adjust = function( coordinates ) {

  var keys = adjacentKeys( coordinates );

  var center = this.board[ coordinates ];

  var pastValences = {};

  for( var i = 0; i < keys.length; i++ ) {

    var adjacent = this.board[ keys[ i ] ];

    if( !adjacent ) {

      adjacent = this.board[ keys[ i ] ] = new Node( 'L', center.valence + 1 );

    } else {

      if( adjacent.valence > center.valence + 1 ) {

        pastValences[ keys[ i ] ] = adjacent.valence;

        adjacent.valence = center.valence + 1;

      }

    }

  }

  var centerLeafy = this.leafiness( coordinates );

  if( centerLeafy !== center.leafy ) {

    center.leafy = centerLeafy;

    if( center.leafy ) {

      // New leaf

      this.leaves[ center.valence ] =

        this.leaves[ center.valence ] || 0;

      this.leaves[ center.valence ]++;

    } else {

      // Used to be a leaf, but is no longer a leaf

      this.leaves[ center.valence ] -= 1;

      while( this.leaves[ this.leaves.length - 1 ] === 0 ) {

        this.leaves.pop( );

      }

    }
  }

  for( i = 0; i < keys.length; i++ ) {

    var adjacent = this.board[ keys[ i ] ];

    if( adjacent.state !== 'L' ) {

      var adjacentLeafy = this.leafiness( keys[ i ] );

      if( adjacentLeafy !== adjacent.leafy ) {

        adjacent.leafy = adjacentLeafy;

        if( adjacent.leafy ) {

          // New Leaf

          this.leaves[ adjacent.valence ] =

            this.leaves[ adjacent.valence ] || 0;

          this.leaves[ adjacent.valence ]++;

        } else {

          if( pastValences[ keys[ i ] ] ) {

            this.leaves[ pastValences[ keys[ i ] ] ] -= 1;

          } else {

            this.leaves[ adjacent.valence ] -= 1;

          }

          while( this.leaves[ this.leaves.length - 1 ] === 0 ) {

            this.leaves.pop( );

          }

        }

      }

    }

  }

  for( var coordinates in pastValences ) {

    if( this.board[ coordinates ].state !== 'L' ) {

      this.adjust( coordinates );

    }

  }

};

// var adjustValence = function(relativeCoordinates, valence) {

//   for ( var i = 0; i < relativeCoordinates.length; i++ ) {
//     var sphere = this.board[relativeCoordinates[i]];
//     if (!sphere) {
//       sphere = this.board[relativeCoordinates[i]] = new Node('L', valence + 1);
//     } else {
    
//         if (sphere.valence > valence) {

//           var sphereSurrounding = adjacentKeys(relativeCoordinates[i]);

//           for (var j = 0; j < sphereSurrounding.length; j++) {

//             var surroundingSphere = this.board[sphereSurrounding[j]];

//             if (surroundingSphere && surroundingSphere.state !== 'L') {
//               if (surroundingSphere.valence >= sphere.valence) {
//                 break;
//               }
//               if (surroundingSphere.leafy) {
//                 surroundingSphere.leafy = !surroundingSphere.leafy;
//                 this.leaves[surroundingSphere.valence] -= 1;

//                 while (this.leaves[this.leaves.length -1] === 0) {
//                   this.leaves.pop();
//                 }

//               }

//             }

//           }

//           if (j === sphereSurrounding.length && sphere.leafy === false && sphere.state !== 'L') {
//             sphere.leafy = true;
//             this.leaves[sphere.valence] = 
//               this.leaves[sphere.valence] || 0;

//             this.leaves[sphere.valence] += 1;

//           }

//           if (sphere.valence > valence + 1) {

//             sphere.valence = valence + 1;

//             this.adjustValence(
//               adjacentKeys(relativeCoordinates[i]),
//               sphere.valence
//             );
//           }

//         }

//         // if (sphere.valence > valence + 1) {



//         //   sphere.valence = valence + 1;
//         //   this.adjustValence(
//         //     adjacentKeys(relativeCoordinates[i]),
//         //     sphere.valence
//         //   );
//         // }
//     }
//   }

// };

module.exports = adjust;