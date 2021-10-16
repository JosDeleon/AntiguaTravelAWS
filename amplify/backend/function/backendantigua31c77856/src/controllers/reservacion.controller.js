const AWS = require('aws-sdk');
const SES = new AWS.SES();
const db = require('../models');
const Reserva = db.reservacion;
const Usuario = db.usuario
const Negocio = db.negocio
const Op = db.Sequelize.Op;

exports.insert = (req, res) => {
    Reserva.create({
        cantidad : req.body.cantidad,
        hora : req.body.hora,
        fechaInicio : req.body.fechaInicio,
        fechaFinal : req.body.fechaFinal,
        valor : req.body.valor,
        usuarioId : req.body.usuarioId,
        negocioId : req.body.negocioId,
        productoServicioId : req.body.productoId
    }).then(() => {
        res.send({ message : 'Usuario Registrado Correctamente!!!'});
    }).catch(err => {
        res.status(500).send({ message : err.message })
    });
}

exports.getReserva = (req, res) => {
    Reserva.findOne({
        where : { id : req.body.id}
    })
    .then(async (reserva) => {
        if(!reserva){
            return res.status(404).send({ message : 'Reserva no econtrada.'});
        }
        res.status(200).send(reserva);
    })
    .catch(err => {
        res.status(500).send({ message : err.message});
    });
}

exports.getReservas = (req, res) => {
    Reserva.findAll({
        where : { negocioId : req.body.negocioId}
    })
    .then(async (productos) => {
        if(!productos){
            return res.status(404).send({ message : 'Productos no econtrados.'});
        }
        res.status(200).send(productos);
    })
    .catch(err => {
        res.status(500).send({ message : err.message});
    });
}

exports.delete = (req, res) => {
    Reserva.destroy({
        where : {
            id : req.body.id
        }
    }).then(() => {
        res.send({ message : 'Producto Eliminado Correctamente!!!'});
    }).catch(err =>{
        res.status(500).send({ message : err.message});
    });
}

exports.deleteReservas = (req, res) => {
    Reserva.destroy({
        where : {
            [Op.and] : [ 
                { id : req.body.id },
                { negocioId : req.body.negocioId }
            ]
        }
    }).then(() => {
        res.send({ message : 'Productos Eliminados Correctamente!!!'});
    }).catch(err =>{
        res.status(500).send({ message : err.message});
    });
};

exports.solicitar = async (req, res) => {
    await Usuario.findOne({
        where : { id : req.body.usuarioId }
    })
    .then( (cliente) => {
        Negocio.findOne({
            where : { id : req.body.negocioId }
        })
        .then( (negocio) => {
            Usuario.findOne({
                where : { id : negocio.usuarioId }
            }).then( (propietario) => {
                const destino = propietario.correo

                var params = {
                    Destination : {
                        ToAddresses : [
                            destino,
                        ]
                    },
                    Message : {
                        Body : {
                            Text : {
                                Charset: "UTF-8",
                                Data: `El cliente ${cliente.nombre} solicita la siguiente reservación: \n Cantidad de personas : ${req.body.cantidad} \n Fecha : ${req.body.fecha} \n Hora : ${req.body.hora} \n Observaciones del Cliente : ${req.body.observacion }\n Información de contacto del cliente: \n Telefono : ${cliente.telefono}\n Correo : ${cliente.correo}`
                            }
                        },
                        Subject: {
                            Charset: 'UTF-8',
                            Data: 'Solicitud de Reservación'
                        }
                    },
                    Source: 'antiguatravelservice@gmail.com',   
                }

                try {
                    SES.sendEmail(params).promise();
                    return res.status(200).send({ message : 'Solicitud Enviada'});
                } catch (error) {
                    return res.status(400).send({ message : error});
                }

            }).catch( err => {
                res.status(500).send({ message : err.message })
            })
        })
        .catch( err => {
            res.status(500).send({ message : err.message })
        })
    })
    .catch( err => {
        res.status(500).send({ message : err.message })
    })
}