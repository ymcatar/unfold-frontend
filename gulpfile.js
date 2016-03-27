var gulp = require('gulp');

var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');

var source = require('vinyl-source-stream');

var gutil = require('gulp-util');
var watch = require('gulp-watch');

var livereload = require('gulp-livereload');

const staticPath = [
	'./src/main/index.html',
	'./src/main/main.css',
	'./src/main/noembed.css',
	'./src/main/reactTag.css'
];

const staticLandingPath = [
	'./src/landing/bundle.js',
	'./src/landing/index.html',
	'./src/landing/main.css'
];

gulp.task('jsx', () => {
	var bundler = browserify('./src/main/jsx/App.jsx', {
		debug: true,
		paths: ['./src/main/jsx'],
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
			.pipe(gulp.dest('./dist/main'))
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
			.pipe(gulp.dest('./dist/main'))
			.pipe(livereload());
	}
	process();
	watch(staticPath, process);
});

gulp.task('static_landing', () => {
	function process() {
		gulp
			.src(staticLandingPath)
			.pipe(gulp.dest('./dist/landing'))
			.pipe(livereload());
	}
	process();
	watch(staticLandingPath, process);
});

gulp.task('reload', () => {
	livereload.listen();
});

gulp.task('default', ['jsx', 'static', 'reload', 'static_landing']);
