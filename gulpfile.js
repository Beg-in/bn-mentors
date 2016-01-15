'use strict';

var cp = require('child_process');
var fs = require('fs');
var _ = require('lodash');
var gulp = require('gulp');
var gp = require('gulp-load-plugins')({
    rename: {
        'gulp-cssnano': 'cssmin'
    }
});
gp.clean = require('del');
gp.livereload = require('tiny-lr')();
gp.path = require('path');

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
        paths.client + '*.html'
    ],
    styles: [
        paths.stylesSrc + '**/*.scss',
        paths.bower + 'roboto-fontface/css/*.scss',
        paths.bower + 'bootstrap-sass/assets/stylesheets/**/*.scss'
    ],
    scripts:[
        paths.scriptsSrc + '**/*.js'
    ],
    images: [
        paths.client + '*.png'
    ],
    fonts: [
        paths.bower + 'roboto-fontface/fonts/**/*'
    ]
};

var log = function() {
    var args = _.map(arguments, arg => gp.util.colors.green(arg));
    args.unshift(gp.util.colors.green('[server]'));
    gp.util.log.apply(gp.util, args);
};

gulp.task('clean', function() {
    gp.clean([paths.dest]);
});

gulp.task('html', ['clean'], function() {
    gulp.src(paths.client + '*.html')
        .pipe(gp.htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(paths.dest));
});

gulp.task('styles', ['clean'], function() {
    gulp.src(paths.stylesSrc + 'styles.scss')
        //.pipe(gp.debug({title: 'styles'}))
        //.pipe(gp.plumber({errorHandler: true}))
        .pipe(gp.sourcemaps.init({loadMaps: true}))
        .pipe(gp.sass({
            includePaths: [
                paths.client + 'styles',
                paths.bower + 'roboto-fontface/css',
                paths.bower + 'bootstrap-sass/assets/stylesheets'
            ]
        }))
        .pipe(gp.autoprefixer())
        .pipe(gp.concat('app.min.css'))
        //.pipe(gp.cssmin())
        .pipe(gp.sourcemaps.write('.'))
        .pipe(gulp.dest(paths.stylesDest));
});

gulp.task('jshint', ['clean'], function() {
    gulp.src(_.union(files.scripts, ['gulpfile.js', paths.server + '**/*.js']))
        .pipe(gp.jshint())
        .pipe(gp.jshint.reporter(require('jshint-stylish')));
        //.pipe(jshint.reporter('fail'));
});

gulp.task('scripts', ['jshint'], function() {
    gulp.src(files.scripts)
        //.pipe(gp.debug({title: 'scripts'}))
        //.pipe(gp.plumber({errorHandler: true}))
        .pipe(gp.sourcemaps.init())
        .pipe(gp.concat('app.min.js'))
        .pipe(gp.uglify())
        .pipe(gp.sourcemaps.write('.'))
        .pipe(gulp.dest(paths.scriptsDest));
});

gulp.task('images', ['clean'], function() {
    gulp.src(files.images)
        .pipe(gp.imagemin())
        .pipe(gulp.dest(paths.dest));
});

gulp.task('fonts', ['clean'], function() {
    gulp.src(files.fonts)
        .pipe(gulp.dest(paths.dest + '/fonts'));
});

gulp.task('build', [
    'html',
    'styles',
    'scripts',
    'images',
    'fonts'
]);

gulp.task('demon', ['build'], function() {
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

    gp.nodemon({
      script: paths.server + 'index.js',
      watch: paths.server,
      tasks: ['jshint']
    }).on('restart', function () {
        log('app restarted!');
    });
    log('app started on port', config.env.port);

    gp.livereload.listen(35729);
    gulp.watch(paths.client + '/**/*', function(event){
        log('livereload initiated');
        gp.livereload.changed({
            body: {
                files: [gp.path.relative('' + config.env.port, event.path)]
            }
        });
    });

});

gulp.task('server', function() {
    cp.execSync('npm install', {stdio: 'inherit'});
    cp.execSync('bower install', {stdio: 'inherit'});
    var spawnChild = function() {
        cp.spawn('gulp', ['demon'], {stdio: 'inherit'}).on('close', function(code) {
            if(code === 0) {
                spawnChild();
            }
        });
    };
    spawnChild();
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
    gulp.watch([paths.scriptsSrc + '**/*.js', paths.test + '**/*.js'], ['test']);
});

gulp.task('docs', function() {
    gulp.src(['gulpfile.js', 'config.js', 'src/**/*.js','test/*.js'])
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

