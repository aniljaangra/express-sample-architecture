/**
 * Created by thinksysuser on 28/9/16.
 */

module.exports = {

    system : {
        JWT_SECRET_KEY : 'topSecretRandomKeyForApp'
    },
    strings : {
        APP_NAME : 'sample app',
        APP_DESCRIPTION : 'Express App'
    },

    mongodb : {
        hidden : { createdAt : true , updatedAt : true , _id : true , __v : true }
    },

    //Other Constants
    DO_NOTHING : null,
    EMPTY_OBJECT : {},
    SUCCESS_RESPONSE : 1,

}