'use strict';

var pg = require('pg');

module.exports = function(config) {
    return {
        createJsonTable: function(name) {
            var query = `
                create table ${name} if not exists (
                    data JSON
                );
            `;
        }
    };
};
