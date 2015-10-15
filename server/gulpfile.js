'use strict';

var gulp = require( 'gulp' );
var mocha = require( 'gulp-mocha' );
var jshint = require( 'gulp-jshint' );
var stylish = require( 'jshint-stylish' );
var git = require( 'git-gulp' );

gulp.task( 'test', function( ) {
  return gulp.src( './tests/unit/*-test.js' )
             .pipe( mocha() );
});

gulp.task( 'lint', function( ) {
  return gulp.src( './**.js' )
             .pipe( jshint( ) )
             .pipe( jshint.reporter( stylish ) );
});

gulp.task( 'add', [ 'test', 'lint' ], function( ) {
  return gulp.src( './*' )
             .pipe( git.add( ) );
})