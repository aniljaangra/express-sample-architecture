/**
 * Created by thinksysuser on 23/9/16.
 */

const BaseController = require("./base-controller"),
    _ = require("lodash"),
    User = require("../model").User;

class UserController extends BaseController{

    login( req , res ){
        req.app.sendSuccess( res , req.token );
    }

}
module.exports = new UserController(User);