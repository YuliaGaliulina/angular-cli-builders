const { get } = require('axios');
const { ANGULAR_DEVKIT_BUILD } = require('../urls');

const fetchBuildersForVersion = async (version) => {
    try {
        const response = await get(`${ANGULAR_DEVKIT_BUILD}${version}/builders.json`);
        const buildersResponse = response.data.builders;
        return Object.keys(buildersResponse).map(key => {
            const majorVersion = version.split('.')[0];
            const schemaUrl = majorVersion > 17 && key === 'application' ? `/src/builders/application/schema.json` : buildersResponse[key].schema;

            return { title: key, schemaUrl }
        });
    } catch (error) {
        console.error(`Failed to fetch data for version ${version}:`, error);
        return [];
    }
}

module.exports = fetchBuildersForVersion;
