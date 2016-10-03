/**
 * Created by thinksysuser on 28/9/16.
 */

const constants = require("./constants");

module.exports = {

    Exception,

    fileNotFound(){
        return new Exception("ERR001" , "File Not Found");
    },

    customError ( message ) {
        return new Exception( 'ERR002' , message );
    },

    unhandledError( err ){
        return new Exception("ERR001" , "oops..something went wrong!!!" , err );
    },

    unauthorizedAccess (err) {
        return new Exception( 'ERR011' , 'Unauthorized Access.' , err );
    },

    invalidCredentials(err){
        return new Exception("ERR004" , "Either the username or password you have entered was invalid." , err);
    },

    userAccountNotActive () {
        return new Exception( 'ERR043' , "Your account is inactive/terminated .");
    },

    sessionTerminated(){
        return new Exception('ERR026', 'Session Terminated. Your Account is logged in from somewhere else.');
    }

}

/**
 * Exception
 * @param errCode
 * @param errMsg
 * @constructor
 */
function Exception(errCode , errMsg ,  error ){
    this.errCode = errCode;
    this.errMsg = errMsg;
    error ? this.error = error : constants.DO_NOTHING;
}


