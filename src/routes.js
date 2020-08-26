const express = require('express')
const routes = express.Router()
const data = require('./data.json')
const admin = require('./app/controllers/admin')
const chefs = require('./app/controllers/chefs')
const site = require('./app/controllers/site')

// site
routes.get("/", site.home)
routes.get("/sobre", site.about)
routes.get("/receitas", site.recipes)
routes.get("/recipes/:index", site.recipe)
routes.get("/chefs", site.chefs)

//aadmin recipes
routes.get("/admin/recipes/create", admin.create)
routes.get("/admin/recipes", admin.index)
routes.get("/admin/recipes/:id", admin.show)
routes.get("/admin/recipes/:id/edit", admin.edit)
routes.post("/admin/recipes", admin.post)
routes.put("/admin/recipes", admin.put)
routes.delete("/admin/recipes", admin.delete)

//admin chefs
routes.get("/admin/chefs/create", chefs.create)
routes.post("/admin/chefs", chefs.post)
routes.get("/admin/chefs/:id", chefs.show)
routes.get("/admin/chefs", chefs.index)
routes.get("/admin/chefs/:id/edit", chefs.edit)
routes.put("/admin/chefs", chefs.put)
routes.delete("/admin/chefs", chefs.delete)


module.exports = routes