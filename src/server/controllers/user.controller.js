'use strict';

module.exports = function(userModel) {
    return {
        getAll: function() {
            return userModel.getAll().then(function(result) {
                return result.rows;
            });
        },
        getByEmail: function(email) {
            userModel.getByEmail([email]).then(function(result) {
                return result.rows;
            });
        }
    };
};
