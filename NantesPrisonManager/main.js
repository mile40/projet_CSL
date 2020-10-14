/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const express = require('express');
const path = require('path');
const port = process.env['PORT'] || 8080;

const mongoClient = require('mongodb').MongoClient; // Je test MongoDB
const url = 'mongodb://localhost/prison_nantes';

const app = express();
app.use(express.static('pages'));

app.post('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/index.html'));
});

app.post('/prisoniers', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/prisoniers.html'));
});

app.post('/affaires', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/affaires.html'));
});

mongoClient.connect(url, (err, db) => {
  console.log('Connected to DB prison_nantes');
  db.close();
});

app.listen(port);
console.log('Server running, listening on port 8080');

app.get('/', (request, response) => { // Test: 'curl http://localhost:1963/'
    response.send('<h1 style="color: green;">"GPAO.Node.js.ts": Restful Web services, test</h1>');
});
