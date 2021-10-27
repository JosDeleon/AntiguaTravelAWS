const controller = require('../controllers/galeria.controller');

module.exports = (app) => {
    app.get("/api/galeria/img", controller.getImg);

    app.post('/api/galeria/negocio', controller.getGalery);

    app.post('/api/galeria', controller.insert);
    
    app.delete('/api/galeria', controller.deleteGalery);

    app.delete('/api/galeria/img', controller.delete);
}