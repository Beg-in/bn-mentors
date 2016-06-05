'use strict';

module.exports = function(route, profileController) {
    route('api/v1/profile', function(method) {
        method.get(function(req, body) {
            return profileController.getAll();
        });

        method.post('id', function(req, body){
          return profileController.read(body.id);
        });

        method.post('email', function(req, body) {
            return profileController.getByEmail(body.email);
        });

        method.put('update', function(req, body) {
            return profileController.updateByEmail(body);
        });

        method.get('url/:url', function(req) {
            return profileController.getByUrl(req.params.url);
        });

        method.put('new', function(req, body){
            return profileController.createProfile(body);
        });
        method.put(':id', function(req, body, res) {
            return imageController.update(req.params.id, body);
        });
    });
};
