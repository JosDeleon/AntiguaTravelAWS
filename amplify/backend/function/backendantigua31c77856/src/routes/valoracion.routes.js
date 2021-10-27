const controller = require('../controllers/valoracion.controller');

module.exports = function (app) {
    app.post('/api/valoracion', controller.insert);

    //app.post('/api/valoracion', controller.getValoracion);

    app.post('/api/valoraciones', controller.getValoraciones);

    app.delete('/api/valoracion', controller.delete);
}