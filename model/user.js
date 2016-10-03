/**
 * Created by thinksysuser on 26/9/16.
 */

// importing mongoose
const mongoose = require("mongoose"),

//================================================== Schema =========================================================

// user model
userSchema = mongoose.Schema({
        userId: { type : String , index : { unique : true } },      // username of the user
        password: String,      // password of the user
        email : String,        // email of the user
        firstName : String,        // first name of the user
        lastName : String,         // last name of the user
        dp : String,               // profile pic url
        status : { type: Number, min: 0, max: 1 , default: 1 },     // account status  , 0 for inactive , 1 for active
        lastLogin  :{ type : Date , default : Date.now },       // last login timestamp
    },
    {
        timestamps: true
    });

//==================================================Exports =========================================================

module.exports = mongoose.model('User', userSchema, 'user');
