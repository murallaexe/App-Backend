var mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

var esquema = new mongoose.Schema({
    nombreUsuario :String,
    correoUsuario :String,
    contraseniaUsuario :String,
    descripcion :String,
    pais: String,
    ciudad: String,
    coloniaProvicia: String,
    telefono: String,
    apodo: String,
    tipoUsuario: String,
    UrlFoto:String,
    placaVehiculo:String,
    tarjetas: Array,
    listaPedidos: Array,
    ordenes:Array
});

module.exports = mongoose.model('usuarios',esquema);