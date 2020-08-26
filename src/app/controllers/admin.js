const fs = require('fs')
const data = require('../../data.json')
const Recipe = require('../models/Recipe')

exports.create = function (req, res){
    Recipe.getChefs(function(results){
        return res.render('admin/recipes/create', {chefs: results})
    })
}

exports.post = function (req, res){
    const keys = Object.keys(req.body)

    for (key of keys){
        if (req.body[key] == ''){
            return res.send("Please fill all form!")
        }
    }

    Recipe.create(req.body, function(results){

        return res.redirect(`/admin/recipes/${results.id}`)
    })
    
}

exports.index = function (req, res) {
    const recipes = data.recipes

    Recipe.all(function(results){
        return res.render('admin/recipes/index', { recipes: results })
    })
      
}

exports.show = function (req, res) {
    let { id } = req.params

    Recipe.find(id, function(result){
        return res.render('admin/recipes/show', {recipe: result})
    })
    
}

exports.edit = function (req, res) {
    let { id } = req.params
    
    Recipe.find(id, function(result){
        Recipe.getChefs(function(results){
            return res.render('admin/recipes/edit', {recipe: result, chefs: results})
        })
    })
   
}

exports.put = function (req, res) {
    let { id } = req.body
    
    req.body.ingredients = req.body.ingredients.filter(function(ingredient){
        return (!ingredient=='')
    })

    req.body.preparation = req.body.preparation.filter(function(preparation){
        return (!preparation=='')
    })

    Recipe.update(req.body, id, function(){
        return res.redirect(`/admin/recipes/${id}`)
    })

}

exports.delete = function (req, res){
    const { id } = req.body

    Recipe.delete(id, function(){
        return res.redirect("/admin/recipes")
    })
}

