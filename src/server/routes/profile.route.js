'use strict';

module.exports = function(route, profileController) {
    route('api/v1/profile', function(method) {
        method.get(function(req, body) {
            return profileController.getAll();
        });

        method.get(':id', function(req){
          console.log('Hi');
          return profileController.read(req.params.id);
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
        method.put(':id', function(req, body) {
            // console.log(req.params.id);
            return profileController.update(req.params.id, body);
        });

        // SCHEDULE
        method.put('schedule', function(req, body){
          return profileController.createSchedule(body);
        });
        method.post('schedule', function(req, body){
          return profileController.getSchedule(body.id);
        });

        // APPOINTMENTS
        method.put('appointment', function(req, body){
          return profileController.createAppointment(body);
        });
        method.post('appointment', function(req, body){
          return profileController.getAppointments(body.id);
        });
        method.post('appointment/email', function(req, body){
          return profileController.getAppointment(body);
        });

        // SIGNUP
    });
};
