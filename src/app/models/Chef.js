const db = require('../../config/db')
const {simpleDate} = require('../../lib/utils')


module.exports = {
    create(data, callback){
        const query = `
        INSERT INTO chefs
        (name, avatar_url, created_at)
        VALUES ($1, $2, $3)
        RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            data.created_at = simpleDate(Date.now()).iso
        ]

        console.log(values)
        db.query(query, values, function(err,results){
            if (err) throw `${err}`

            callback(results.rows[0])
        })
    },
    find(id, callback){

        const query = `
            SELECT chefs.*, count(recipes) AS total_recipes
            FROM chefs
            LEFT JOIN recipes on (chefs.id = recipes.chef_id)
            WHERE chefs.id = $1
            GROUP BY chefs.id
        `
        
        db.query(query, [id], function(err,results){
            if (err) throw `${err}`

            callback(results.rows[0])
        })
    },
    findRecipeByChef(id, callback){
        db.query(`
            SELECT recipes.id, chefs.name AS chef, recipes.title, recipes.image
            FROM recipes
            LEFT JOIN chefs on (recipes.chef_id = chefs.id)
            WHERE recipes.chef_id = $1
            GROUP BY recipes.id, chefs.name
        `, 
        [id], function(err, results){
            if (err) throw `${err}`

            callback(results.rows)
        })
    },
    all(callback){
        db.query(`
            SELECT chefs.*, count(recipes) AS total_recipes
            FROM chefs
            LEFT JOIN recipes on (chefs.id = recipes.chef_id)
            GROUP BY chefs.id
        `, function(err, results){
            if (err) throw `${err}`

            callback(results.rows)
        })
    },
    edit(id, callback){
        db.query('SELECT * FROM chefs WHERE id = $1', [id], function(err, results){
            if (err) throw `${err}`

            callback(results.rows[0])
        })
    },
    update(data, id, callback){
        const query = `
            UPDATE chefs SET
            name = ($1),
            avatar_url = ($2)
            WHERE id = $3
            `

        const values = [
            data.name,
            data.avatar_url,
            id
        ]

        db.query(query, values, function(err, results){
            if (err) throw `${err}`

            callback()
        })
    },
    delete(id, callback){
        const query='DELETE FROM chefs WHERE id=$1'

        console.log(`deletando ${id}`);
        
        db.query(query, [id], function(err, results){
            if (err) throw `${err}`

            callback();
        })
    }

        
}