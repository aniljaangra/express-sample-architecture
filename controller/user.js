/**
 * Created by thinksysuser on 23/9/16.
 */

const BaseController = require("./base-controller"),
    _ = require("lodash"),
    User = require("../model").User;

class UserController extends BaseController{

    login( req , res ){
        req.app.sendSuccess( res , req.user);
    }
    getUsers(req, res) {
        this.Model.find().then(function (as) {
            console.log(as)
            req.app.sendSuccess( res , { a : 1 });
        }).catch(function (err) {
            console.log(err)
        })
    }
}
module.exports = new UserController(User)