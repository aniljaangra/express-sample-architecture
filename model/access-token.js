/**
 * Created by thinksysuser on 3/10/16.
 */

// importing mongoose
const mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    constants = require("../util").constants,
    mongooseHidden = require('mongoose-hidden')({ defaultHidden: constants.mongodb.hidden }),

//================================================== Schema =========================================================

    // accessToken model
    accessTokenSchema = Schema({
            userId: { type: Schema.Types.ObjectId, ref: 'User' },      // userId of the user
            token : { type : String , required : true },        // token containing user Data
        },
        {
            timestamps: {
                createdAt : 'loginAt'
            },
            versionKey: false
        });

//Hide Items if Necessary
accessTokenSchema.plugin(mongooseHidden);


//==================================================Exports =========================================================

module.exports = mongoose.model('AccessToken', accessTokenSchema , 'accesstoken');