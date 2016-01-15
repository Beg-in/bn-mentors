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
