/**
 * Created by thinksysuser on 29/9/16.
 */

const _ = require('lodash'),
    Exception = require("./exception-generator");

var seq = new Date().getTime();

module.exports = { log , requestLogger, logResponse  };

function requestLogger(req , res , next){
    req.received_at = new Date();
    log(['======================= [time] Request ID : ', seq , ' ==========================='  ]);
    logOnRequestReceive( req );
    log('================================================================================='  );
    req.seq = seq++;
    res.req = req;
    next();
}

/**
 *Log Incoming Request
 * @param req
 */
function logOnRequestReceive( req ){
    var reqData = {
        path : req.path,
        headers : req.headers,
    };
    //Extract Data from Request
    (req.connection) ? reqData.headers.ip = req.connection.remoteAddress : null;
    (!_.isEmpty(req.query)) ? reqData.query = req.query : null ;
    (!_.isEmpty(req.body)) ? reqData.body = req.body : null ;
    (!_.isEmpty(req.params)) ? reqData.params = req.params : null ;
    (!_.isEmpty(req.files)) ? reqData.files = req.files : null ;
    req.data = reqData;
    log(reqData);
}

/**
 * Log  Response
 * @param req
 * @param data
 */
function logResponse(res , data){
    var req = res.req;
    (!_.isEmpty(req.files)) ? req.data.files = req.files : null ;
    data.timeTakenInMs = new Date().getTime() - req.received_at.getTime();
    //Delete Unnecessary Stuff
    delete req.data.headers;
    var resData = data.result;
    delete data.result;
    data.result = resData;  //This is done to keep result at bottom in object
    //Logging
    log(['======================= [time] Response for Request ID : ', req.seq , ' ==================='  ]);
    log( '----Request---' );
    log( req.data );
    log( '----Response---' );
    log( data );
    log('================================================================================='  );

}


/**
 * Log Incoming Request Data
 * @param tag
 * @param data
 */
function log( tag , data  ){
    if( data){
        return console.log( tag , data );
    }
    data = tag;
    if( data instanceof Error){
        return console.log(data);
    }
    var to_log = _.clone(data);
    //Convert to String if Array
    to_log = to_log instanceof Array ? to_log.join('') : to_log ;
    if(typeof to_log === "string")
        to_log = to_log.replace( '[time]' , 'Time : '+ new Date());

    console.log(to_log);
}