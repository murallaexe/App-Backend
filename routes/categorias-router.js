var express = require('express');
const mongoose  = require('mongoose');
var router = express.Router();
var categoria = require('../models/categorias');

//todas las categorias
router.get('/', function(req,res){
    categoria.find({},
        {_id:true, comercios:true, nombreCategoria:true}
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
        {_id:true,nombreCategoria:true,comercios:true}
    ).then(result=>{
        res.send(result[0]);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    })
});
//productos o combos
router.get('/:idCategoria/productos/:idComercio', function(req,res){
    categoria.find({
        _id:req.params.idCategoria,
        "comercios._id":mongoose.Types.ObjectId(req.params.idComercio)},
        {
            _id:true,
            'comercios.productos.$':true,
            'comercios.nombreEmpresa':true,
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
module.exports = router;