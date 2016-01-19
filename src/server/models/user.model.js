'use strict';

module.exports = function(dbController) {
    dbController.createJsonTable('Users');

    return {
        getAll: dbController.prepare('USER_GET_ALL', `
            select *
            from Users
        `),
        getByEmail: dbController.prepare('USER_GET_BY_EMAIL', `
            select *
            from Users
            where data->>'email' = $1
        `),
        getByUrl: dbController.prepare('USER_GET_BY_URL', `
            select *
            from Users
            where data->>'url' = $1
        `)
    };
};
