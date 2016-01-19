'use strict';

module.exports = function(userModel) {
    return {
        getAll: function() {
            return userModel.getAll().then(function(result) {
                return result.rows;
            });
        },
        getByEmail: function(email) {
            return userModel.getByEmail([email]).then(function(result) {
                return result.rows;
            });
        },
        getByUrl: function(url) {
            return userModel.getByUrl([url]).then(function(result) {
                return result.rows;
            });
        }
    };
};
