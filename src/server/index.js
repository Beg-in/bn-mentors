'use strict';

var $p = require('nodep')();
var _ = require('lodash');
var express = require('express');
var app = express();
var config = require('../../config');

$p.init({
    _: _,
    express: express,
    app: app,
    config: config
}).init([
    '**/*',
]);

if(config.env.isDev) {
    app.use(require('connect-livereload')());
}

app.use(express.static(config.env.root));
app.listen(config.env.port);

