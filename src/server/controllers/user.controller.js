'use strict';

module.exports = function(userModel) {
    return {
        getAll: function() {
            return new Promise(function(resolve, reject) {
                userModel.getAll().then(function(result) {
                    resolve(result.rows);
                    console.log(result.rows);
                }).catch(reject);
            });
        },
        getByEmail: function(email) {
            return new Promise(function(resolve, reject) {
                userModel.getByEmail([email]).then(function(result) {
                    resolve(result.rows);
                }).catch(reject);
            });
        }
    };
};
