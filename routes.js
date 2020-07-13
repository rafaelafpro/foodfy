const express = require('express')
const routes = express.Router()
const data = require('./data.json')
const admin = require('./admin')


routes.get("/admin/recipes/create", admin.create)
routes.get("/admin/recipes", admin.index)
routes.get("/admin/recipes/:id", admin.show)
routes.get("/admin/recipes/:id/edit", admin.edit)

routes.post("/admin/recipes", admin.post)
routes.put("/admin/recipes", admin.put)
routes.delete("/admin/recipes", admin.delete)


module.exports = routes