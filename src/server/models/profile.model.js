'use strict';

module.exports = function(model) {

    return class extends model({
        table: 'Profile',
        properties: {
            email: model.valid.email,
            bio: model.valid.nullable
        },
        queries: {
            getAll: `
                select *
                from Profile;
            `,
            getByEmail: `
                select *
                from Profile
                where data->>'email' = $1;
            `
        }
    }) {
        // TODO User specific class structure
        constructor() {
        }
    };
};
