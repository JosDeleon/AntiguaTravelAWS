const controller = require('../controllers/horario.controller');

module.exports = (app) => {
    app.post("/api/horario", controller.insert);

    app.post("/api/horario/negocio", controller.getHorario);

    app.delete("/api/horario", controller.delete);

    app.delete("/api/horario/dia", controller.deleteDay);

    app.put("/api/horario", controller.update);
}