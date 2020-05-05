// Express Imports
const express = require('express');
const bodyParser = require('body-parser');

// Important Function Imports
const { port } = require('./config');

const { logMetric, getMetricSum, handleMissingRoutes } = require('./src/controllers');

const { handleErrors } = require('./src/middlewares');

const { appStarts } = require('./src/services');

// Server Configuration And Initialization
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.post('/metric/:key', logMetric);

app.get('/metric/:key/sum', getMetricSum);

app.use('*', handleMissingRoutes);

app.use(handleErrors);

// Server Starts
app.listen(port, appStarts(port));
