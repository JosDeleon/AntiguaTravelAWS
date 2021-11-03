const controller = require('../controllers/tags.controller')

module.exports = function (app){

    app.get('/api/tags', controller.get)

    app.post('/api/tags', controller.search)
    
    app.post('/api/tags/negocio', controller.businessesTags)
    
    app.delete('/api/tags', controller.delete)

    app.post('/api/tags/find', controller.find)

    app.post('/api/tags/insert', controller.insert)
}