/**
 * Created by thinksysuser on 3/10/16.
 */

const accessTokenDao = require("../dao/access-token-dao"),
    _ = require("lodash"),
    util = require("../util");

//================================================== Exports =========================================================

module.exports = _.extend( util.constants.EMPTY_OBJECT , accessTokenDao ,
    {


    });

//================================================== Implementation ==================================================
