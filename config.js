'use strict';
/**
 * # License
 * [The MIT License (MIT)](http://www.opensource.org/licenses/mit-license.html)
 *
 * Copyright (c) 2016 Slingshot CoWork
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * @module license
 */

/**
 * # Bloomington-Normal Mentors Website
 * @module introduction
 */

var path = require('path');

var client = path.resolve('src/client');
var dest = path.resolve('public');

var env = {
    isDev: process.env.NODE_ENV === 'dev',
    port: process.env.PORT || 8081,
};
env.root = env.isDev ? client : dest;

module.exports = {
    paths: {
        client: client,
        server: path.resolve('src/server/'),
        dest: dest,
        bower: path.resolve('bower_components/'),
        test: path.resolve('test/'),
        scriptsSrc: path.join(client, 'scripts'),
        scriptsDest: path.join(dest, 'scripts'),
        stylesSrc: path.join(client, 'styles'),
        stylesDest: path.join(dest, 'styles'),
        stylesDev: path.join(dest, 'styles'),
        fontsDev: path.join(dest, 'fonts')
    },
    env: env,
    pg: {
        user: process.env.PG_USER,
        pass: process.env.PG_PASS
    },
    platform: process.platform,
    isWin: process.platform === 'win32'
};

