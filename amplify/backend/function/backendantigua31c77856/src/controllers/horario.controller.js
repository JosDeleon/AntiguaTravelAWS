const db = require('../models');
const Horario = db.horario

exports.getHorario = (req, res) => {
    Horario.findAll({
        where : { negocioId : req.body.negocioId }
    })
    .then(async (horario) => {
        if(!horario){
            return res.status(404).send({ message : 'Horario no econtrados.'});
        }
        res.status(200).send(horario);
    })
    .catch(err => {
        res.status(500).send({ message : err.message});
    });
};

exports.insert = async (req, res) => {
    await Horario.create({
        dia : req.body.dia,
        abre : req.body.abre,
        cierra  : req.body.cierra,
        negocioId : req.body.negocioId
    }).then(() => {
        res.status(200).send({ message : 'Horario Registrado!!!'});
    }).catch(err => {
        res.status(500).send({ message : err.message })
    });
};

exports.delete = (req, res) => {
    Horario.destroy({
        where : {
            negocioId : req.body.id
        }
    }).then(() => {
        res.status(200).send({ message : 'Horario Eliminado!!!'});
    }).catch(err =>{
        res.status(500).send({ message : err.message});
    });
};

exports.deleteDay = (req, res) => {
    Horario.destroy({
        where : {
            id : req.body.id
        }
    }).then(() => {
        res.status(200).send({ message : 'Horario Eliminado!!!'});
    }).catch(err =>{
        res.status(500).send({ message : err.message});
    });
};

exports.update = (req, res) => {
    Horario.update({
        abre : req.body.abre,
        cierra : req.body.cierra,
    },{
        where : { id : req.body.id }
    }).then( () => {
        res.send({ message : 'ok'});
    }).catch(err => {
        res.status(500).send({ message : err.message })
    })
}