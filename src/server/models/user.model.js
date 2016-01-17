'use strict';

// TODO remove this example
const USER_TEST_QUERY = `
        SELECT NOW() AS "theTime"
`;

module.exports = function(dbController) {
    dbController.createJsonTable('Users');

    return {
        // TODO remove this example
        test: dbController.prepare('USER_TEST_QUERY', USER_TEST_QUERY)
    };
};
