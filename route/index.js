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
    User = require("../controller/user"),
    v1RouterPrx = require("./router-proxy")( v1Router , User );

//Add Crud Operations
crudify( User , v1RouterPrx , "/user" );
v1RouterPrx.post( '/user/login' ,  passport.ldapAuth , User.login );
v1RouterPrx.get( '/user/profile' ,  passport.verifyUser , User.profile );

//mount to app
app.use( v1RouterPrx.getRouter() );