/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const express = require('express');
const path = require('path');
const port = process.env['PORT'] || 8080;

const app = express();
app.use(express.static('pages'));

app.listen(port);
console.log('Server running, listening on port 8080');
