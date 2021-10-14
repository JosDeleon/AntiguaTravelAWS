const db = require('../models');
const Producto = db.producto;
const Caracteristca = db.caracteristicas;

exports.insert = async (req, res) => {
    const carac = req.body.carac;
    
    Producto.create({
        nombre : req.body.nombre,
        descripcion : req.body.descripcion,
        valor : req.body.valor,
        img : req.body.img,
        negocioId : req.body.negocioId
    }).then( (producto) => {
        let insertCarac = []

        carac.forEach( carArray => {
            insertCarac.push({
                nombre : carArray.nombre,
                valor : carArray.valor,
                icono : carArray.icono,
                productoServicioId : producto.id
            })
        })

        Caracteristca.bulkCreate(insertCarac)
        .then( () => {
            res.status(200).send({ message : 'Producto Creado'})
        })
        .catch( err => {
            res.status(500).send({ message : err.message})
        })
        res.send({ message : 'Producto Registrado Correctamente!!!'});
    }).catch(err => {
        res.status(500).send({ message : err.message })
    }); 
}


exports.getProducto = (req, res) => {
    Producto.findOne({
        where : { id : req.body.id}
    })
    .then(async (producto) => {
        if(!producto){
            return res.status(404).send({ message : 'Producto no econtrado.'});
        }
        res.status(200).send(producto);
    })
    .catch(err => {
        res.status(500).send({ message : err.message});
    });
}

exports.getProductos = async (req, res) => {
    await Producto.findAll({
        where : { negocioId : req.body.id }
    })
    .then(async (productos) => {
        if(!productos){
            return res.status(404).send({ message : 'Productos no econtrados.'});
        }
        /*
        productos.forEach( producto => {
            Caracteristca.findAll({
                where : {
                    productoServicioId : producto.id
                }
            }).then( caracteristicas => {
                producto.push({ carac : caracteristicas})
                console.log('==========================PRODUCTO==========================', producto)
            }).catch( err => {
                res.status(500).send({ message : err.message});        
            })
        })
        */

        res.status(200).send(productos);
    })
    .catch(err => {
        res.status(500).send({ message : err.message});
    });
}

exports.delete = (req, res) => {
    Galeria.destroy({
        where : {
            id : req.body.id
        }
    }).then(() => {
        res.send({ message : 'Producto Eliminado Correctamente!!!'});
    }).catch(err =>{
        res.status(500).send({ message : err.message});
    });
};

exports.deleteProducts = (req, res) => {
    Galeria.destroy({
        where : {
            negocioId : req.body.negocioId
        }
    }).then(() => {
        res.send({ message : 'Productos Eliminados Correctamente!!!'});
    }).catch(err =>{
        res.status(500).send({ message : err.message});
    });
};

exports.update = (req, res) => {
    Producto.update({
        nombre : req.body.nombre,
        descripcion : req.body.descripcion,
        valor : req.body.valor,
        img : req.body.img
    },
    {
        where : {
            id : req.body.id
        }
    })
}