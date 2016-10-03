var app = require("../util/app");
var path = require('path');
var express = require('express');
var docs_handler = express.static(path.join(__dirname , '/../node_modules/swagger-ui/dist'));

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