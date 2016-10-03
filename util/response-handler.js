/**
 * Created by thinksysuser on 23/9/16.
 */

const logger = require('./logger'),
    exceptions = require('./exception-generator'),
    constants = require('./constants'),

    // Response Status Codes
    STATUS_CODE = { SUCCESS : 1 , ERROR : 0 },
    HTTP_STATUS = {
        OK : 200 , BAD_REQUEST : 400 , UNAUTHORIZED : 401 , FORBIDDEN : 403 , NOT_FOUND : 404 , SERVER_ERROR : 500
    };

//================================================ Exports =====================================================

module.exports = { init , handleError , cors : setHeadersForCrossDomainIssues };

//================================================ Implementation =====================================================

/**
 *
 * @param app
 */
function init( app ) {
    [app.sendSuccess , app.throwError ] = [ sendSuccess , throwError] ;
}


/**
 * Sends Success Response to Client
 * @param res
 * @param data : response data
 */
function sendSuccess(res , data) {
    var response = new APIResponse( STATUS_CODE.SUCCESS , data );
    _sendResponse(res, response);
}

/**
 * Sends Error Response to client
 * @param res
 * @param error
 */
function throwError(res , error) {
    let httpStatus = HTTP_STATUS.BAD_REQUEST;
    //construct custom error object if system error
    if(! error instanceof exceptions.Exception ){
        httpStatus = HTTP_STATUS.SERVER_ERROR;
        error = exceptions.unhandledError( error );  //Custom Error
    }
    //log error
    logger.log(error);
    let response = new APIResponse( STATUS_CODE.ERROR , error );
    _sendResponse(res, response , httpStatus );
}


/**
 * Handle Error
 * @param err
 * @param req
 * @param res
 * @param next
 * @private
 */
function handleError(err , req , res , next) {
    return throwError( res , err);  //Custom Error
}

//================================================ Core Functions =====================================================


/**
 * Response Data Object
 * @param status
 * @param result
 * @constructor
 */
class APIResponse{

    constructor(status , result){
        this.status = status;
        result ? this.result = result : constants.DO_NOTHING;
        this.time  = new Date().getTime();
    }

}


/**
 * This Method Sends Final Response
 * @param httpResponse
 * @param dataToSend
 * @param status
 * @private
 */
function _sendResponse (httpResponse , dataToSend , status ) {
    logger.logResponse( httpResponse , dataToSend);
    httpResponse.status( status || HTTP_STATUS.OK ).send(dataToSend);
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
function setHeadersForCrossDomainIssues( req , res , next ){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization, x-custom-token,accessToken");
    res.header("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE,OPTIONS");
    next();
}




