/**
 * Created by thinksysuser on 3/10/16.
 */

const UserModel = require("../model").User,
    BaseDao = require("./base-dao"),
    User =  new BaseDao(UserModel);

//================================================== Exports =========================================================

module.exports = { model : UserModel };

//================================================== Implementation ==================================================
