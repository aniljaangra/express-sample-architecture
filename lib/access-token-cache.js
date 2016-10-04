/**
 * Created by thinksysuser on 3/10/16.
 */
const AccessToken = require("../service").accessTokenService;

//================================================== Exports =========================================================

module.exports = { set  , get, remove , clearDB };

//================================================== Implementation ==================================================
/**
 * Set Access Token
 * @param userId
 * @param token
 * @returns {*}
 */
function set(userId, token) {
    return AccessToken.model.create( { userId : userId , token : token });
}
/**
 * Get Token
 * @param token
 * @returns {*|Query}
 */
function get( token) {
    return AccessToken.model.findOne( { token : token });
}
/**
 * Remove Token From Database
 * @param token
 * @returns {*}
 */
function remove(token) {
    return AccessToken.model.remove( { token : token });
}

/**
 * WARNING: this function will remove all tokens from db
 */
function clearDB(){
    return AccessToken.model.remove( {} );
}
