var mongoose = require('mongoose');

var esquema = new mongoose.Schema({
    idOrden:String,
    tipoOrden:String,
    comision:String,
    estadoOrden:String,
    nombreMotorista:String,
    Idmotorista:String,
    placaVehiculo:String,
    empresa: String,
    producto: String,
    precioProducto:String,
    cantidadProducto:String,
    tipoEntrega: String,
    tiempoEntrega:  String,
    metodoPago:String,
    numeroPago:String,
    idCliente:String,
    nombreCliente:String,
    telefonCliente:String,
    descripcionPedido:String,
    direccioncliente:String,
});

module.exports = mongoose.model('ordenes',esquema);