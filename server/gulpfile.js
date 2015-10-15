var gulp = require( 'gulp' );
var mocha = require( 'gulp-mocha' );
var jshint = require( 'gulp-jshint' );
var stylish = require( 'jshint-stylish' );
var git = require( 'gulp-git' );
var gitignore = require( 'gulp-gitignore' );

gulp.task( 'test', function( ) {
  return gulp.src( './tests/unit/*-test.js' )
             .pipe( mocha() );
});

gulp.task( 'lint', function( ) {
  return gulp.src( './**.js' )
             .pipe( jshint( ) )
             .pipe( jshint.reporter( stylish ) )
             .pipe( jshint.reporter( 'fail' ) );
});

gulp.task( 'rebase', [ 'test', 'lint' ], function( ) {
  git.pull( 'origin', 'master', { args: '--rebase' }, function( error ) {
    if( error ) {
      throw error;
    }
  });
});

gulp.task( 'add', [ 'test', 'lint' ], function( ) {
  return gulp.src( './*' )
             .pipe( gitignore( '../.gitignore', ['node_modules'] ) )
             .pipe( git.add( ) );
});