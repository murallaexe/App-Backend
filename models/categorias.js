var mongoose = require('mongoose');

var esquema = new mongoose.Schema({
    nombreCategoria:String,
    icono:String,
    image: String,
    descripcionCategoria:String,
    comercios:Array,
});

module.exports = mongoose.model('categorias',esquema);