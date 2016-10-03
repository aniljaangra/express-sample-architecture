/**
 * Created by thinksysuser on 30/9/16.
 */

const LocalStrategy = require('passport-local').Strategy,
    LdapStrategy = require('passport-ldapauth'),
    LDAP_SERVER_OPTS = {
        url: 'ldap://10.101.10.11:389/dc=thinksys,dc=com',
        searchBase: 'cn=users,cn=accounts,dc=thinksys,dc=com',
        searchFilter: '(&(uid={{username}}))'
    };

User = require('../../service/user-service');

//==================================================Exports =========================================================

module.exports = { LOCAL : generateLocalStrategy() , LDAP : generateLdapStrategy()};

//================================================== Implementation ==================================================

/**
 *
 */
function generateLdapStrategy() {
    return new LdapStrategy(
        { server : LDAP_SERVER_OPTS, usernameField : 'username', passwordField : 'password'} )
}
/**
 * Local Strategy to Verify User Credentials
 */
function generateLocalStrategy() {

    return new LocalStrategy(
        { usernameField: 'userId', passwordField: 'password' } ,         //custom username and password field
        function ( userId , password , done ) {
            //Validate Credentials
            if( !userId || !password){
                return done( true );    //send error
            }
            //Match user
            User.matchUser( userId , password)
                .then(function (user) {
                    //Throw Error If Credentials Doesn't Match
                    if(!user){
                        return done( true ); //send error
                    }
                    done( null , user );    //Successfully Logged In
                })
        }
    )
}

