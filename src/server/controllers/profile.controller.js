    'use strict';

    module.exports = function(_,profileModel) {

    return {
        getAll: function() {
            return profileModel.getAll([]).then(function(result) {
                return result;
            });
        },
        getByEmail: function(email) {
            return profileModel.getByEmail(email).then(function(result) {
                return result;
            });
        },
        createProfile: function(profile) {
          var p = new profileModel({name: profile.name, email: profile.email, phone: profile.phone, profession: profile.profession, bio: profile.bio, tags: profile.tags});
          profileModel.create(p);
          return ("Thanks " + p.name + "! Profile created successfully!");
        },
        createSchedule: function(schedule) {
          var prof = profileModel.read(schedule.id);
          prof.schedule = schedule;
          profileModel.read(schedule.id).then(profile => profile.update(prof));
        },
        getSchedule: function(id) {
          return profileModel.read(id).then(function(result){
            return (result.schedule);
          });
        },
        createAppointment: function(appointment) {
          var prof = profileModel.read(appointment.id);
          if(!_.isArray(prof.appointments)){
            prof.appointments = [appointment];
          }else{
            prof.appointments.push(appointment);
          };
          profileModel.read(appointment.id).then(profile => profile.update(prof));
        },
        getAppointments: function(id){
          return profileModel.read(id).then(function(result){
            return (result.appointments);
          });
        },
        getAppointment: function(body){
          return profileModel.read(body.id).then(function(result){
            return (_.find(result.appointments, {'email': body.email}));
          });
        },
        update: function(id, obj) {
          return profileModel.read(id).then(profile => profile.update(obj));
        },
        read: function(id){
          return profileModel.read(id);
        }
        // updateByEmail: function(body) {
        // var uprof = (this.getByEmail(body.email));
        //   for(var property in body){
        //     uprof[property] = body[property];
        //   };
        //   uprof.update();
        // prof.update(uprof);
        // return (prof);

        // }
    }
};
