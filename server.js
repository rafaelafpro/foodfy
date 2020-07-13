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
nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
});


// ROTAS
server.get ("/", function (req, res) {

    return res.render("home", {recipes: data.recipes} );
});

server.get ("/sobre", function (req, res) {

    return res.render("sobre");
});

server.get ("/receitas", function (req, res) {

    return res.render("receitas", {recipes: data.recipes} );
});

server.get("/recipes/:index", function (req, res) {
    const recipeIndex = req.params.index;
    return res.render("recipe", {recipe: data.recipes[recipeIndex]});
})



server.listen(5000, function(){
    console.log("server is running");
});