var express = require('express');
var  mongoose  = require('mongoose');
var router = express.Router();
var usuario = require('../models/usuario');
var jwt = require('jsonwebtoken');
// var User = require('./usuario');


//crear un usario
router.post('/',function(req,res){
    let u = new usuario({
        nombreUsuario:req.body.nombreUsuario,
        correoUsuario:req.body.emailUsuario,
        contraseniaUsuario:req.body.passwordUsuario,
        descripcion:req.body.descripcion,
        pais:req.body.pais,
        ciudad:req.body.ciudad,
        coloniaProvicia:req.body.coloniaProvicia,
        telefono:req.body.telefono,
        apodo:req.body.apodo,
        tipoUsuario:req.body.tipoUsuario,
        UrlFoto:"",
        tarjetas:[],
        listaPedidos:[],
        solicitud:false,
        estado:false

    });
    u.save().then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});
//obtener infomacion un usuario
router.get('/:id',function(req,res){
    usuario.find({_id: req.params.id},{
        nombreUsuario:true,
        correoUsuario:true,
        contraseniaUsuario:true,
        descripcion:true,
        pais:true,
        ciudad:true,
        coloniaProvicia:true,
        telefono:true,
        apodo:true,
        UrlFoto:true,
        "tarjetas.nombreTarjeta":true,
        "tarjetas._id":true,
        "tarjetas.numeroTarjeta":true,
    })
    .then(result=>{
        res.send(result[0]);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    });
});

//obtener datos motorista

router.get('/:id/motorista',function(req,res){
    usuario.find(
        {
            _id: req.params.id
        }
        ,{
        _id:true,
        nombreUsuario:true,
        telefono:true,
        ordenes:true,
        placaVehiculo:true
    })
    .then(result=>{
        res.send(result[0]);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    });
});


//login sin tokens
router.post('/login2', function(req,res){
    usuario.findOne({correoUsuario: req.body.email, contraseniaUsuario: req.body.password},{_id:true, "tipoUsuario":true}).
    then(result=>{
        if(!result){
            res.status(200).send({Code:0,data:result});
        }else{
            res.status(200).send({code:1,data : result});
        }
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

//login con tokens
router.post('/login', function(req,res){
    usuario.findOne({correoUsuario: req.body.email, contraseniaUsuario: req.body.password},{
        _id:true, 
        "tipoUsuario":true,nombreUsuario:true,
        UrlFoto:true,
        solicitud:true
    }).
    then(result=>{
        if(!result){
            res.status(200).send({Code:0,data:result});
        }else{
            //res.status(200).send({code:1,data : result});
            jwt.sign({code:1,data:result},'secretkey',(err,token)=>{
                res.json(
                    token
                )
            });
        }
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});
//obtener la data del tokens
router.post('/posts', verifyToken, (req,res)=>{
    jwt.verify(req.token,'secretkey', {expiresIn:'2h'} ,(error,authData)=>{
        if(error){
            res.sendStatus(403);
        }else{
            res.json({
                mensaje:"post creado",
                // "tokens":req.token,
                authData
            })
        }
    })
});
//Authorization: Bearer <token>
function verifyToken(req,res,next){
    const BearerHeader = req.headers['authorization'];

    if(typeof BearerHeader !== 'undefined'){
        const BearerToken = BearerHeader.split(" ")[1];
        req.token = BearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}
//actualizar la data del usuario
router.put('/:id',function(req,res){
    usuario.update(
        {_id:req.params.id},
        {
            nombreUsuario:req.body.nombreUsuario,
            correoUsuario:req.body.emailUsuario,
            contraseniaUsuario:req.body.passwordUsuario,
            descripcion:req.body.descripcion,
            pais:req.body.pais,
            ciudad:req.body.ciudad,
            coloniaProvicia:req.body.coloniaProvicia,
            telefono:req.body.telefono,
            apodo:req.body.apodo,
            UrlFoto:req.body.UrlFoto
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    })
})
//guardar tarjetas de creditos
router.post('/:id/tarjetaCredito',function(req,res){
    usuario.update(
        {_id:req.params.id},
        {
            $push:{
                "tarjetas":{
                    _id : mongoose.Types.ObjectId(),
                    nombreTarjeta : req.body.nombreTarjeta,
                    numeroTarjeta : req.body.numeroTarjeta,
                    vencimiento : req.body.vencimiento,
                    codigoSeguridad: req.body.codigoSeguridad,
                }
            }
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    })
})
//borrar tarjetas de credito
router.delete('/:idUsuario/tarjetaCredito/:idtarjeta',function(req,res){
    usuario.update(
        {_id: req.params.idUsuario,},
        { $pull:{"tarjetas":{_id:mongoose.Types.ObjectId(req.params.idtarjeta)}}},
        {multi:true}
    ).then(result=>{
        res.send(result);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    });
});
//crear un una orden


router.post('/:idUsuario/ordenes',function (req, res) {
    usuario.update(
        {
            _id:mongoose.Types.ObjectId(req.params.idUsuario)
        },
        {
            $push:{
                "listaPedidos":{
                    _id:mongoose.Types.ObjectId(),
                    idOrden:req.body.idOrden,
                    empresa:req.body.empresa,
                    producto:req.body.producto,
                    precioProducto:req.body.precioProducto,
                    cantidadProducto:req.body.cantidadProducto,
                    tipoEntrega:req.body.tipoEntrega,
                    tiempoEntrega:req.body.tiempoEntrega,
                    metodoPago:req.body.metodoPago,
                    numeroPago:req.body.numeroPago,
                    comision:50.00,
                    estadoOrden:'origen',
                }
            }
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});


//obtener registro pedidos
router.get('/:idUsuario/registro',function(req,res){
    usuario.find({
        _id: req.params.idUsuario,
    },{
        "listaPedidos":true,
    })
    .then(result=>{
        res.send(result[0]);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    });
});


//cambiar de cliente normal a motorista
router.post('/:idUsuario/admin/motorista',function(req,res){
    usuario.update(
        {
            _id:req.params.idUsuario
        },
        {
            $push:{
                "ordenes":[],
            },
            "placaVehiculo":req.body.placaVehiculo,
            tipoUsuario:'motorista',
            estado:true,
        },
        {multi:true}
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
})
//Tomar la orden del motorista
router.post('/:idUsuario/motorista/ordenes',function (req, res) {
    usuario.update(
        {
            _id:req.params.idUsuario
        },
        {
            $push:{
                "ordenes":{
                    _id:mongoose.Types.ObjectId(),
                    idDatabaseOrden:req.body.idDatabaseOrden,
                    idCliente:req.body.idCliente,
                    idOrden:req.body.idOrden,
                    empresa:req.body.empresa,
                    producto:req.body.producto,
                    estadoOrden:req.body.estadoOrden,
                    descripcionPedido:req.body.descripcionPedido,
                    cantidadProducto:req.body.cantidadProducto,
                    tiempoEntrega:req.body.tiempoEntrega,
                    precioProducto:req.body.precioProducto,
                    comision:req.body.comision,
                    nombreCliente:req.body.nombreCliente,
                    telefonCliente:req.body.telefonCliente,
                    direccioncliente:req.body.direccioncliente,
                    metodoPago:req.body.metodoPago,
                }
            }
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});
//cambiar estado de orden de tomada 
router.put('/:idUsuario/CambiosEstadoOrdenes/:idOrden', function(req,res){
    usuario.updateOne(
        {
            _id:req.params.idUsuario,
            "listaPedidos._id": mongoose.Types.ObjectId(req.params.idOrden)
        },
        {
            $set:{
                'listaPedidos.$.estadoOrden':req.body.estadoOrden,
                'listaPedidos.$.precioProducto':req.body.precio
            }
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

router.put('/:idUsuario/estadoMotorista', function(req,res){
    usuario.updateOne(
        {
            _id:req.params.idUsuario
        },
        {
            $set:{
                solicitud:true
            }
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});
//cambio de estado de motorista
router.put('/:idUsuario/CambiosEstadoOrdenes/:idOrden/motorista', function(req,res){
    usuario.updateOne(
        {
            _id:req.params.idUsuario,
            "ordenes._id": mongoose.Types.ObjectId(req.params.idOrden)
        },
        {
            $set:{
                'ordenes.$.estadoOrden':req.body.estadoOrden,
                'ordenes.$.precioProducto':req.body.precio,
            }
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

// //retorna todos los usuarios
// router.get('/' , (req, res) => {
//     usuario.find(
//         {},{}
//     ).then(result=>{
//         res.send(result);
//         res.end();
//     }).catch(error=>{
//         res.send(error);
//         res.end();
//     });
// })

//retorna usuarios solo administradores
router.get('/' , (req, res) => {
    usuario.find(
        {},{}
    ).then(result=>{
        // let data = [];
        // result.forEach(element => {
        //     if (element.tipoUsuario == 'administrador') {
        //         data.push(element);
        //     }
        // });
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
})

module.exports = router;

