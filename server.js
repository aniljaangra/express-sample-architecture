/**
 * Created by thinksysuser on 22/9/16.
 */

const express = require("express"),
    app = express(),
    env = require("./config/env");

//Export app object
require("./util/app")(app);

//Configure Middlewares
require("./lib/middleware/configure");

//Configure DB
require("./config/dao-config");

//Include Routers
require("./route");

//Attach ErrorHandler to Handle All Errors
app.use(require('./util/response-handler').handleError);

app.listen( env.port || 3001 );
