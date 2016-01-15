'use strict';

/**
 * # Bloomington-Normal Mentors Website
 * @module introduction
 */

var client = 'src/client';
var dest = 'public';
var env = process.env.NODE_ENV || 'dev';
if(env == 'dev') {
    env = {
        isDev: true,
        port: 8081,
        root: __dirname + '/' + client
    }
} else {
    env = {
        isDev: false,
        port: process.env.PORT || 8080,
        root: __dirname + '/' + dest
    }
}
env.pg = {
    user: process.env.PG_USER,
    pass: process.env.PG_PASS
};

module.exports = {
    paths: {
        client: client,
        server: 'src/server/',
        dest: dest,
        bower: 'bower_components/',
        test: 'test/',
        scriptsSrc: client + '/scripts/',
        scriptsDest: dest + '/scripts/',
        stylesSrc: client + '/styles/',
        stylesDest: dest + '/styles/',
        stylesDev: __dirname + '/' + dest + '/styles'
    },
    env: env
};
