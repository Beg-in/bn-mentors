'use strict';

module.exports = function(model) {

    return class extends model({
        table: 'Profile',
        properties: {
            name: model.valid.name,
            email: model.valid.email,
            bio: model.valid.nullable,
            phone: model.valid.nullable,
            profession: model.valid.nullable,
            tags: model.valid.nullable
        },
        queries: {
            getAll: `
                select ${model.JSONB}
                from Profile;
            `,
            getByEmail: `
                select ${model.JSONB}
                from Profile
                where data->>'email' = $1;
            `
        }
    }) {
        constructor(obj) {
            super(obj);
        }

    };

};
