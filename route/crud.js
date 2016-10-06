/**
 * Created by thinksysuser on 27/9/16.
 */

const _ = require("lodash"),
    models = require("../model"),
    crudMap = {
        create: { method: "put", url: "/create" },
        update: { method: "post", url: "/update" },
        read: { method: "get", url: "/get", spec : "GET" },
        delete: { method: "delete", url: "/delete/:id" , spec : "DELETE" }
    };

//========================================== Exports ============================================

module.exports = init;

//======================================= Implementation ========================================

/**
 * This Module creates CRUD Operations for given Model
 * @param object
 * @param router
 * @param ignoreList : List of Operations to be ignored
 */
function init(object, router , basePath = "" , ignoreList = []) {
    //get list of operations to expose
    let operations = _.pullAll( Object.keys(crudMap) , ignoreList );
    //Integrate each endpoint
    operations.forEach( function (operation) {
        let route = crudMap[operation];
        //Add Spec for Method
        object[ (route.spec || operation.toUpperCase()) + "_SPEC"] = _getSpec( route  , object.Model.modelName , basePath + route.url) ;
        //Add Method to Router
        router[route.method]( basePath + route.url , object[operation]);
    })
}

//======================================= Helper ========================================


/**
 * Spec Generator For Swagger
 * @param route
 * @param modelName
 * @param path
 * @returns {{tags: *[], description: *, path: *, notes: *, summary: *, method: string, type: *, nickname: *, schema: {$ref: string}, consumes: string[], produces: string[], parameters: Array}}
 * @private
 */
function _getSpec(route , modelName , path ) {

    //base JSON
    let json =  {
        "tags" : [ modelName ],
        "description" :  route.method+ modelName,
        "path" : path ,
        "notes" : route.method+ modelName,
        "summary" : route.method+ modelName,
        "method": route.method.toUpperCase(),
        "type" : modelName,
        "nickname" : modelName + route.method,
        "schema": {
            "$ref": "#/definitions/" + modelName
        },
        "consumes": [
            "application/json",
            "application/xml"
        ],
        "produces": [
            "application/xml",
            "application/json"
        ],
        parameters : []
    };

    //Decide Parameters based on method
    switch ( route.method){

        case "get":
            json.parameters = [
                { name : "filter" , type : "string" , required : false , description : "query object"},
                { name : "include" , type : "array" , required : false , description : "included fields"}
            ];
            break;
        case "delete":
            json.parameters = [
                { name : "id" , type : "string" , paramType : "path" ,  required : true ,  description : "id to delete"}
            ];
            break;
        case "put" :
            json.parameters = [{
                "in": "body",
                "name": "body",
                "description": modelName+" object that needs to be added.",
                "required": true,
                "schema": {
                    "$ref": "#/definitions/"+modelName
                }
            }];
            break;
        case "post" :
            let schema =  models[modelName].toJSON();
            _.each(schema.properties , function (prop , key) {
                prop.required = _.includes( schema.required , key) ? true : false;
                prop.name = key;
                json.parameters.push( prop);
            });
            break;
    }
    return json;
}