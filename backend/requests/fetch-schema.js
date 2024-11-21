const { get } = require('axios');
const { ANGULAR_DEVKIT_BUILD, ANGULAR_BUILD } = require('../urls');
const { dereference } = require('@apidevtools/json-schema-ref-parser');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchSchema = async (version, builder, schemaUrl, retries = 3, delayMs = 5000) => {
    if (schemaUrl.startsWith('./')) {
        schemaUrl = schemaUrl.replace('./', '');
    }
    const majorVersion = version.split('.')[0];
    const basePath = majorVersion > 17 && builder === 'application' ? ANGULAR_BUILD : ANGULAR_DEVKIT_BUILD;
    const schemaPath = `${basePath}${version}/${schemaUrl}`;

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            console.log(`Fetching schema for builder ${builder} (attempt ${attempt}): ${schemaPath}`);
            const response = await get(schemaPath);
            return await dereference(response.data);
        } catch (error) {
            console.error(
                `Error fetching schema for version ${version}, builder ${builder} (attempt ${attempt}): ${error.message}`
            );
            if (attempt < retries) {
                console.log(`Retrying in ${delayMs}ms...`);
                await delay(delayMs); // Wait before retrying
            } else {
                console.error(`Failed to fetch schema after ${retries} attempts: ${schemaPath}`);
                return {}; // Return an empty object on failure
            }
        }
    }
};

module.exports = fetchSchema;
