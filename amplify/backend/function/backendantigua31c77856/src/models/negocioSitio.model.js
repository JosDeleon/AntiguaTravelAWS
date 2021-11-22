module.exports = (sequelize, Sequelize) => {
    const Negocio = sequelize.define('negocio', {
        id : {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        nombre : {
            type : Sequelize.STRING
        },
        categoria : {
            type : Sequelize.CHAR
        },
        direccion : {
            type : Sequelize.STRING
        },
        telefono : {
            type : Sequelize.STRING
        },
        descripcion : {
            type : Sequelize.STRING
        },
        img : {
            type : Sequelize.STRING
        },
        aut : { 
            type : Sequelize.CHAR
        },
        lat : {
            type : Sequelize.DECIMAL(10,8)
        },
        lng : {
            type : Sequelize.DECIMAL(10,8)
        },
        vistas : {
            type : Sequelize.INTEGER
        },
        destino : {
            type : Sequelize.INTEGER
        },
    },{
        freezeTableName : true
    });
    
    return Negocio;
};