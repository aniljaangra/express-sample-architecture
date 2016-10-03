/**
 * Created by thinksysuser on 26/9/16.
 */
const _ = require("lodash");

class BaseController{

    constructor(model){
        console.log("constructor called")
        this.Model = model;
        _bindAll(this);
    }

    create( req , res ){
        getData();
        this.Model.create( data )
            .then( result => req.app.sendSuccess( res , result ))
            .catch( error => req.app.throwError( res , error ))
    }

    read( req , res ){
        this.Model.find( req.query.filter || {} , req.query.include || {}  )
            .then( result => req.app.sendSuccess( res , result ))
            .catch( error => req.app.throwError( res , error ))
    }

    update( req , res ){
        this.Model.update( req.body.where || {} , req.body.data  )
            .then( result => req.app.sendSuccess( res , result ))
            .catch( error => req.app.throwError( res , error ))
    }

    delete( req , res ){
        this.Model.remove( req. query.where )
            .then( result => req.app.sendSuccess( res , result ))
            .catch( error => req.app.throwError( res , error ))

    }

}

module.exports = BaseController;


/**
 * Binds All Methods with object so that they can work as an route handler
 * @param object
 * @private
 */
function _bindAll(object) {
    //fetch subclass property list
    var objectMembers = Object.getOwnPropertyNames(object.constructor.prototype);
    //fetch base class property list
    var baseClassMembers = Object.getOwnPropertyNames(Object.getPrototypeOf(object.constructor).prototype);
    //ignore constructor
    var propList =  _.without( objectMembers.concat(baseClassMembers) , "constructor" );
    //bind every function
    propList.forEach( function (property) {
        if(object.__proto__[property]){
            object.__proto__[property] = object[property].bind(object);
        }
    })
}