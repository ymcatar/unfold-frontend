var gulp = require('gulp');

var browserify = require('browserify');
var babelify = require('babelify');

var source = require('vinyl-source-stream');
var livereload = require('gulp-livereload');

var nodemon = require('gulp-nodemon');
var watch = require('gulp-watch');

gulp.task('jsx', () => {
	browserify('./src/jsx/App.jsx', { debug: true, paths: ['./src/jsx'] })
		.transform(babelify, { presets: ["es2015", "react"] })
		.bundle()
		.on("error", err => { console.log("Error : " + err.message); })
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./dist'))
		.pipe(livereload());
});

// gulp.task('start', () => {
// 	nodemon({ script: 'index.js', ext: 'js html' });
// });

gulp.task('static', () => {
	gulp.src(['./src/index.html', './src/main.css'])
		.pipe(gulp.dest('./dist'))
		.pipe(livereload());
});

gulp.task('watch', () => {
	watch('./src/jsx/**/*.jsx', () => { gulp.start('jsx'); });
	watch(['./src/index.html', './src/main.css'], () => { gulp.start('static'); });
});

gulp.task('default', ['watch', 'jsx', 'static']);
