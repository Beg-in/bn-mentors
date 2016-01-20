    'use strict';

    module.exports = function(profileModel) {
        return {
            getAll: function() {
            return profileModel.getAll().then(function(result) {
                return result.rows;
            });
        },
        getByEmail: function(email) {
            return profileModel.getByEmail([email]).then(function(result) {
                return result.rows;
            });
        }
    };
};
