/**
 * Created by thinksysuser on 4/10/16.
 */

/**
 * Created by anil on 5/2/16.
 */
const _swagger = require("swagger-node-express"),
    paramTypes = _swagger.paramTypes,
    apis = [],
    paramTypeMap = {
        "GET" : "query",
        "POST" : "form",
        "DELETE" : "query",
        "PUT" : "form"
    };

module.exports = { apis, convertToSwagger , convertMongooseToSwagger };

/**
 * Converts API Specs to Swagger Doc
 *
 */
function convertToSwagger( swagger , apis ){
    apis.forEach( function (api) {
        switch(api.method){
            case "GET" :
                swagger.addGet(getSpecs(api));
                break;
            case "POST" :
                swagger.addPost(getSpecs(api));
                break;
            case "PUT" :
                swagger.addPut(getSpecs(api));
                break;
            case "DELETE" :
                swagger.addDelete(getSpecs(api));
                break;
        }
    })
}


function getSpecs(api){
    var retVal = {};
    var spec = {};
    spec.summary= api.summary;
    spec.nickname = api.nickname;
    spec.path = getPath(api.path);
    spec.paramType = spec.paramType || paramTypeMap[ spec.method ];
    if(api.notes){
        spec.notes= api.notes;
    }
//       notes : "Returns a pet based on ID",
//       summary : "Find pet by ID",
    spec.method = api.method;
    if(api.parameters){
        spec.parameters = getParameters(api.parameters, api.paramType);
    }
//       responseMessages : [swe.invalid('id'), swe.notFound('pet')]
//       nickname : "getPetById",
    //    type : "Pet",
    spec.produces = ["application/json"];
    retVal.spec = spec;
    //logger.VOLATILE(JSON.stringify(retVal));
    return retVal;
}

/**
 *  https://github.com/swagger-api/swagger-spec/blob/master/versions/1.2.md#524-parameter-object
 */
function getParameters(params, type){

    var retVal = [];
    params.forEach( function ( param ) {

        switch(param.paramType || type ){
            case "query":
            case "path":
            case "body":
            case "form":
            case "header":
                retVal.push( getParamSpec( param.paramType || type , param ));
                break;
        }
    });
    return retVal;
}

function convertMongooseToSwagger(model) {
    console.log();
}

/**
 * converts "/insert/:user/:number" to "/insert/{user}/{number}"
 * @param path
 * @returns {*}
 */
function getPath(path){
    var newPath = path;
    var params = newPath.match(/:[a-z1-9]+/gi);
    for(var i in params){
        var param = params[i];
        newPath = newPath.replace(param, param.replace(":", "{") + "}")
    }
    return newPath.replace(" ","");
}

function getParamSpec(type, param) {
    return _swagger[ type ](param.name , param.description , param.type ,!!param.required ,param.enum , param.defaultValue );
}
