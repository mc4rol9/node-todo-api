// setup development and test environment
var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test'){
    var config = require('./config.json');
    var envConfig = config[env];
    // returns the object properties as an array
    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key]
    });
}