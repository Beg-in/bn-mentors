'use strict';

module.exports = function(routeController) {
    routeController('user', function(route) {
        route.get('test', function() {
            return {};
        });

        route.post('test', function(req, body) {
            return body;
        });
    });
};
