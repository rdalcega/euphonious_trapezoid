var Node = require('./node.js');
var insert = require('./insert.js');
var remove = require( './remove.js');
var adjust = require('./adjust.js');
var leafiness = require( './leafiness.js' );
var print = require( './print.js' );
var anchored = require( './anchored.js' );
var detectChain = require( './detectChain.js' );
var searchAndDestroy = require( './searchAndDestroy.js' );
var pop = require( './pop.js' );
var rebalance = require( './rebalance.js' );

var Game = function ( ) {

	this.board = {

		'0:0': new Node('A', 0, false),
		'0:1': new Node('L', 1),
		'0:-1': new Node('L', 1),
		'1:0': new Node('L', 1),
		'-1:0': new Node('L', 1)

	};

	this.leaves = [4];

	this.minimumValence = 0;

};

Object.defineProperty( Game.prototype, "maximumValence",{
	get: function( ) {
		return this.leaves.length - 1;
	}
});

Object.defineProperty( Game.prototype, "minimumValence", {
	get: function( ) {
		for( var i = 0; i < this.leaves.length; i++ ) {
			if( this.leaves[ i ] !== 0 ) {
				return i;
			}
		}
	}
});

Game.prototype.insert = insert;

Game.prototype.remove = remove;

Game.prototype.adjust = adjust;

Game.prototype.leafiness = leafiness;

Game.prototype.print = print;

Game.prototype.anchored = anchored;

Game.prototype.detectChain = detectChain;

Game.prototype.searchAndDestroy = searchAndDestroy;

Game.prototype.pop = pop;

Game.prototype.rebalance = rebalance;

module.exports = Game;