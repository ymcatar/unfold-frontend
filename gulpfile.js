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
	'./src/main/reactTag.css',
	'./src/main/daterangepicker.css'
];

const staticLandingPath = [
	'./src/landing/bundle.js',
	'./src/landing/index.html',
	'./src/landing/main.css'
];

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

function rebundle(cb) {
	gutil.log('jsx starting.');
	var stream = bundler
		.bundle()
		.on('error', err => {
			if (err.codeFrame)
				gutil.log(err.message + '\n' + err.codeFrame);
			else
				gutil.log(err.message);
			if (cb)
				cb(err);
		})
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./dist/main'))
		.pipe(livereload())
		.on('end', () => {
			gutil.log('jsx completed.');
			if (cb)
				cb();
		});
	if (!cb)
		return stream;
}

gulp.task('jsx', rebundle);

gulp.task('watch:jsx', () => {
	bundler = watchify(bundler);
	rebundle();
	bundler.on('update', () => { rebundle(); });
});

function static() {
	return gulp
		.src(staticPath)
		.pipe(gulp.dest('./dist/main'))
		.pipe(livereload());
}

gulp.task('static', () => {
	return static();
});

gulp.task('watch:static', ['static'], () => {
	watch(staticPath, static);
});

function static_landing() {
	return gulp
		.src(staticLandingPath)
		.pipe(gulp.dest('./dist/landing'))
		.pipe(livereload());
}

gulp.task('static_landing', () => {
	return static_landing();
});

gulp.task('watch:static_landing', ['static_landing'], () => {
	watch(staticLandingPath, static_landing);
});

gulp.task('reload', () => {
	livereload.listen();
});

gulp.task('default', ['watch:jsx', 'watch:static', 'watch:static_landing', 'reload']);
gulp.task('build', ['jsx', 'static', 'static_landing']);
