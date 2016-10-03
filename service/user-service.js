/**
 * Created by thinksysuser on 3/10/16.
 */

const userDao = require("../dao/user-dao"),
    _ = require("lodash"),
    util = require("../util");

//================================================== Exports =========================================================

module.exports = _.extend( util.constants.EMPTY_OBJECT , userDao ,
    {


    });

//================================================== Implementation ==================================================
