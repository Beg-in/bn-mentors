    'use strict';

    module.exports = function(profileModel) {

    return {
        getAll: function() {
            return profileModel.getAll([]).then(function(result) {
                return result;
                // return("Cat");
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
        update: function(id, obj) {
          return profileModel.read(id).then(profile => profile.update(obj));
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
