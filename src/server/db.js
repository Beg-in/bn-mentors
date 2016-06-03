'use strict';

var pg = require('pg');

module.exports = function(_, config) {

    var connect = function() {
        return new Promise(function(resolve, reject) {
            var details = config.pg.url || {
                user: config.pg.user,
                password: config.pg.pass,
                host: config.pg.host,
                port: config.pg.port,
                database: config.pg.db
            };
            pg.connect(details, function(err, client, done) {
                if(err) {
                    var message = 'error fetching client from pool';
                    console.error(message, err);
                    reject({
                        reason: message,
                        error: err
                    });
                } else {
                    resolve({
                        client: client,
                        done: done
                    });
                }
            });
        });
    };

    var query = function() {
        var args = arguments;
        return new Promise(function(resolve, reject) {
            connect().then(function(connection) {
                connection.client.query.apply(connection.client, args).on('row', function(row, result) {
                    result.addRow(row);
                }).on('end', function(result) {
                    resolve(result);
                    connection.done();
                }).on('error', function(err) {
                    var message = 'error running query';
                    console.error(message, err);
                    connection.done();
                    reject({
                        reason: message,
                        error: err
                    });
                });
            }).catch(reject);
        });
    };

    return {
        pg: pg,
        connect: connect,
        query: query,
        prepare: function(name, text) {
            return function(values) {
                if(!_.isArray(values)) {
                    values = [values];
                }
                return query({
                    name: name,
                    text: text,
                    values: values
                }).catch(function(err) {
                    console.error(`error in query ${name}`, err);
                    throw err;
                });
            };
        },
        transaction: function(cb) {
            return query('BEGIN').then(cb).then(function() {
                return query('COMMIT');
            }).catch(function(err) {
                query('ROLLBACK');
                throw err instanceof Error ? err : new Error(err);
            });
        }
    };
};
