'use strict';

module.exports = function(dbController) {
    dbController.createJsonTable('Users');

    return {
        getAll: dbController.prepare('SELECT_ALL_USERS', `
            select *
            from Users
        `)
    };
};
