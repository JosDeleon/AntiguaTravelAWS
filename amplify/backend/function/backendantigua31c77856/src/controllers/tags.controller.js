const { sequelize } = require('../models')
const db = require('../models')
const Negocio = db.negocio
const Tags = db.tags

exports.search = async (req, res) => {
    await Tags.findAll({
        where : {
            tag : req.body.tags
        }
    })
    .then( tagsNegocios => {
        let idNegocios = [];
        for(tagObj of tagsNegocios){
            idNegocios.push(tagObj.negocioId)
        }

        Negocio.findAll({
            where : { id : idNegocios}
        })
        .then( negocios => {
            res.status(200).send(negocios)
        })
        .catch(err => {
            res.status(500).send({ message : err })
        })
    })
    .catch( err => {
        res.status(500).send({ message : err })
    })
}

exports.get = async (req, res) => {
    await Tags.findAll({
        attributes : [ [ sequelize.fn('DISTINCT', sequelize.col('tag')), 'tag'] ]
    })
    .then( tags => {
        res.status(200).send(tags)
    })
    .catch( err => {
        res.status(500).send({message : err.message})
    })
}

exports.businessesTags = async (req, res) => {
    await Tags.findAll({
        where : {
            negocioId : req.body.negocioId
        }
    })
    .then( tags => {
        res.status(200).send(tags)
    }).catch( err => {
        res.status(500).send({message : err.message})       
    })
}

exports.delete =  (req, res) => {
    Tags.destroy({
        where : {
            id : req.body.id
        }
    }).then(() => {
        res.status(200).send({ message : "ok" })
    }).catch(err => {
        res.status(500).send({ message : err.message })
    })
}

exports.insert = async (req, res) => {
    await Tags.create({
        tag : req.body.tag,
        negocioId : req.body.negocioId 
    }).then( (tag) => {
        res.status(200).send({ message : "ok"})
    }).catch(err => {
        res.status(500).send({message : err.message})       
    })
}

exports.find = (req, res) => {
    Negocio.findAll({
        where : { categoria : req.body.categoria },
        attributes : ['id'],
        include : [
            { model : Tags , attributes:['tag']}
        ]
    })
    .then( (resultado) => {
        res.status(200).send(resultado);
    }).catch(err => {
        res.status(500).send({ message : err.message })
    })
}