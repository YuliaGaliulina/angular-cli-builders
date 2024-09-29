const express = require('express');
const { dereference } = require('@apidevtools/json-schema-ref-parser');
const { get } = require('axios');
const fetchBuildersForVersion = require('../requests/fetch-builders');
const { ANGULAR_BUILD, ANGULAR_DEVKIT_BUILD } = require('../urls');

const router = express.Router();

router.get('/:version', async (req, res) => {
    const version = req.params.version;

    const response = await fetchBuildersForVersion(version);
    return res.json(response);
});

router.get('/:version/:builder', async (req, res) => {
    let schemaUrl = decodeURIComponent(req.query.schemaUrl);
    if (schemaUrl.startsWith('./')) {
        schemaUrl = schemaUrl.replace('./', '');
    }
    const builder = req.params.builder;
    const version = req.params.version;
    const majorVersion = version.split('.')[0];
    const basePath = majorVersion > 17 && builder === 'application' ? ANGULAR_BUILD : ANGULAR_DEVKIT_BUILD;
    const schemaPath = `${basePath}${version}/${schemaUrl}`;

    try {
        const response = await get(schemaPath);
        const schema = await dereference(response.data);
        return res.json(schema);
    } catch (error) {
        console.error("Error in /schema route:", error.response);
        return res.status(error.status).json({
            message: error.response.data,
            error: error.message
        });
    }
});

module.exports = router;
