'use strict';

var path = require('path');
var util = require('util');
var _ = require('lodash');
var express = require('express');
var compress = require('compression');
var app = express();
var bodyParser = require('body-parser');
var throng = require('throng');
var $p = require('nodep')();
var config = require('./config');

var start = function() {
    app.use(compress());
    app.use(bodyParser.json());

    $p.init({
        path: path,
        util: util,
        _: _,
        express: express,
        app: app,
        config: config
    }).init('src/server/**/*');

    if(config.env.isDev) {
        app.use(require('connect-livereload')());
        app.use('/styles', express.static(config.paths.stylesDev));
        app.use('/fonts', express.static(config.paths.fontsDev));
        app.use('/bower_components', express.static(config.paths.bower));
    } else {
        // TODO add cache control
        // var oneDay = 86400000;
        // app.use(express.static(__dirname + '/public', { maxAge: oneDay }));
    }

    app.use(express.static(config.env.root));
    app.listen(config.env.port);
    util.log('start worker');
};

if(config.debug) {
  start();
} else {
  throng(start, {
    workers: config.workers,
    lifetime: Infinity
  });
}
