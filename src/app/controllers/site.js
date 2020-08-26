const data = require('../../data')
const Recipe = require('../models/Recipe')
const Chef = require('../models/Chef')

module.exports = {
    home(req, res){
        Recipe.all(function(results){
            return res.render("home", {recipes: results});
        }) 
    },
    about(req, res){
        return res.render("sobre");
    },
    recipes(req,res){
        const {filter} = req.query

        if(filter){
            Recipe.findBy(filter, function(results){
                return res.render("search", {recipes: results, filter})
            })
        } else {
            Recipe.all(function(results){
                return res.render("receitas", {recipes: results});
            }) 
        }
    },
    recipe(req, res){
        const id = req.params.index;
        
        Recipe.find(id, function(results){
            return res.render("recipe", {recipe: results})
        })
        
    },
    chefs(req,res){
        Chef.all(function(results){
            return res.render("chefs", {chefs: results})
        })
    } 
}