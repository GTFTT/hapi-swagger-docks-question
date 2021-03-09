'use strict'

const Hapi = require('hapi');
const Vision = require('vision');
const Inert = require('inert');
const HapiSwagger = require('hapi-swagger');
const _ = require('lodash');

//Options
const swaggerOptions = require('./src/options/swaggerOptions');

//Server configurations
const config = require('./src/configs/config');

//Routes
const routes = require('./src/routes');

//lib
const routeExceptionHandler = require('./src/lib/routeExceptionHandlers/routeExceptionHandler');

//Rteating server instance
const server = Hapi.server({
    host: config.get('ip'),
    port: config.get('port'),
});

const startServer = async function () {
    if (config.get('env') === 'development') {
        await server.register([Inert, Vision, {plugin: HapiSwagger, options: swaggerOptions}]);
    }
    
    const exceptionHandledRoutes = routes.map((route) => _.isFunction(route.handler)
            ? Object.assign({}, route, {handler: routeExceptionHandler.bind(null, route)}) : route);

    await server.route(exceptionHandledRoutes);
  
    await server.start();
    server.log(['info'], `Server started at:  ${server.info.uri}`);
  };
  
async function gracefulShutdown() {
    try {
        server.log('info', 'Stopping server.');
        await server.stop();
        process.exit(0);
    } catch (err) {
        console.error(err);
        console.log('Stopping server.');
        process.exit(1);
    }
}

async function uncaughtExceptionShutdown(err) {
    console.error(err);
    console.log('Stopping server.');
    process.exit(1);
}

process.on('unhandledRejection', function (err) {
    throw err;
});

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('uncaughtException', uncaughtExceptionShutdown);


(async () => await startServer())();