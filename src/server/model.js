'use strict';

var shortid = require('shortid');

module.exports = function(_, db) {

    var rule = function(regex, message) {
        return  {
            test: function(value) {
                return regex.test(value);
            },
            message: message
        };
    };

     var valid = {
        rule: rule,
        id: {
            test: shortid.isValid,
            message: 'Not a valid id'
        },
        nonempty: rule(
            /^(?!\\s*$).+/,
            'Must not be empty'
        ),
        name: rule(
            /^(?!\\s*$).{2,}/,
            'Must be at least two characters'
        ),
        email: rule(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Must be a valid email address'
        ),
        password: rule(
            /.{8,}/,
            'Must be at least 8 characters in length'
        ),
        nullable: {
           test: function() {
                return true;
            }
        }
    };

    var createModelTable = function(name) {
        return db.query(`
            create table if not exists ${name} (
                id text primary key not null,
                data jsonb
            );
        `).then(function() {
            console.info(`load table ${name}`);
        });
    };


    var model = function(descriptor) {
        createModelTable(descriptor.table);
        var createQuery = db.prepare(`${descriptor.table.toUpperCase()}_CREATE`, `
            insert
            into ${descriptor.table}
            values($1, $2);
        `);
        var readQuery = db.prepare(`${descriptor.table.toUpperCase()}_READ`, `
            select data
            from ${descriptor.table}
            where id = $1;
        `);
        var updateQuery = db.prepare(`${descriptor.table.toUpperCase()}_UPDATE`, `
            update ${descriptor.table}
            set data = $2
            where id = $1;
        `);
        var deleteQuery = db.prepare(`${descriptor.table.toUpperCase()}_DELETE`, `
            delete
            from ${descriptor.table}
            where id = $1
        `);

        class Model {
            constructor(obj) {
                if(!valid.id.test(obj._id)) {
                    this._id = shortid.generate();
                }
                _.forEach(descriptor.properties, function(rule, property) {
                    this[property] = obj[property];
                }, this);
            }
            create() {
                return createQuery([this._id, JSON.stringify(this)]);
            }
            update() {
                return updateQuery([this._id, JSON.stringify(this)]);
            }
            delete() {
                return deleteQuery(this._id);
            }
            build(obj) {
                _.forEach(obj, function(value, property) {
                    this[property] = value;
                }, this);
                return Model.validate(this);
            }
            static validate(obj) {
                return new Promise(function(resolve, reject) {
                    _.forEach(descriptor.properties, function(rule, property) {
                        if(!rule.test(obj[property])) {
                            reject(rule.message);
                        }
                    });
                    resolve(obj);
                });
            }
            static build(obj) {
                return Model.validate(obj).then(function() {
                    return new Model(obj)
                });
            }
        }

        Model.create = createQuery;
        Model.read = readQuery;
        Model.update = updateQuery;
        Model.delete = deleteQuery;

        if(descriptor.queries) {
            _.forEach(descriptor.queries, function(query, key) {
                Model[key] = db.prepare(`${descriptor.table.toUpperCase()}_${key.toUpperCase()}`, query);
            });
        }

        return Model;
    };

    model.valid = valid;
    model.createModelTable = createModelTable;
    model.shortid = shortid;

    return model;
};
