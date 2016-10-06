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

    get LOGIN_SPEC(){
        return {
            "nickname" : "getUserProfile",
            "description" : "login user",
            "path" : "/user/login",
            "method": "POST",
            "parameters" : [
                { name : "userName", description : "username", required : true ,  type : "string"},
                { name : "password", description : "User password", required : true , type : "string"}
            ]
        };
    }
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
            "description" : "get user profile",
            "path" : "/user/profile",
            "notes" : "get user complete profile",
            "summary" : "get user complete profile",
            "method": "GET",
            "parameters" : [{ name : "userName", description : "ID of pet that needs to be fetched", type : "string"}],
            "type" : "User",
            "nickname" : "getUserProfile"
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