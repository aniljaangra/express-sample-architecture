/**
 * Created by thinksysuser on 4/10/16.
 */

const jsonSchema = require('mongoose-jsonschema').modelToJSONSchema,
    models = require("../../model"),
    swagger = require("../../lib/swagger-node-express/index"),
    swaggerUtil = require("./swagger-util-old"),
    express = require("express"),
    _ = require("lodash"),
    apiModels = {},
    apis =  [],
    appName = '[appName]' ,
    type = '[type]',
    name = '[name]',
    apiInfo = {
        title: "[appName] APIs",
        description: "API documentations for [appName]",
        termsOfServiceUrl: "http://helloreverb.com/terms/",
        contact: "developers@mobicules.com",
        license: "Apache 2.0",
        licenseUrl: "http://www.apache.org/licenses/LICENSE-2.0.html"
    },
    apiOptions = {
        apiPrefix  : '/',
        name : 'sample app',
        description : 'sample app APIs',
        'swagger-page' : true,
        website : 'http://localhost:3001/'
    }

module.exports = { apis , init };

function init( app ) {
    //Set Swagger Properties
    // apiInfo.title = apiInfo.title.replace(appName, apiOptions.name);
    // apiInfo.description = apiInfo.description.replace(appName, apiOptions.name);

    //Initialize Swagger
    swagger.setAppHandler(app);
    //Declaration
    swagger.configureDeclaration(apiInfo.title, {
        description: apiInfo.title,
        authorizations: ["oauth2"],
        produces: ["application/json"]
    });

    //Set API Information
    swagger.setApiInfo(apiInfo);

    //Swagger Page
    var docs_handler = express.static("/home/thinksysuser/official/repos/express-sample/node_modules/swagger-ui/dist");
    app.get(/^\/docs(\/.*)?$/, function (req, res, next) {
        if (req.url === '/docs') { // express static barfs on root url w/o trailing slash
            res.writeHead(302, {'Location': req.url + '/'});
            res.end();
            return;
        }
        // take off leading /docs so that connect locates file correctly
        req.url = req.url.substr('/docs'.length);
        return docs_handler(req, res, next);
    });
    swagger.configureSwaggerPaths("", "api-docs", "");
    _.each(models , (model)=> apiModels[model.modelName] = jsonSchema(model) );
    swagger.addModels({ models : apiModels });
    swaggerUtil.convertToSwagger( swagger , apis );
    swagger.configure(apiOptions.website, "1.0.0");
}

