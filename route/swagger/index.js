/**
 * Created by thinksysuser on 6/10/16.
 */

const swaggerJSON = require("./swagger-json") ,
    _ = require("lodash"),
    path = require("path"),
    express = require("express"),
    models = require("../../model"),
    swaggerUtil = require("./swagger-util"),
    apis = [],
    baseAPIJson = {

    };
var _apiDocPath = "/api-docs";

module.exports = { apis , init , setInfo , configureHost };


function init( app ) {
   //Convert Models
    _convertToSwaggerModels();
    //convert apis to map
    swaggerJSON.paths = swaggerUtil.convertToSwagger(apis);

    app.get( _apiDocPath , function (req, res) {
        res.json(swaggerJSON);
    });
    var docs_handler = express.static(path.join(__dirname , '../../node_modules/swagger-ui/dist'));

    app.get(/^\/docs(\/.*)?$/ , function (req, res , next) {
        if (req.url === '/docs') {
            res.writeHead(302, { 'Location': req.url + '/' });
            res.end();
            return;
        }
        // take off leading /docs so that connect locates file correctly
        req.url = req.url.substr('/docs'.length);
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