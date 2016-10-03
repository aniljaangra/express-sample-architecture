/**
 * Created by thinksysuser on 26/9/16.
 */

const app = require("../../util/app"),
    config  = require('../../config/env'),
    responseHandler = require('../../util/response-handler'),
    logger = require("../../util/logger"),
    bodyparser = require("body-parser"),
    _ = require('../../util/lodash-mixin');


//Integrate Options With App
app.config  = config ;

//Static Middlewares
app.use( bodyparser.urlencoded({ extended : true , limit: '10mb' }));
app.use( bodyparser.json());

//Log Request
app.use( logger.requestLogger);

//Cross Origin
app.use( responseHandler.cors);

//Initialize Passport
app.use(require('../middleware/passport').passport.initialize());

//Initialize Response Handler
require("../../util/response-handler").init(app);