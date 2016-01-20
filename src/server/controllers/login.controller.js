'use strict';

module.exports = function(loginModel) {
    return {
    	login: function(username, password) {
    		return loginModel.loginUser().then(function(result) {
    			return result.rows;
    		});
    	}
    };
};
