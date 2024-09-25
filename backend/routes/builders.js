const express = require('express');
const { dereference } = require('@apidevtools/json-schema-ref-parser');
const { get } = require('axios');

const router = express.Router();

const ANGULAR_DEVKIT_BUILD = 'https://unpkg.com/@angular-devkit/build-angular@';
const ANGULAR_BUILD = 'https://unpkg.com/@angular/build@';

router.get('/:version', async (req, res) => {
    const version = req.params.version;

    try {
        const response = await get(`${ANGULAR_DEVKIT_BUILD}${version}/builders.json`);
        const builders = Object.keys(response.data.builders).map(key => ({ title: key }))
        return res.json(builders);
    } catch (error) {
        console.error("Error in /schema route:", error);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
});

router.get('/:version/:builder', async (req, res) => {
    const builder = req.params.builder;
    const version = req.params.version;
    const majorVersion = version.split('.')[0];
    const basePath = majorVersion > 17 && builder === 'application' ? ANGULAR_BUILD : ANGULAR_DEVKIT_BUILD;
    const schemaPath = `${basePath}${version}/src/builders/${builder}/schema.json`;

    try {
        const response = await get(schemaPath);
        const schema = await dereference(response.data);
        return res.json(schema);
    } catch (error) {
        console.error("Error in /schema route:", error);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
});

module.exports = router;
