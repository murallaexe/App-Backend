var express = require('express');
var  mongoose  = require('mongoose');
var router = express.Router();
var orden = require('../models/ordenes');

//count
router.get('/count',function(req,res){
    orden.find({},{_id:true})
    .then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
})

router.post('/',function (req, res) {
    let ordens = new orden({
        _id : mongoose.Types.ObjectId(),
        idOrden:req.body.idOrden,
        
        comision:50.00,
        estadoOrden:'no tomada',
        nombreMotorista:'',
        Idmotorista:'',
        placaVehiculo:'',
        empresa:req.body.empresa,
        producto:req.body.producto,
        precioProducto:req.body.precioProducto,
        cantidadProducto:req.body.cantidadProducto,
        tipoEntrega:req.body.tipoEntrega,
        tiempoEntrega:req.body.tiempoEntrega,
        metodoPago:req.body.metodoPago,
        numeroPago:req.body.numeroPago,
        idCliente:req.body.idCliente,
        
        nombreCliente:req.body.nombreCliente,
        telefonCliente:req.body.telefonCliente,
        descripcionPedido:req.body.descripcionPedido,
        direccioncliente:req.body.direccioncliente,
    });
    ordens.save().then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
}); 
//ordenes no tomadas
router.get('/',function (req, res){
    orden.find({
        estadoOrden: "no tomada"
    },{})
    .then(result=>{
        res.send(result);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    });
});

router.put('/:idOrden', function(req,res){
    orden.update(
        {
            _id:req.params.idOrden
        },
        {
            estadoOrden:req.body.estadoOrden,
            nombreMotorista:req.body.nombreMotorista,
            Idmotorista:req.body.Idmotorista,
            placaVehiculo:req.body.placaVehiculo,
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});


router.put('/:idOrden/CambiosEstadoOrdenes/', function(req,res){
    orden.updateOne(
        {
            _id:req.params.idOrden,
        },
        {
            $set:{'estadoOrden':req.body.estadoOrden,
                  precioProducto :req.body.precio
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

module.exports = router;