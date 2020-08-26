const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes')
const server = express();
const methodOverride = require('method-override')
const data = require('./data.json')




// NUNJUCKS CONFIGURATION
server.use(express.urlencoded({extended: true}));
server.use(methodOverride('_method'));
server.use(express.static("public"));
server.use(routes)



server.set("view engine", "njk");
nunjucks.configure("src/app/views", {
    express: server,
    autoescape: false,
    noCache: true
});


// ROTAS








server.listen(5000, function(){
    console.log("server is running");
});