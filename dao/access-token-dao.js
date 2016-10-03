/**
 * Created by thinksysuser on 3/10/16.
 */


const AccessTokenModel = require("../model").AccessToken,
    BaseDao = require("./base-dao"),
    AccessToken =  new BaseDao(AccessTokenModel);

//==================================================Exports =========================================================

module.exports = { raw : AccessTokenModel };

//================================================== Implementation ==================================================
