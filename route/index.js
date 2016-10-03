/**
 * Created by thinksysuser on 22/9/16.
 */

const express = require("express"),
    app = require("../util/app"),
    passport = require("../lib/middleware/passport"),
    crudify = require("./crud"),
    swagger = require("./swagger"),
    v1Router = express.Router(),
    //Controllers
    User = require("../controller/user");

//Add Crud Operations
crudify( User , v1Router , "/user" );
v1Router.post( '/user/login' ,  passport.ldapAuth , User.login );

//mount to app
app.use( v1Router );