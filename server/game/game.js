var Node = require('./node.js');
var insert = require('./insert.js');
var remove = require( './remove.js');
var adjust = require('./adjust.js');
var leafiness = require( './leafiness.js' );
var print = require( './print.js' );
var anchored = require( './anchored.js' );
var detectChain = require( './detectChain.js' );

var Game = function ( ) {

	this.board = {

		'0:0': new Node('A', 0, false),
		'0:1': new Node('L', 1),
		'0:-1': new Node('L', 1),
		'1:0': new Node('L', 1),
		'-1:0': new Node('L', 1)

	};

	this.leaves = [4];

	this.maximumValence = 0;

	this.minimumValence = 0;

};

Game.prototype.insert = insert;

Game.prototype.remove = remove;

Game.prototype.adjust = adjust;

Game.prototype.leafiness = leafiness;

Game.prototype.print = print;

Game.prototype.anchored = anchored;

Game.prototype.detectChain = detectChain;

module.exports = Game;