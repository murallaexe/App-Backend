var mongoose = require('mongoose');

class Database {
    constructor () {
            mongoose.connect(`mongodb+srv://muralla98:Ramosjaniel98.@vejadelivery.y4jtc.mongodb.net/test?authSource=admin&replicaSet=atlas-t097wr-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`,
                { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
            )
            //mongoose.connect(`mongodb+srv://delivery:delivery@projectdw.ar2xk.mongodb.net/test`, { useNewUrlParser: true, useUnifiedTopology: true })
            //mongoose.connect(`mongodb://${host}:${port}/${db}`, {useNewUrlParser:true, useUnifiedTopology:true})
            .then(result => console.log(`Se conectó a MongoDB`))
            .catch(error => console.log(error));
        }
}

module.exports = new Database();
