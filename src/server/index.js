'use strict';

var $p = require('nodep')();
var _ = require('lodash');
var express = require('express');
var app = express();
var config = require('../../config.json');

$p.init({
    _: _,
    express: express,
    app: app,
    config: config
}).init([
    '**/*',
]);

var env = process.env.NODE_ENV || 'dev';

if(env === 'dev') {
    app.use(require('connect-livereload')());
}

app.use(express.static(__dirname + config[env].root));
app.listen(config[env].port);

