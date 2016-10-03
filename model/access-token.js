/**
 * Created by thinksysuser on 3/10/16.
 */

// importing mongoose
const mongoose = require("mongoose"),
    Schema = mongoose.Schema,

//================================================== Schema =========================================================

// accessToken model
accessTokenSchema = Schema({
        userId: { type: Schema.Types.ObjectId, ref: 'User' },      // userId of the user
        token : String,        // token containing user Data
    },
    {
        timestamps: {
            createdAt : 'loginAt'
        }
    });

//==================================================Exports =========================================================

module.exports = mongoose.model('AccessToken', accessTokenSchema , 'accesstoken');