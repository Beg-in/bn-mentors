'use strict';

module.exports = function(routeController, userController) {
    routeController('user', function(route) {
        route.get('all', function() {
            return userController.getAll();
        });

        route.post('test', function(req, body) {
            return body;
        });
    });
};
