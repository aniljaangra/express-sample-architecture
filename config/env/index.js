/**
 * Created by thinksysuser on 22/9/16.
 */
const _ = require("lodash");


var config = {
    environment : 'local',
    ip : 'localhost',
    port : 3001,
    db : {
        mongodb : {
            host : "mongodb://localhost:27017/sample",
            userName : "",
            password : ""
        }
    }
}

var envConfig = {};

//ENV Config
switch(process.env.NODE_ENV){
    case 'dev' :
    case 'development' : envConfig = require('./developement'); break;
    case 'stage' :
    case 'staging' : envConfig = require('./staging'); break;
    case 'prod' :
    case 'production' : envConfig = require('./production'); break;
}

//Create Final Config JSON by extending env from default
_.extend( config , envConfig );

console.log('Application Running in' , config.environment , 'Environment')

module.exports = config;