'use strict'

const Hapi = require('@hapi/hapi');
const Vision = require('vision');
const Joi = require('joi');

// const config = require('./src/components/config');

// const server = Hapi.server({
//     host: config.get('ip'),
//     port: config.get('port'),
//     cache: cacheOptions,
//     routes: {
//         cors: {
//         additionalHeaders: ['cache-control']
//         }
//     }
// });