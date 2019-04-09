require('marko/node-require').install();
require('marko/express');

// retorna uma funçao
const express = require('express');
const app = express();

const routes = require('../app/routes/routes.js');
routes(app);

// dizendo para o node que esse modulo exporta o 'app' 
module.exports = app;