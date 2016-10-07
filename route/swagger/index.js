/**
 * Created by thinksysuser on 6/10/16.
 */

//==================================== Dependanices ===================================================

var _apiDocPath = "/api-docs";
const swaggerJSON = require("./swagger-json") ,
    _ = require("lodash"),
    path = require("path"),
    fs = require("fs"),
    express = require("express"),
    models = require("../../model"),
    swaggerUtil = require("./swagger-util"),
    swaggerUIDir = '../../node_modules/swagger-ui/dist',
    apis = [];


//==================================== Exports ===================================================

module.exports = { apis , init , setInfo , configureHost };

//================================================================================================

/**
 * Start Swagger Integration Process
 * @param app
 */
function init( app ) {
   //Convert Models
    _convertToSwaggerModels();
    //convert apis to path map
    swaggerJSON.paths = swaggerUtil.convertToSwagger(apis);
    setEndpoints(app);
    _setJSONPathInHtml();
}


function setEndpoints(app) {
    //Endpoint for Getting API json
    app.get( _apiDocPath , function (req, res) {
        res.json(swaggerJSON);
    });

    let docs_handler = express.static(path.join(__dirname , swaggerUIDir ));

    app.get(/^\/explorer(\/.*)?$/ , function (req, res , next) {
        if (req.url === '/explorer') {
            res.writeHead(302, { 'Location': req.url + '/' });
            res.end();
            return;
        }
        // take off leading /docs so that connect locates file correctly
        req.url = req.url.substr('/explorer'.length);
        return docs_handler(req, res, next);
    })
}
/**
 *
 * @param info  title | description | version | email | tosUrl | license  { name | url }
 */
function setInfo( info ) {
    info.title ? swaggerJSON.info.title = info.title : null;
    info.description ? swaggerJSON.info.description = info.description : null;
    info.version ? swaggerJSON.info.version = info.version : null;
    info.email ? swaggerJSON.info.email = info.email : null;
    info.tosUrl ? swaggerJSON.info.tosUrl = info.tosUrl : null;
    info.license ? swaggerJSON.info.license = info.license : null;
}

/**
 *
 * @param host
 * @param basePath
 * @param apiDocPath
 */
function configureHost(host, basePath , apiDocPath ) {
    host ? swaggerJSON.host = host : null;
    basePath !== undefined ? swaggerJSON.basePath = basePath : null;
    apiDocPath ? _apiDocPath = apiDocPath : null;
}

function _convertToSwaggerModels() {
    _.each(models , function (model) {
        swaggerJSON.definitions[ model.modelName] = model.toJSON();
    });
}

/**
 * replace JSON Path in html file
 */
function _setJSONPathInHtml() {
    //read file
    let file = path.join( __dirname , swaggerUIDir , "index.html");
    fs.readFile( file , 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        if(!_.includes( data ,  "http://petstore.swagger.io/v2/swagger.json"  )){
            return;
        }
        // let result = data.replace(/url:(.*?)(?:,)/,  "url: '"+ ( swaggerJSON.host + "/swagger.json")+"'," );
        //Replace JSON Path in File
        let result = data.replace("http://petstore.swagger.io/v2/swagger.json" , ( "http://" + swaggerJSON.host + "/swagger.json" ) );
        fs.writeFile(file , result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
}