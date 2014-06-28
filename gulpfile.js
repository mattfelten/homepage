// including plugins
var gulp = require('gulp'),
	less = require("gulp-less"),
	minifyCSS = require("gulp-minify-css"),
	prefix = require('gulp-autoprefixer');

// task
gulp.task('css', function () {
	gulp.src([
		'assets/less/*.less',
		'!assets/less/_*.less',
		])
		.pipe(less({
			compress: true
		}))
		.pipe(prefix('last 2 versions', 'Explorer 8'))
		.pipe(gulp.dest('assets/css'));
});

// Watch Files For Changes
gulp.task('watch', function() {
	gulp.watch('assets/less/**/*.less', ['css'], function(event){
		console.log('File '+event.path+' was '+event.type+', running tasks...');
	});
});

gulp.task('default', ['watch']);
