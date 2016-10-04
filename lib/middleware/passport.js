
/**
 * Created by thinksysuser on 30/9/16.
 */

const passport = require('passport'),
    util = require('../../util'),
    _ = util.lodash ,
    exceptions = util.exceptionGenerator,
    logger = util.logger,
    User = require('../../service').userService,
    Strategy = require('./passport-strategy'),
    tokenCache = require('../../lib/access-token-cache');

/**
 * passport middleware for login
 */
passport.use( Strategy.LDAP );

//========================================== Exports ========================================

module.exports = { passport , localAuth , ldapAuth , verifyUser  };

//=================================== LDAP Authorization ==========================================

/**
 * Authorize User via Ldap
 */
function ldapAuth( req , res , next ) {
    return passport.authenticate('ldapauth', { session: false } , function (err , profile , info ) {
        //Validations
        if(err || !profile){
            return req.app.throwError( res , exceptions.invalidCredentials(err));
        }
        //Find User in DB
        User.raw.findOne( { userId : profile.uid })
            .then( function ( user ) {
                //Validations
                if(err || !user){
                    throw exceptions.userNotFound();
                }
                if(!user.status ){
                    throw exceptions.userAccountNotActive();
                }
                //Generate Token
                return generateAndSaveToken( user , req );
            })
            .then( () => next() )
            //Throw Error
            .catch( err => req.app.throwError( res , err ));
    })( req , res , next );
}

//=================================== Local Authorization ==========================================

/**
 * Validate the User trying to login and generate a token if authentic
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function localAuth(req , res , next ) {
    return passport.authenticate('local' , function ( err , user , info) {
        //Validations
        if(err || !user){
            return req.app.throwError( res , exceptions.invalidCredentials());
        }
        if(!user.status ){
            return req.app.throwError( res , exceptions.userAccountNotActive());
        }
        //generate token
        generateAndSaveToken( user , req )
            .then( () => next() )
            //Throw Error
            .catch( err => req.app.throwError( res , err ));
    })( req , res , next );
}

//=================================== Authentication ==========================================

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
        return req.app.throwError( res ,exceptions.unauthorizedAccess());
    }
    //Verify Token
    var user = util.jwt.verifyToken(token);
    if(!user){
        //Throw Error if invalid
        //Remove Token From DB
        return tokenCache.remove( token )
            .then( ()=> req.app.throwError( res ,exceptions.unauthorizedAccess()));
    }
    //Find token in DB
    tokenCache.get( token )
        .then(function ( tokenData ) {
            if(!tokenData){
                //If Not Found .. Throw Error
                req.app.throwError( res ,exceptions.sessionTerminated() );
            }
            //Authorize User
            req.user = user;
            next();
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
 * generate and Store token into cache
 * @param user
 * @param req
 */
function generateAndSaveToken( user , req ) {
    var token  = User.generateUserToken( user  );
    //Store token and forward request
    return tokenCache.set( user.id , token)
        .then( function ( tokenData ) {
            //Save User
            req.token = tokenData;
        })
}