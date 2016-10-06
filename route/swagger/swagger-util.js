/**
 * Created by thinksysuser on 6/10/16.
 */

const _ = require("lodash"),
    baseApiModel = {
        produces :  [
            "application/json",
            "application/xml"
        ],
        consumes :  [
            "application/json",
            "application/xml"
        ]
    },
    baseParamModel = {
        required : true ,
        type : "string"
    };

//============================================ Exports ======================================

module.exports = { convertToSwagger };

//===========================================================================================


/**
 * Converts APIs according to swagger Ref
 * @param apis
 */
function convertToSwagger(apis) {
    //Properly Fill All APIs
    apis = apis.map(function ( api ) {
        //extend from base model
        api = _.extend( {} , baseApiModel , api);
        //set Api type if not present
        _setApiParamType( api );
        //Find path param i.e. :id and replace them with {id}
        api.path = _resolvePathParams( api.path );
        api.parameters.forEach( function (param) {
           param = _.extend( {} , baseParamModel , param);
            param.summary  = !param.summary ? param.description : param.summary;
            param.notes = !param.notes ? param.description : param.notes;
            param.in = param.in ? param.in : api.paramType;
        });
        return api;
    });

    //creath path Map
    return _createPathMap(apis);
};

/**
 * Set Api Param Type
 * @param apiObject
 * @private
 */
function _setApiParamType( apiObject ) {
    if(apiObject.paramType){
        return;
    }
    switch (apiObject){
        case "GET":
            apiObject.paramType = "query"; break;
        case "POST":
            apiObject.paramType = "form"; break;
        case "DELETE":
            apiObject.paramType = "query"; break;
        case "PUT":
            apiObject.paramType = "body"; break;
    }
}

function _createPathMap(apis) {
    let apiMap = _.groupBy( apis , "path");
    _.each( apiMap , function (api , key ) {
        let methodMap = _.groupBy( api , "method");
        _.each( methodMap , function( method , methodName){
            methodMap[ methodName.toLowerCase()] = _.first(method) || {};
        });
        [ "GET" , "POST" , "PUT" , "DELETE"].forEach( method => delete methodMap[method]);
        apiMap[key] = methodMap;
    });
    return apiMap;
}

/**
 * Resolve Path Params
 * @param path
 * @returns {*}
 * @private
 */
function _resolvePathParams( path) {
    //Find Path params i.e. :id replace them with {id}
    let params = path.match(/:[a-z1-9]+/gi);
    if(!params){
        return path;
    }
    let newPath = path;
    params.forEach(function (param) {
        newPath = newPath.replace(param, param.replace(":", "{") + "}")
    });
    return newPath;
}