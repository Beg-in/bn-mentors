'use strict';

var cp = require('child_process');
var fs = require('fs');
var _ = require('lodash');
var gulp = require('gulp');
var gp = require('gulp-load-plugins')({
    rename: {
        'gulp-cssnano': 'cssmin',
    }
});
gp.clean = require('del');
gp.livereload = require('tiny-lr')();
gp.path = require('path');

/**
 * # Build
 * ## Requirements
 * - [Gulp](http://gulpjs.com/)
 * ```bash
 * $ npm install -g gulp
 * ```
 * ## Running the test suite
 * ### Single Run:
 * ```bash
 * $ gulp test
 * ```
 * ### Continuous testing when files are changed:
 * ```bash
 * $ gulp autotest
 * ```
 * ## Generating README.md
 * ```bash
 * $ gulp docs
 * ```
 * ## Generating CHANGELOG.md
 * ```bash
 * $ gulp changelog
 * ```
 * ## Notes
 * - jshint is part of the test suite and should be kept clean
 * - Commits should have high test coverage
 * - Docs should be kept up to date
 * - Additions should come with documentation
 * - commit messages should follow [conventional format](https://github.com/ajoslin/conventional-changelog/blob/master/conventions/angular.md)
 * @module contributing
 */

var paths = {
    client: 'src/client/',
    server: 'src/server/',
    dest: 'public/',
    bower: 'bower_components/',
    test: 'test/'
};
paths.srcStyles = paths.client + 'styles/';
paths.destStyles = paths.dest + 'styles/';
paths.srcScripts = paths.client + 'scripts/';
paths.destScripts = paths.dest + 'scripts/';

var files = {
    html: [
        paths.client + '*.html'
    ],
    styles: [
        paths.bower + 'roboto-fontface/css/*.scss',
        paths.srcStyles + 'main.scss',
        paths.srcStyles + '**/!(main).scss'
    ],
    scripts:[
        paths.srcScripts + '**/*.js'
    ],
    images: [
        paths.client + '*.png'
    ]
};

var config = require('./' + paths.server + 'config.json');

var log = function() {
    var args = _.map(arguments, arg => gp.util.colors.green(arg));
    args.unshift(gp.util.colors.green('[server]'));
    gp.util.log.apply(gp.util, args);
};

gulp.task('html', function() {
    gulp.src(paths.client + '*.html')
        .pipe(gp.htmlmin())
        .pipe(gulp.dest(paths.dest));
});

var styles = function(src, dest, plumber) {
    return function() {
        gulp.src(src)
            //.pipe(gp.debug({title: 'styles'}))
            .pipe(gp.plumber({errorHandler: plumber}))
            .pipe(gp.sourcemaps.init())
            .pipe(gp.sass())
            .pipe(gp.autoprefixer())
            .pipe(gp.concat(dest))
            .pipe(gp.cssmin())
            .pipe(gp.sourcemaps.write('.'))
            .pipe(gulp.dest(paths.destStyles));
    };
};
gulp.task('sass', styles(files.styles, 'app.min.css'));
gulp.task('sass-main', styles(files.styles[0], 'main.min.css'));
gulp.task('styles', ['sass', 'sass-main']);
gulp.task('build-sass', styles(files.styles, 'app.min.css', false));
gulp.task('build-sass-main', styles(files.styles[0], 'main.min.css', false));
gulp.task('build-styles', ['build-sass', 'build-sass-main']);

gulp.task('jshint', function() {
    gulp.src(_.union(files.scripts, ['gulpfile.js']))
        .pipe(gp.jshint())
        .pipe(gp.jshint.reporter(require('jshint-stylish')));
        //.pipe(jshint.reporter('fail'));
});
var scripts = function(src, dest, plumber) {
    gulp.src(files.scripts)
        //.pipe(gp.debug({title: 'scripts'}))
        .pipe(gp.plumber({errorHandler: plumber}))
        .pipe(gp.sourcemaps.init())
        .pipe(gp.concat('app.min.js'))
        .pipe(gp.uglify())
        .pipe(gp.sourcemaps.write('.'))
        .pipe(gulp.dest(paths.destScripts));
};
gulp.task('scripts', ['jshint'], scripts(files.scripts, paths.destScripts));
gulp.task('build-scripts', ['jshint'], scripts(files.scripts, paths.destScripts, false));

gulp.task('images', function() {
    gulp.src(files.images)
        .pipe(gp.imagemin())
        .pipe(gulp.dest(paths.dest));
});

gulp.task('dev', [
    'html',
    'styles',
    'scripts',
    'images'
]);
gulp.task('build', [
    'html',
    'build-styles',
    'build-scripts',
    'images'
]);

gulp.task('watch', function() {
    _.forEach(files, function(glob, task) {
        gulp.watch(glob, [task]);
    });
    gulp.watch('gulpfile.js', function() {
        log('gulpfile.js changed, reloading server');
        process.exit(0);
    });
    gulp.watch('package.json', function() {
        log('package.json changed, installing packages...');
        cp.execSync('npm install', {stdio: 'inherit'});
        process.exit(0);
    });
    gulp.watch('bower.json', function() {
        log('bower.json changed, installing packages...');
        cp.execSync('bower install', {stdio: 'inherit'});
        process.exit(0);
    });
});
gulp.task('connect', ['dev'], function() {
    gp.nodemon({
      script: paths.server + 'index.js'
    }).on('restart', function () {
        log('app restarted!');
    });

    gp.livereload.listen(35729);
    gulp.watch(paths.client + '/**/*', function(event){
        log('livereload initiated');
        gp.livereload.changed({
            body: {
                files: [gp.path.relative('' + config.dev.port, event.path)]
            }
        });
    });

    log('app started on port', config.dev.port);
});
gulp.task('public', ['connect', 'watch']);
gulp.task('server', function() {
    cp.execSync('npm install', {stdio: 'inherit'});
    cp.execSync('bower install', {stdio: 'inherit'});
    var spawnChild = function() {
        cp.spawn('gulp', ['public'], {stdio: 'inherit'}).on('close', function(code) {
            if(code === 0) {
                spawnChild();
            }
        });
    };
    spawnChild();
});

gulp.task('update npm', function() {
});

gulp.task('spec', function() {
    gulp.src('nodep.js')
        .pipe(gp.istanbul())
        .pipe(gp.istanbul.hookRequire())
        .on('finish', function() {
            gulp.src(paths.test + 'spec.js')
                .pipe(gp.mocha())
                .pipe(gp.istanbul.writeReports());
        });
});

gulp.task('test', [
    'jshint',
    'spec'
]);

gulp.task('autotest', function() {
    gulp.watch([paths.src + '**/*.js', paths.test + '**/*.js'], ['test']);
});

gulp.task('docs', function() {
    gulp.src(['*.js','test/*.js'])
        .pipe(gp.concat('README.md'))
        .pipe(gp.jsdocToMarkdown({
            template: fs.readFileSync('./docs.hbs', 'utf8')
        })).pipe(gulp.dest('.'));
});

gulp.task('changelog', function() {
    gulp.src('CHANGELOG.md')
        .pipe(gp.conventionalChangelog({
            preset: 'angular'
        })).pipe(gulp.dest('.'));
});

gulp.task('default', ['server']);

