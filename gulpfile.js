'use strict';

var cp = require('child_process');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var gulp = require('gulp');
var gp = require('gulp-load-plugins')({
    rename: {
        'gulp-cssnano': 'cssmin'
    }
});
var del = require('del');
gp.livereload = require('tiny-lr')();

/**
 * ## Build
 * ### Requirements
 * - [Gulp](http://gulpjs.com/)
 * ```bash
 * $ npm install -g gulp
 * ```
 * - [Bower](http://bower.io/)
 * ```bash
 * $ npm install -g bower
 * ```
 * - [Node-Foreman](http://strongloop.github.io/node-foreman/)
 * ```bash
 * $ npm install -g foreman
 * ```
 * - [Postgresql](http://www.postgresql.org/)
 *
 * ### Development runtime
 * #### Livereload server:
 * Add a file called `.env` to the root of the project with the following contents:
 * ```json
 * {
 *     "node": {
 *         "env": "dev"
 *     }
 * }
 * ```
 * You can now run the development server by running the following commands:
 * ```bash
 * $ npm install
 * $ bower install
 * $ nf run gulp server
 * ```
 *
 * - You can now visit [http://localhost:8081/](http://localhost:8081/) to view changes live.
 *
 * #### Directories
 * - `src/client` - clientside html, scripts, and styles
 * - `src/server` - serverside scripts and sql queries
 *
 * #### Serverside runtime
 * - Uses dependency injection from [Nodep](http://nodep.org)
 *
 * ### Running the test suite
 * #### Single Run:
 * ```bash
 * $ gulp test
 * ```
 * #### Continuous testing when files are changed:
 * ```bash
 * $ gulp autotest
 * ```
 * ### Generating README.md
 * ```bash
 * $ gulp docs
 * ```
 * ### Generating CHANGELOG.md
 * ```bash
 * $ gulp changelog
 * ```
 * ### Notes
 * - jshint is part of the test suite and should be kept clean
 * - Commits should have high test coverage
 * - Docs should be kept up to date
 * - Additions should come with documentation
 * - commit messages should follow [conventional format](https://github.com/ajoslin/conventional-changelog/blob/master/conventions/angular.md)
 * @module contributing
 */

var config = require('./config');
var paths = config.paths;
var files = {
    html: [
        path.join(paths.client, '*.html')
    ],
    styles: [
        path.join(paths.stylesSrc, '**/*.scss'),
        path.join(paths.bower, 'bootstrap-sass/assets/stylesheets/**/*.scss')
    ],
    scripts:[
        path.join(paths.scriptsSrc, '**/*.js')
    ],
    images: [
        path.join(paths.client, '**/*.png')
    ]
};

var log = function() {
    var args = _.map(arguments, arg => gp.util.colors.green(arg));
    args.unshift(gp.util.colors.green('[server]'));
    gp.util.log.apply(gp.util, args);
};

gulp.task('clean', ['jshint'], function() {
    return del([paths.dest]);
});

gulp.task('html', ['clean'], function() {
    return gulp.src(path.join(paths.client, '*.html'))
        .pipe(gp.htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(paths.dest));
});

gulp.task('styles', ['clean'], function() {
    return gulp.src(path.join(paths.stylesSrc, 'styles.scss'))
        //.pipe(gp.debug({title: 'styles'}))
        //.pipe(gp.plumber({errorHandler: true}))
        .pipe(gp.sourcemaps.init({loadMaps: true}))
        .pipe(gp.sass({
            includePaths: [
                path.join(paths.client, 'styles'),
                path.join(paths.bower, 'bootstrap-sass/assets/stylesheets')
            ]
        }))
        .pipe(gp.autoprefixer())
        .pipe(gp.concat('app.min.css'))
        .pipe(gp.cssmin())
        .pipe(gp.sourcemaps.write('.'))
        .pipe(gulp.dest(paths.stylesDest));
});

gulp.task('jshint', function() {
    return gulp.src(_.union(files.scripts, ['*.js', path.join(paths.server, '**/*.js')]))
        .pipe(gp.jshint())
        .pipe(gp.jshint.reporter(require('jshint-stylish')));
        //.pipe(jshint.reporter('fail'));
});

gulp.task('scripts', ['clean'], function() {
    return gulp.src(files.scripts)
        //.pipe(gp.debug({title: 'scripts'}))
        //.pipe(gp.plumber({errorHandler: true}))
        .pipe(gp.sourcemaps.init())
        .pipe(gp.concat('app.min.js'))
        .pipe(gp.uglify())
        .pipe(gp.sourcemaps.write('.'))
        .pipe(gulp.dest(paths.scriptsDest));
});

gulp.task('images', ['clean'], function() {
    return gulp.src(files.images)
        .pipe(gp.imagemin())
        .pipe(gulp.dest(paths.dest));
});

gulp.task('build', [
    'clean',
    'html',
    'styles',
    'scripts',
    'images'
]);

gulp.task('demon', ['build'], function() {
    _.forEach(files, function(glob, task) {
        gulp.watch(glob, [task]);
    });
    var reloadable = function(file, cb) {
        gulp.watch(file, function(event) {
            if(event.path.indexOf(file) === -1) {
                return;
            } else {
                cb();
            }
        });
    };
    reloadable('gulpfile.js', function() {
        log('gulpfile.js changed, reloading server');
        process.exit(0);
    });
    reloadable('package.json', function() {
        log('package.json changed, installing packages...');
        cp.execSync('npm install', {stdio: 'inherit'});
        process.exit(0);
    });
    reloadable('bower.json', function() {
        log('bower.json changed, installing packages...');
        cp.execSync('bower install', {stdio: 'inherit'});
        process.exit(0);
    });

    gp.nodemon({
      script: 'index.js',
      watch: [paths.server, 'config.js', 'index.js'],
      tasks: ['jshint']
    }).on('restart', function () {
        log('app restarted!');
    }).on('crash', function () {
        log('app crashed!');
    }).on('exit', function () {
        process.kill(process.pid, 'SIGUSR2');
        log('app exited!');
    });
    log('app started on port', config.env.port);

    gp.livereload.listen(35729);
    gulp.watch(path.join(paths.client, '**/*'), function(event){
        log('livereload initiated');
        setTimeout(function() {
            gp.livereload.changed({
                body: {
                    files: [path.relative('' + config.env.port, event.path)]
                }
            });
        }, 1000);
    });
});

gulp.task('server', function() {
    cp.execSync('npm install', {stdio: 'inherit'});
    cp.execSync('bower install', {stdio: 'inherit'});
    var spawnChild = function() {
        cp.spawn('gulp' + (config.isWin ? '.cmd' : ''), ['demon'], {stdio: 'inherit'}).on('close', function(code) {
            if(code === 0) {
                spawnChild();
            }
        });
    };
    spawnChild();
});

gulp.task('spec', function() {
    return gulp.src('nodep.js')
        .pipe(gp.istanbul())
        .pipe(gp.istanbul.hookRequire())
        .on('finish', function() {
            gulp.src(path.join(paths.test, 'spec.js'))
                .pipe(gp.mocha())
                .pipe(gp.istanbul.writeReports());
        });
});

gulp.task('test', [
    'jshint',
    'spec'
]);

gulp.task('autotest', function() {
    gulp.watch([path.join(paths.scriptsSrc, '**/*.js'), path.join(paths.test, '**/*.js')], ['test']);
});

gulp.task('docs', function() {
    return gulp.src(['gulpfile.js', 'config.js', 'src/**/*.js','test/*.js'])
        .pipe(gp.concat('README.md'))
        .pipe(gp.jsdocToMarkdown({
            template: fs.readFileSync('./docs.hbs', 'utf8')
        })).pipe(gulp.dest('.'));
});

gulp.task('changelog', function() {
    return gulp.src('CHANGELOG.md')
        .pipe(gp.conventionalChangelog({
            preset: 'angular'
        })).pipe(gulp.dest('.'));
});

gulp.task('default', ['server']);

