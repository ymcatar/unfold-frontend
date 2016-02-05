var gulp = require('gulp');
var sass = require('gulp-sass');

var browserify = require('browserify');
var babelify = require('babelify');

var source = require('vinyl-source-stream');
var livereload = require('gulp-livereload');

var nodemon = require('gulp-nodemon');
var watch = require('gulp-watch');

gulp.task('sass', function() {
	gulp.src('./src/css/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('public'))
		.pipe(livereload());
});

gulp.task('jsx', function() {
	browserify('./src/jsx/App.jsx', {
			debug: true
		})
		.transform(babelify, {
			presets: ["es2015", "react"]
		})
		.bundle()
		.on("error", function(err) {
			console.log("Error : " + err.message);
		})
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./public'))
		.pipe(livereload());
});

gulp.task('start', function() {
	nodemon({
		script: 'bin/www',
		ext: 'js html'
	});
});

gulp.task('watch', function() {
	watch('./src/css/main.scss', function() {
		gulp.start('sass');
	});
	watch('./src/jsx/**/*.jsx', function() {
		gulp.start('jsx');
	});
});

gulp.task('default', ['start', 'watch', 'sass', 'jsx']);
