/**
 * Created by thinksysuser on 4/10/16.
 */
const util = require("../util");

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
        console.log( fetchFeatureFromURL( arguments[0] , this.modelInstance ) );
        this.router.get.apply( this.router , arguments );
    }
    post() {
        console.log(arguments);
        this.router.get.apply( this.router , arguments );
    }
    delete() {
        console.log(arguments);
        this.router.get.apply( this.router , arguments );
    }
    put() {
        console.log(arguments);
        this.router.get.apply( this.router , arguments );
    }

}




/**
 * Figures out feature name from url
 * @param url
 */
function fetchFeatureFromURL(url , modelInstance ) {
    let feature;
    //Remove Beginning /
    url = url.replace("/","");
    if(url.indexOf("/") != -1){
        feature = (url.substring(url.indexOf("/")+1).replace( /\//g , "_").toUpperCase() + "_SPEC").replace( /__/g , "_");
    }else{
        feature =  (url.toUpperCase() + "_SPEC").replace( /__/g , "_");
    }
    return modelInstance[feature];
}