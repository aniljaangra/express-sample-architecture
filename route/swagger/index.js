/**
 * Created by thinksysuser on 4/10/16.
 */

var apiInfo = {
    title: "[appName] APIs",
    description: "API documentations for [appName]",
    termsOfServiceUrl: "http://helloreverb.com/terms/",
    contact: "developers@mobicules.com",
    license: "Apache 2.0",
    licenseUrl: "http://www.apache.org/licenses/LICENSE-2.0.html"
};

function init(apiOptions) {
    //Set Swagger Properties
    apiInfo.title = apiInfo.title.replace(appName, apiOptions.name);
    apiInfo.description = apiInfo.description.replace(appName, apiOptions.name);

    //Initialize Swagger
    swagger = require("swagger-node-express")(app);

    //Declaration
    swagger.configureDeclaration(options.name, {
        description: apiInfo.title,
        authorizations: ["oauth2"],
        produces: ["application/json"]
    });

    //Set API Information
    swagger.setApiInfo(apiInfo);

    //Swagger Page
    var docs_handler = express.static("/home/thinksysuser/official/repos/express-sample/node_modules/swagger-ui/dist/indx.html");
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
    swaggerUtil.convertToSwagger(swagger, swaggerUtil.apis);
    swagger.configure(apiOptions.website, "1.0.0");
}

