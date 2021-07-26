var mongoose = require('mongoose');

var esquema = new mongoose.Schema({
    nombreUsuario :String,
    emailUsuario :String,
    passwordUsuario :String,
    descripcion :String
});

module.exports = mongoose.model('usuarios',esquema);