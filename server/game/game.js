var Board = require( './board.js' );
var get = require( './get.js' );
var deletion = require( './delete.js' );
var forNeighbors = require( './forNeighbors.js' );
var place = require( './place.js' );
var leafiness = require( './leafiness.js' );
var updateLeaves = require( './updateLeaves.js' );
var restore = require( './restore.js' );
var put = require( './put.js' );
var anchored = require( './anchored.js' );
var detectChain = require( './detectChain.js' );
var removeChain = require( './removeChain.js' );
var rebalance = require( './rebalance.js' );
var print = require( './print.js' );
var Game = function( ) {
  this.board = new Board( );
  this._leaves = [4];
  Object.defineProperty(
    this,
    'leaves',
    {
      get: function( ) {
        while( this._leaves[ this._leaves.length - 1 ] === 0 ) {
          this._leaves.pop( );
        }
        return this._leaves;
      }
    }
  );
  Object.defineProperty(
    this,
    'maximumValence',
    {
      get: function( ) {
        return this.leaves.length - 1;
      }
    }
  );
  Object.defineProperty(
    this,
    'minimumValence',
    {
      get: function( ) {
        var leaves = this.leaves;
        for( var i = 0; i < leaves.length; i++ ) {
          if( leaves[ i ] !== 0 ) {
            return i;
          }
        }
      }
    }
  );
  Object.defineProperty(
    this,
    'balanced',
    {
      get: function( ) {
        return this.maximumValence <= this.minimumValence + 3;
      }
    }
  );
  this.chainThreshold = 4;
};
Game.prototype.get = get;
Game.prototype.delete = deletion;
Game.prototype.forNeighbors = forNeighbors;
Game.prototype.place = place;
Game.prototype.leafiness = leafiness;
Game.prototype.updateLeaves = updateLeaves;
Game.prototype.restore = restore;
Game.prototype.put = put;
Game.prototype.anchored = anchored;
Game.prototype.detectChain = detectChain;
Game.prototype.removeChain = removeChain;
Game.prototype.rebalance = rebalance;
Game.prototype.print = print;
module.exports = Game;