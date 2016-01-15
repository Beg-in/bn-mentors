'use strict';

/**
 * # Bloomington-Normal Mentors Website
 * @module introduction
 */

var client = 'src/client';
var dest = 'public';

module.exports = {
    paths: {
        client: client + '/',
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
    env: {
        isDev: process.env.NODE_ENV === 'dev',
        port: process.env.PORT || 8081,
        root: __dirname + '/' + this.isDev ? client : dest
    },
    pg: {
        user: process.env.PG_USER,
        pass: process.env.PG_PASS
    }
};
