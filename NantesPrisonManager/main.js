/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const express = require('express');
const path = require('path');
const port = process.env['PORT'] || 8080;

const app = express();

const prisonersClass = require('prisoners_module');
const prisonersHandler = new prisonersClass();

//let db;

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
  prisonersHandler.read({},{projection:{_id: 0 }})
  .then((data) => {
    //console.log('Server find result');
    //console.log(data);
    res.status(200).json({'result': data});
  });
});


app.listen(port);
console.log('Server running, listening on port 8080');
