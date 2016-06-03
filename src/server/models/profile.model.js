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
        // TODO User specific class structure
        constructor() {
            super(obj);
        }
    };



    /* EXAMPLE ROBUST MODEL

    return class extends model({
        table: 'Image',
        properties: {
            originalname: model.valid.name,
            mimetype: model.valid.nullable,
            status: {
                test: function(value) {
                    return _.includes(TYPES, value);
                },
                message: 'Not a valid image status'
            },
            extension: model.valid.name,
            meta: model.valid.nullable
        },
        safe: [
            'originalname',
            'status',
            'source',
            'meta'
        ],
        queries: {
            getByStatus: `
                select ${model.JSONB}
                from Image
                where data->>'status' = $1;
            `
        }
    }) {
        constructor(obj) {
            super(obj);
        }
        static get Status() {
            return TYPES;
        }
        get filename() {
            return `${this._id}.${this.extension}`;
        }
    };

    */
};
