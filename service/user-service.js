/**
 * Created by thinksysuser on 3/10/16.
 */

const userDao = require("../dao/user-dao"),
    _ = require("lodash"),
    util = require("../util");

//================================================== Exports =========================================================

module.exports = _.extend( util.constants.EMPTY_OBJECT , userDao ,
    {
        generateUserToken
    });

//================================================== Implementation ==================================================

/**
 * generate Token for user
 * @private
 */
function generateUserToken(user , longLivedToken ){
    var dataForToken = _.pick( user , [ 'userId' , 'email' ] );
    //generate token .....
    return util.jwt.generateToken(dataForToken , ( longLivedToken ? util.jwt.TOKEN_EXPIRY.LONG_LIVED : util.jwt.TOKEN_EXPIRY.LONG_LIVED ));
}