var mongoose = require('mongoose');

let bd = 'VejaDelivery';
let port = '27017';
let host = 'localhost';

class Database{
    constructor(){
        this.conectar();
    }
    conectar(){
        mongoose.connect(`mongodb://mongodb+srv://muralla98:Ramosjaniel98.@cluster0.unaj4.mongodb.net/test`)
        .then(result=>console.log('se conecto a mongodb'))
        .catch(error=>console.log(error));
        //aqui
    }
}
module.exports = new Database();
