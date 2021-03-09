'use strict';

const Joi = require('joi');

module.exports = ({
    method: 'GET',
    path: '/test',
    options: {
        description: 'Test route',
        notes: ['My notes'],
        tags: ['api'],
        response: {
            schema: Joi.object().keys({
                ans: Joi.string().example('My comment example here')
            }),
          },
        validate: {
            query: {
                filters: Joi.object().keys({
                    level: Joi.number().min(1).max(2).optional().description('My description'),
                    property2: Joi.number().min(1).max(2).optional().description('My description of the second parameter'),
                    obj: Joi.object().keys({
                        propertyX: Joi.number().optional(),
                        propertyY: Joi.string().optional()
                    }).optional()
                }).description('My filter'),
                anotherObj: Joi.object().keys({
                    property1: Joi.number().min(1).max(2).optional().description('My description 1'),
                    property2: Joi.number().min(1).max(2).optional().description('My description 2'),
                    property3: Joi.number().min(1).max(2).optional().description('My description 3'),
                }).description('Just another object')
            },
        }
    },
    handler: async (request) => {
        return {ans: 'from test route 1'};
    }
});