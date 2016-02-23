var gulp = require('gulp');

var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');

var source = require('vinyl-source-stream');

var gutil = require('gulp-util');
var watch = require('gulp-watch');

var livereload = require('gulp-livereload');

const staticPath = ['./src/index.html', './src/main.css', './src/noembed.css'];

gulp.task('jsx', () => {
	var bundler = browserify('./src/jsx/App.jsx', {
		debug: true,
		paths: ['./src/jsx'],
		cache: {},
		packageCache: {},
		fullPaths: true
	}).transform(babelify, {
		presets: ["es2015", "react"],
		ignore: /(bower_components)|(node_modules)/
	});

	function rebundle() {
		gutil.log('jsx starting.');
		bundler
			.bundle()
			.on('error', err => { gutil.log(err.message); })
			.pipe(source('bundle.js'))
			.pipe(gulp.dest('./dist'))
			.pipe(livereload())
			.on('end', () => { gutil.log('jsx completed.'); });
	}

	bundler = watchify(bundler);
	rebundle();
	bundler.on('update', rebundle);
});

gulp.task('static', () => {
	function process() {
		gulp
			.src(staticPath)
			.pipe(gulp.dest('./dist'))
			.pipe(livereload());
	}
	process();
	watch(staticPath, process);
});

gulp.task('reload', () => {
	livereload.listen();
});

gulp.task('default', ['jsx', 'static', 'reload']);
