/**
 * Created by thinksysuser on 3/10/16.
 */

// importing mongoose
const mongoose = require("mongoose"),
    Schema = mongoose.Schema,

//================================================== Schema =========================================================

// accessToken model
accessTokenSchema = Schema({
        userId: String,      // userId of the user
        token : String,        // token containing user Data
        lastUsedAt : Date
    },
    {
        timestamps: {
            createdAt : 'loginAt'
        },
        versionKey: false
    });

//==================================================Exports =========================================================

module.exports = mongoose.model('AccessToken', accessTokenSchema , 'accesstoken');