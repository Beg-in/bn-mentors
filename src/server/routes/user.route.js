'use strict';

module.exports = function(routeController, userController) {
    routeController('api/v1/user', function(route) {
        route.get('all', function() {
            return userController.getAll();
        });

        route.post('test', function(req, body) {
            return body;
        });
    });
};
