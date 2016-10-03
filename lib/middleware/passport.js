
/**
 * Created by thinksysuser on 30/9/16.
 */

const passport = require('passport'),
    util = require('../../util'),
    _ = util.lodash ,
    exceptions = util.exceptionGenerator,
    logger = util.logger,
    User = require('../../service/user-service'),
    Strategy = require('./passport-strategy')
    // cache = require('../../lib/cacheClient'),

/**
 * passport middleware for login
 */
passport.use( Strategy.LDAP );
//==================================================Exports =========================================================

module.exports = { passport, localAuth , ldapAuth , verifyUser  };

//================================================== Implementation ==================================================

/**
 * Verify Incoming Requests for a valid token
 * @param req
 * @param res
 * @param next
 * @return {*}
 * @private
 */
function verifyUser(req , res , next) {
    var token = _fetchTokenFromRequest(req);
    if(!token){
        //throw error
        return app.throwError( res ,exceptions.unauthorizedAccess());
    }
    var user = util.jwt.verifyToken(token);
    if(!user){
        app.throwError( res ,exceptions.unauthorizedAccess());
    }
    _getCachedToken( user. id )
        .then(function ( savedToken ) {
            if(savedToken != token){
                return app.throwError( res ,exceptions.sessionTerminated() );
            }
            //Authorize User
            req.user = user;
            next();
        })
}

//=================================== Authentication ==========================================

/**
 * Authorize User via Ldap
 */
function ldapAuth() {
    return passport.authenticate('ldapauth', {session: false} , function (err , user , info) {
        console.log( user );
    });
}

/**
 * Validate the User trying to login and generate a token if authentic
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function localAuth(req , res , next ) {
    return passport.authenticate('local' , function ( err , user , info) {
        if(err || !user){
            return app.throwError( res , exceptions.invalidCredentials());
        }
        if(!user.status ){
            return app.throwError( res , exceptions.userAccountNotActive());
        }
        //generate token
        var token  = User.generateUserToken( user  );
        //Store token and forward request
        _cacheToken( req , res , user.id , token , next );

    })
}
//=================================== HELPER FUNCTIONS =======================================//

/**
 * Fetch Token from request
 * @param req
 * @private
 */
function _fetchTokenFromRequest(req) {
    return req.headers.accesstoken ? req.headers.accesstoken : req.body.accessToken ? req.body.accessToken : req.query.accessToken;
}


/**
 * Save Token To Memory
 * @param req
 * @param res
 * @param snatchId
 * @param token
 * @param done
 * @private
 */
function _cacheToken( req , res , snatchId , token , done ) {
    //Add token to redis
    cache.set( snatchId , token)
        .then(function ( ) {
            //status OK ... add to request
            req.token = token;
            done();
        })
        //Throw Error
        .catch( err => app.throwError( res , err ))
}

/**
 * Fetch Token From Memory
 * @param snatchId
 * @returns {Promise.<T>}
 * @private
 */
function _getCachedToken( snatchId ) {
    //fetch Saved Token
    return cache.get( snatchId)
        .catch( err => logger.log( err ))
}