'use strict';

var path = require('path');
var _ = require('lodash');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var $p = require('nodep')();
var jwt = require('jsonwebtoken');
var config = require('./config');

app.use(bodyParser.json());

$p.init({
    path: path,
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
}

app.use(express.static(config.env.root));
app.listen(config.env.port);
