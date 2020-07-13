const fs = require('fs')
const data = require('./data.json')

exports.create = function (req, res){

    return res.render('admin/create')
}

exports.post = function (req, res){
    const keys = Object.keys(req.body)

    for (key of keys){
        if (req.body[key] == ''){
            return res.send("Please fill all form!")
        }
    }

    data.recipes.push(req.body)
    

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error")

        return res.redirect('/admin/recipes')
    })

    
}

exports.index = function (req, res) {
    const recipes = data.recipes

    for (let i=0; i<recipes.length; i++){
        recipes[i].id = i
    }
    

    return res.render('admin/index', { recipes })
}

exports.show = function (req, res) {
    let { id } = req.params

    let foundRecipe = data.recipes.find(function(recipe, index){
        if (index == id) return true
    })
    
    foundRecipe = {
        ...foundRecipe,
        id: id
    }

    return res.render('admin/show', {recipe: foundRecipe})
}

exports.edit = function (req, res) {
    let { id } = req.params

    let foundRecipe = data.recipes.find(function(recipe, index){
        if (index == id) return true
    })
    

    foundRecipe = {
        ...foundRecipe,
        id: id
    }

    return res.render('admin/edit', {recipe: foundRecipe})
}

exports.put = function (req, res) {
    let { id } = req.body
    
    const recipe = req.body

    const foundRecipe = data.recipes.find(function(recipe,index){
        if (index == recipe.id) return true
    })
    
    console.log(foundRecipe);
    

    const editedRecipe = {
        ...foundRecipe,
        ...recipe
    }


    editedRecipe.ingredients = editedRecipe.ingredients.filter(function(ingredient){
        if (ingredient != '') return true
    })
    
    editedRecipe.preparation = editedRecipe.preparation.filter(function(preparation){
        if (preparation != '') return true
    })
    

    data.recipes[id] = editedRecipe

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("write file error...")
        return res.redirect(`/admin/recipes/${id}`)
    })
}

exports.delete = function (req, res){
    const { id } = req.body

    console.log(req.body);
    

    const filteredRecipes = data.recipes.filter(function(recipe, index){
        return (index != id)
    })
    

    data.recipes = filteredRecipes

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write File Error")

        return res.redirect("/admin/recipes")
    })

}

