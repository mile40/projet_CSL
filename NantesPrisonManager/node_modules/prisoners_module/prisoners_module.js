const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost';

class PrisonersHandler{
  constructor(){
    this._db;
  }

  // TODO: Fonction Create

  // Fonction Read
  async read(filters,projections){
    return await new Promise((resolve) => {
      mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
        this._db = client.db('prison_nantes');
        this._db.collection('prisoners').find(filters,projections).toArray((err, data) => {
          //console.log('Module query result');
          //console.log(data);
          resolve(data);
          client.close();
        });
      });
    });
  }

  // TODO: Fonction Update

  // TODO: Fonction Delete

}

module.exports = PrisonersHandler;
