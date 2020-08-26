const db = require('../../config/db')
const { simpleDate } = require('../../lib/utils')

module.exports = {
    create(data, callback){
        const query = `
            INSERT INTO recipes
            (
                chef_id,
                image,
                title,
                ingredients,
                preparation,
                information,
                created_at
            ) VALUES ($1, $2, $3, $4, $5,$6, $7)
            RETURNING id
        `

        const values = [
            data.chef_id,
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.created_at = simpleDate(Date.now()).iso
        ]

        db.query(query, values, function(err, results){
            if (err) throw `${err}`

            callback(results.rows[0])
        })
        
    },
    getChefs(callback){
        const query = `
            SELECT * FROM chefs
        `
        const chefs = db.query(query, function(err, results){
            if (err) throw `${err}`

            callback(results.rows)
        })
    },
    all(callback){
        const query = `
            SELECT recipes.id, chefs.name AS chef, recipes.title, recipes.image
            FROM recipes
            LEFT JOIN chefs on (recipes.chef_id = chefs.id)
            GROUP BY recipes.id, chefs.name
        `

        db.query(query, function(err, results){
            if (err) throw `${err}`

            callback(results.rows)
        })
    },
    find(id, callback){
        const query=`
            SELECT recipes.*, chefs.name AS chef
            FROM recipes
            LEFT JOIN chefs on (recipes.chef_id = chefs.id)
            WHERE recipes.id = $1
            GROUP BY recipes.id, chefs.name
        `

        db.query(query, [id], function(err, results){
            if (err) throw `${err}`
            
            callback(results.rows[0])
        })
    },
    update(data, id, callback){
        const query = `
            UPDATE recipes SET
            image = ($1),
            title = ($2),
            chef_id = ($3),
            ingredients = ($4),
            preparation = ($5),
            information = ($6)
            WHERE id = $7
        `

        const values = [
            data.image,
            data.title,
            data.chef_id,
            data.ingredients,
            data.preparation,
            data.information,
            id
        ]

        db.query(query, values, function(err, results){
            if (err) throw `${err}`

            callback()
        })
    },
    delete(id, callback){
        db.query(`DELETE FROM recipes WHERE id = $1`, [id], function(err, results){
            if (err) throw `${err}`
            
            callback()
        })
    },
    findBy(filter, callback){
        const query = `
            SELECT recipes.id, chefs.name AS chef, recipes.title, recipes.image
            FROM recipes
            LEFT JOIN chefs on (recipes.chef_id = chefs.id)
            WHERE recipes.title ILIKE '%${filter}%'
            GROUP BY recipes.id, chefs.name
        `
        db.query(query, function(err, results){
            if (err) throw `${err}`
            
            callback(results.rows)
        })
    }
}