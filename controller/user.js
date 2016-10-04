/**
 * Created by thinksysuser on 23/9/16.
 */

const util = require("../util"),
    UserModel = require("../model").User,
    User = require("../service").userService,
    CrudController = require("./base-controller/crud-controller");

//================================================== Class ====================================================

/**
 * Extend Class from Base Crud
 */
class UserController extends CrudController{

    /**
     * Login Handler
     * @param req
     * @param res
     */
    login( req , res ){
        req.app.sendSuccess( res , req.token );
    }

    get PROFILE_SPEC(){
        return {
          a : 1
        };
    }
    /**
     * Returns User Profile
     * @param req
     * @param res
     */
    profile( req , res ){
        //Fetch From DB
        User.model.findOne({ userId : req.user.userId } )
            .then( user => req.app.sendSuccess( res , user ) )
            .catch( err => req.app.throwError( res , err ));
    }

}

//================================================== Exports ======================================================

module.exports = new UserController(UserModel);