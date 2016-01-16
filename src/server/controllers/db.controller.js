'use strict';

var pg = require('pg');

module.exports = function(config) {

    var connect = function() {
        return new Promise(function(resolve, reject) {
            pg.connect({
                user: config.pg.user,
                password: config.pg.pass,
                host: config.pg.host,
                port: config.pg.port,
                database: config.pg.db
            }, function(err, client, done) {
                if(err) {
                    var message = 'error fetching client from pool';
                    reject({
                        reason: message,
                        error: err
                    });
                    return console.error(message, err);
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
                    reject({
                        reason: message,
                        error: err
                    });
                    console.error(message, err);
                    connection.done();
                });
            }).catch(reject);
        });
    };

    return {
        pg: pg,
        connect: connect,
        query: query,
        createJsonTable: function(name) {
            return query(`
                create table if not exists ${name} (
                    data jsonb
                );
            `).then(function() {
                console.log(`load table ${name}`)
            });
        }
    };
};
