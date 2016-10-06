/**
 * Created by thinksysuser on 4/10/16.
 */
const util = require("../util"),
    apis = require("./swagger").apis;

module.exports = function (router , modelInstance ) {
    return new RouterProxy( router , modelInstance);
}

class RouterProxy{

    constructor( router , modelInstance  ){
        this.router = router;
        this.modelInstance = modelInstance;
    }
    getRouter(){
        return this.router;
    }

    //Request Methods
    get() {
        _addToAPIDoc( arguments[0] , this.modelInstance );
        this.router.get.apply( this.router , arguments );
    }
    post() {
        _addToAPIDoc( arguments[0] , this.modelInstance );
        this.router.post.apply( this.router , arguments );
    }
    delete() {
        _addToAPIDoc( arguments[0] , this.modelInstance );
        this.router.delete.apply( this.router , arguments );
    }
    put() {
        _addToAPIDoc( arguments[0] , this.modelInstance );
        this.router.put.apply( this.router , arguments );
    }

}




/**
 * Figures out feature name from url and pushes feature spec to api if specs found
 * @param url
 */
function _addToAPIDoc(url , modelInstance ) {
    let feature,apiInfo;
    //Remove Beginning /
    url = url.replace("/","").split(":")[0];
    if(url.indexOf("/") != -1){
        feature = (url.substring(url.indexOf("/")+1).replace( /\//g , "_").toUpperCase() + "_SPEC").replace( /__/g , "_");
    }else{
        feature =  (url.toUpperCase() + "_SPEC").replace( /__/g , "_");
    }
    apiInfo =  modelInstance[feature];
    if( apiInfo){
        //Push Tags If None
        if(!apiInfo.tags){
            apiInfo.tags = [ modelInstance.Model.modelName ];
        }
        apis.push( apiInfo);
    }
}