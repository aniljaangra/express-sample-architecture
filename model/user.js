/**
 * Created by thinksysuser on 26/9/16.
 */

// importing mongoose
const mongoose = require("mongoose"),
    toJSONSchema = require('mongoose-jsonschema').modelToJSONSchema,
    constants = require("../util").constants,
    mongooseHidden = require('mongoose-hidden')({ defaultHidden: constants.mongodb.hidden }),

//================================================== Schema =========================================================

    // user model
    userSchema = mongoose.Schema({
            userId: { type : String , index : { unique : true }   },      // username of the user
            password: { type : String , required : true ,  hide : true },      // password of the user
            email : { type : String , required : true },        // email of the user
            firstName : { type : String , required : true },        // first name of the user
            lastName : { type : String , required : true },         // last name of the user
            dp : { type : String , default : null },               // profile pic url
            status : { type: Number, min: 0, max: 1 , default: 1 },     // account status  , 0 for inactive , 1 for active
            lastLogin  :{ type : Date , default : Date.now },       // last login timestamp
        },
        {
            timestamps: true
        });
//Hide Items if Necessary
userSchema.plugin(mongooseHidden);

var model = mongoose.model('User', userSchema, 'user');

//==================================================Exports =========================================================

module.exports = model;

module.exports.toJSON = function () {
    return toJSONSchema(model);
}
