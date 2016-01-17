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
        }
    };
};
