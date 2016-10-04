/**
 * Created by thinksysuser on 23/9/16.
 */

const CrudController = require("./base-controller/crud-controller"),
    util = require("../util"),
    UserModel = require("../model").User,
    User = require("../service").userService;

class UserController extends CrudController{

    login( req , res ){
        req.app.sendSuccess( res , req.token );
    }
    profile( req , res ){

        User.model.findOne({ userId : req.user.userId } )
            .then( user => req.app.sendSuccess( res , user ) )
            .catch( err => req.app.throwError( res , err ));
    }

}
module.exports = new UserController(UserModel);