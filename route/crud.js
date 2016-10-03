/**
 * Created by thinksysuser on 27/9/16.
 */

const _ = require("lodash"),
    crudMap = {
        create : { method : "post" , url : "/create"},
        update : { method : "post", url : "/update"},
        read : { method : "get", url : "/get"},
        delete : { method : "get", url : "/delete"}
    };
/**
 * This Module creates CRUD Operations for given Model
 * @param Model
 * @param router
 * @param ignoreList : List of Operations to be ignored
 */
module.exports = function (Model, router , path = "" , ignoreList = []) {
    //get list of operations to expose
    let operations = _.pullAll( Object.keys(crudMap) , ignoreList );
    //Integrate each endpoint
    operations.forEach( function (operation) {
        let route = crudMap[operation];
        router[route.method]( path + route.url , Model[operation]);
    })
}