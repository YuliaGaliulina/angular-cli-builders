const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const builderRoutes = require('./routes/builders');
const app = express();

const isProduction = process.env.NODE_ENV === 'production';

const corsOptionsProduction = {
    origin: ['https://yuliagaliulina.github.io'],
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
};

const corsOptionsDevelopment = {
    origin: ['http://localhost:4200'],
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
};

app.use(express.json());

if (isProduction) {
    app.use(cors(corsOptionsProduction));
} else {
    app.use(cors(corsOptionsDevelopment));
}

app.use('/api/builders', builderRoutes);

if (isProduction) {
    module.exports.handler = serverless(app);
} else {
    module.exports = app;
}