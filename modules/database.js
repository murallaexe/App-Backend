var mongoose = require('mongoose');

let bd = 'VejaDelivery';
let port = '27017';
let host = 'vejadelivery.herokuapp.com';

class Database{
    constructor(){
        this.conectar();
    }
    conectar(){
        mongoose.connect(`mongodb://${host}:${port}/${bd}`)
        .then(result=>console.log('se conecto a mongodb'))
        .catch(error=>console.log(error));
        //aqui
    }
}
module.exports = new Database();
