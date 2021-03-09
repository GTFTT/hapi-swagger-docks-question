'use strict';

const fs = require('fs');
const convict = require('convict');

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  config: {
    doc: 'The config file path.',
    default: '',
    type: String,
    arg: 'config',
    env: 'RECEIVABLE_AND_PAYABLE_MICRO_CONFIG'
  },
  ip: {
    doc: 'The IP address to bind.',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'HOST',
    arg: 'ipAddress'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 5000,
    env: 'PORT',
    arg: 'port'
  },
});

// Load environment dependent configuration
const configPath = config.get('config') || `${__dirname}/../../config/${config.get('env')}.json`;
if (fs.existsSync(configPath)) {
  config.loadFile(configPath);
}

// Perform validation
config.validate({allowed: 'strict'});

module.exports = config;