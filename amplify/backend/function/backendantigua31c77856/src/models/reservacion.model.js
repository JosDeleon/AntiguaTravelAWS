module.exports = (sequelize, Sequelize) => {
    const Reservacion = sequelize.define('reservacion', {
        id : {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        cantidad : {
            type : Sequelize.INTEGER
        },
        hora : {
            type : Sequelize.TIME
        },
        fechaSolicitud : {
            type : Sequelize.DATE
        },
        fechaInicio : {
            type : Sequelize.DATE
        },
        fechaFinal : {
            type : Sequelize.DATE
        },
        estado : {
            type : Sequelize.STRING
        },
        valor : {
            type : Sequelize.DECIMAL(10, 2)
        },
    },{
        freezeTableName : true
    });
    
    return Reservacion;
};