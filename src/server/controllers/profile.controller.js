    'use strict';

    module.exports = function(profileModel) {

    return {
        getAll: function() {
            return profileModel.getAll().then(function(result) {
                return result.rows;
            });
        },
        getByEmail: function(email) {
            return profileModel.getByEmail([email]).then(function(result) {
                return result.rows;
            });
        }
    };

    // Profile.build({bio: 'thing', name: 'brian', email: 'brian.jesse@gmail.com'}).then(function(profile) {
    //     console.log('build', profile);
    //     profile.create();
    //     return profile.build({bio: 'new thing'})
    // }).then(function(profile) {
    //     console.log('update', profile);
    //     return profile.update();
    // }).then(function(profile) {
    //     return Profile.read(profile._id);
    // }).then(function(profile) {
    //     console.log('read', profile);
    // }).catch(function(err) {
    //     console.log(err);
    // });

};
