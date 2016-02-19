var gulp = require('gulp');

var browserify = require('browserify');
var babelify = require('babelify');

var source = require('vinyl-source-stream');

var gutil = require('gulp-util');

var nodemon = require('gulp-nodemon');
var watch = require('gulp-watch');

var notify = require('gulp-notify');

gulp.task('jsx', () => {
	browserify('./src/jsx/App.jsx', { debug: true, paths: ['./src/jsx'] })
		.transform(babelify, {
			presets: ["es2015", "react"],
			ignore: /(bower_components)|(node_modules)/
		})
		.bundle()
		.on("error", err => { gutil.log(err.message); })
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./dist'))
		.pipe(notify('jsx completed.'));
});

// gulp.task('start', () => {
// 	nodemon({ script: 'index.js', ext: 'js html' });
// });

gulp.task('static', () => {
	gulp.src(['./src/index.html', './src/main.css', './src/noembed.css'])
		.pipe(gulp.dest('./dist'));
});

gulp.task('watch', () => {
	watch('./src/jsx/**/*.jsx', () => { gulp.start('jsx'); });
	watch(['./src/index.html', './src/main.css', './src/noembed.css'], () => { gulp.start('static'); });
});

gulp.task('default', ['watch', 'jsx', 'static']);
