const express = require('express');
const nunjucks = require('nunjucks');

const server = express();

const recipes = require('./data');


// NUNJUCKS CONFIGURATION

server.use(express.static("public"));

server.set("view engine", "njk");

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
});


// ROTAS
server.get ("/", function (req, res) {

    return res.render("home", {recipes} );
});

server.get ("/sobre", function (req, res) {

    return res.render("sobre");
});

server.get ("/receitas", function (req, res) {

    return res.render("receitas", {recipes} );
});

server.get("/recipes/:index", function (req, res) {
    const recipeIndex = req.params.index;
    return res.render("recipe", {recipe: recipes[recipeIndex]});
})


// PORTA
server.listen(5000, function(){
    console.log("server is running");
})
