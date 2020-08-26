const Chef = require('../models/Chef')

module.exports = {
    create(req, res){
        return res.render('admin/chefs/create')
    },
    post(req, res){
        const data = req.body;
        
        Chef.create(data, function(results){
            return res.redirect(`/admin/chefs/${results.id}`)
        })
    },
    show(req, res){
        const {id} = req.params
            
        Chef.find(id, function(results){
            Chef.findRecipeByChef(id, function(recipes_result){
                return res.render('admin/chefs/show', {chef: results, recipes: recipes_result})
            })       
        })
    },
    index(req, res){
        Chef.all(function(results){
            return res.render('admin/chefs/index', {chefs: results})
        })
    },
    edit(req, res){
        const {id} = req.params

        Chef.edit(id, function(result){
            return res.render("admin/chefs/edit", {chef: result})
        })
    },
    put(req, res){
        const { id } = req.body
        Chef.update(req.body, id, function(){
            return res.redirect(`/admin/chefs/${id}`)
        })
    },
    delete(req, res){
        const { id } = req.body

        console.log(`deletando ${id}`);
        
        Chef.delete(id, function(){
            return res.redirect('/admin/chefs')
        })
    }
}