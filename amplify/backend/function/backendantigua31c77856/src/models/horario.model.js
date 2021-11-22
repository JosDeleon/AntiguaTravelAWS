module.exports = (sequelize, Sequelize) => {
    const Horario = sequelize.define('horario', {
        id : {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        dia : {
            type : Sequelize.INTEGER
        },
        abre : {
            type : Sequelize.TIME
        },
        cierra : {
            type : Sequelize.TIME
        },
    }, {
        freezeTableName : true
    });

    return Horario;
}