var express = require('express');
const mongoose  = require('mongoose');
var router = express.Router();
var categoria = require('../models/categorias');

//todas las categorias
router.get('/', function(req,res){
    categoria.find({},
        {}
    ).then(result=>{
        res.send(result);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    })
});
//una categoria
router.get('/:idCategoria', function(req,res){
    categoria.find({_id:req.params.idCategoria},
        {}
    ).then(result=>{
        res.send(result[0]);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    })
});
//productos o combos (Ojo revisar) 
router.get('/:idCategoria/productos/:idComercio', function(req,res){
    categoria.find({
        _id:req.params.idCategoria,
        "comercios._id":mongoose.Types.ObjectId(req.params.idComercio)},
        {
            _id:true,
            'comercios.productos.$':true,
            'comercios.nombreEmpresa':true,
            'comercios.imagenComercio':true,
            'comercios.imagenPortada':true,
            'comercios.imagenBanner':true,
            'comercios.tipoEmpresa':true,
            'comercios.LemaEmpresa':true,
            'comercios.marcaProducto':true,
        }
    ).then(result=>{
        res.send(result[0]);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    })
});
//suscursales
router.get('/:idCategoria/sucursales/:idComercio', function(req,res){
    categoria.find({
        _id:req.params.idCategoria,
        "comercios._id":mongoose.Types.ObjectId(req.params.idComercio)
    },
        {'comercios.sucursales.$':true}
    ).then(result=>{
        res.send(result[0]);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    })
});


//traer un solo comercio
router.get('/:idCategoria/comercios/:idComercio', function(req,res){
    categoria.find({
        _id:req.params.idCategoria,
        "comercios._id":mongoose.Types.ObjectId(req.params.idComercio)
    },
    {'comercios.$':true}
    ).then(result=>{
        res.send(result[0]);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    })
});
//
//obtener datos para orden
router.get('/:idCategoria/comercio/:idComercio/producto/', function(req,res){
    categoria.find({
        _id:req.params.idCategoria,
        "comercios._id" : mongoose.Types.ObjectId(req.params.idComercio),
    },
        {
            nombreCategoria:true,
            'comercios.nombreEmpresa.$':true,
        }
    ).then(result=>{
        res.send(result[0]);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    })
});



//editar informacion de un comercio 


router.put('/:idCategoria/comercios/:idComercio', function(req,res){
    categoria.updateOne(
        {
            _id:mongoose.Types.ObjectId(req.params.idCategoria),
            "comercios._id": mongoose.Types.ObjectId(req.params.idComercio)
        },
        {
            $set:{
                'comercios.$.tipoEmpresa':req.body.tipoEmpresa,
                'comercios.$.sedePais':req.body.sedePais,
                'comercios.$.LemaEmpresa':req.body.LemaEmpresa,
                'comercios.$.imagenLogo':req.body.imagenLogo,
                'comercios.$.imagenComercio':req.body.imagenComercio,
                'comercios.$.imagenPortada':req.body.imagenPortada
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

//traer un solo producto
router.post('/:idCategoria/comercios/:idComercio/productos/:idProducto', function(req,res){
    categoria.updateOne(
        {
            _id: mongoose.Types.ObjectId(req.params.idCategoria)
        },
        {
            
            $set:{
                "comercios.$[emp].productos.$[pro].nombreProducto": req.body.nombreProducto,
                "comercios.$[emp].productos.$[pro].marcaProducto": req.body.marcaProducto,
                "comercios.$[emp].productos.$[pro].detalleProducto": req.body.detalleProducto,
                "comercios.$[emp].productos.$[pro].precio": req.body.precio,
                "comercios.$[emp].productos.$[pro].imagenProducto": req.body.imagenProducto
            },
        },
        {
            arrayFilters: [
                {
                    "emp._id": {$eq: mongoose.Types.ObjectId(req.params.idComercio)}
                },
                {
                    "pro._id":{$eq: mongoose.Types.ObjectId(req.params.idProductos)}
                }
            ]
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



// db.collection.update(
//     {   
//         "_id": {$eq: ObjectId("5c3d2b3502d0a9467037ede5")}
//     },
//     {
//         $set: {"perfiles.$[perf].estudios.$[est].institucion": "Escola Poblenou"}
//     },
//     {
//         arrayFilters:[
//             {
//                 "perf._id": {   
//                     $eq: ObjectId("5c3d2b4702d0a9467037ede7")
//                 }
//             },
//             {
//                 "est._id":{ $eq: ObjectId("5c5110da02d0a90ba0926731")}
//             }
//         ]
//     }
// )