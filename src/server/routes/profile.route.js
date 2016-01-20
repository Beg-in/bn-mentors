'use strict';

module.exports = function(route, profileController) {
    route('api/v1/profile', function(method) {
        method.get('all', function() {
            return profileController.getAll();
        });

        method.post('email', function(req, body) {
            return profileController.getByEmail(body.email);
        });

        method.get('url/:url', function(req) {
            return profileController.getByUrl(req.params.url);
        });
    });
};
