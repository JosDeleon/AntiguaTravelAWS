const controller = require('../controllers/reservacion.controller')

module.exports = function (app){
    app.post('/api/reservacion/usuario', controller.getReservasUsuarios)

    app.post('/api/reservacion/negocio', controller.getReservasNegocios) 

    app.post('/api/reservacion', controller.insert)

    app.post('/api/solicitar', controller.solicitar)
}