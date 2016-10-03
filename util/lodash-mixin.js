/**
 * Created by thinksysuser on 30/9/16.
 */

const _ = require('lodash');

//Add Custom Methods to Lodash
module.exports = _;

/**
 * parse boolean
 */
_.mixin({ parseBoolean : function ( str ) {
    if (str === undefined) {
        return false;
    }
    switch (String(str).toLowerCase()) {
        case "true":
        case "1":
        case "yes":
        case "y":
            return true;
        case "false":
        case "0":
        case "no":
        case "n":
        default:
            return false;
    }
}
});
