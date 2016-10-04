/**
 * Created by thinksysuser on 3/10/16.
 */

const userDao = require("../dao").userDao,
    _ = require("lodash"),
    util = require("../util");

//================================================== Exports =========================================================

module.exports = (function () {
    return _.extend( {} , userDao ,
        {
            generateUserToken
        });
})();

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