'use strict';

var config = require('./config');
var $p = require('nodep')();
var fritz = require('Fritz')();

fritz.static('public');

$p.provider(fritz.provider);

$p.init('src/server/**/*.js');

fritz.start();
