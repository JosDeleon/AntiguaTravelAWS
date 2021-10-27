module.exports = (sequelize, Sequelize) => {
    const Valoracion = sequelize.define('valoracion', {
        id : {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        titulo : {
            type : Sequelize.STRING
        },
        puntuacion : {
            type : Sequelize.INTEGER
        },
        comentario : {
            type : Sequelize.TEXT
        },
        fecha : {
            type : Sequelize.DATE
        }
    },{
        freezeTableName : true
    });

    return Valoracion;

};