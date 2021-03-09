'use strict';

const Joi = require('joi');

module.exports = ({
    method: 'GET',
    path: '/another_test',
    options: {
        tags: ['api'],
        validate: {
            query: {
                filters: {
                    level: Joi.number().min(1).max(2).optional()
                }
            },
        }
    },
    handler: async (request) => {
        return {ans: 'from test route 2'};
    }
});