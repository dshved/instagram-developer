'use strict';

var gulp = require('gulp'),
		pug = require('gulp-pug'),
		sass = require('gulp-sass'),
		browserSync =  require('browser-sync'),
		reload = browserSync.reload;

var path = {
	dist: {
		html: 'dist/',
		js: 'dist/js/',
		css: 'dist/css/',
		img: 'dist/img/',
		fonts: 'dist/fonts'
	},
	src: {
		pug: 'src/template/*.pug',
		js: 'src/js/',
		style: 'src/style/main.scss',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	watch: {
		pug: 'src/template/**/*.pug',
		js: 'src/js/**/*.*',
		style: 'src/style/**/*.scss',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	clean: './dist'
};

var config = {
	server: {
		baseDir: './dist'
	},
	host: 'localhost',
	port: 5000
};

gulp.task('server', function() {
    browserSync(config);
});

gulp.task('pug', function() {
    return gulp.src(path.src.pug)
      .pipe(pug({pretty: true}))
      .pipe(gulp.dest(path.dist.html))
      .pipe(reload({stream: true}));
});
gulp.task('sass', function() {
		return gulp.src(path.src.style)
			.pipe(sass())
			.pipe(gulp.dest(path.dist.css))
			.pipe(reload({stream: true}));
});
gulp.task('watch', function() {
    gulp.watch(path.watch.pug, gulp.series('pug'));
    gulp.watch(path.watch.style, gulp.series('sass'));
});

gulp.task('default', gulp.series(
  gulp.parallel(
    'pug',
    'sass'
  ),
  gulp.parallel(
    'server',
    'watch'
  )
));