/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const express = require('express');
const path = require('path');
const port = process.env['PORT'] || 8080;

const mongoClient = require('mongodb').MongoClient; // Je test MongoDB
const url = 'mongodb://localhost';

const app = express();

let db;

app.use(express.static('pages'));
app.use(express.json());

app.get('/accueil', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/index.html'));
});

app.get('/prisoniers', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/prisoniers.html'));
});

app.get('/affaires', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/affaires.html'));
});


app.get('/show_data', (req, res) => {
  mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
    console.log('Connected to DB prison_nantes');
    db = client.db('prison_nantes');
    db.collection("prisoners").find({},{projection:{ _id: 0 }}).toArray((err, data) => {
      console.log(data);
      res.status(200).json({'result': data});
      client.close();
    });
  });
});


app.listen(port);
console.log('Server running, listening on port 8080');

/*app.get('/', (request, response) => { // Test: 'curl http://localhost:1963/'
    response.send('<h1 style="color: green;">"GPAO.Node.js.ts": Restful Web services, test</h1>');
});*/
