const fs = require('fs');
const fetchBuildersForVersion = require('../requests/fetch-builders');

const ANGULAR_VERSIONS = [
    '18.2.1',
    '17.3.8',
    '16.2.14',
    '15.2.11',
    '14.2.13',
    '13.3.11',
    '12.2.18',
];

const VERSIONS_MAPPED= ANGULAR_VERSIONS.map((version) => ({
    version: version,
    majorVersion: `v${version.split('.')[0]}`
}));

function writeRoutesToFile(routes) {
    const path = require('path');
    const filePath = path.join(__dirname, '../../routes.txt');
    const fileStream = fs.createWriteStream(filePath, { flags: 'a' });
    routes.forEach((route) => {
        fileStream.write(`${route}\n`);
    });
    fileStream.end();
}

async function generateRoutes() {
    const routes = [];

    for (const versionObj of VERSIONS_MAPPED) {
        const builders = await fetchBuildersForVersion(versionObj.version);

        if (builders.length > 0) {
            routes.push(`/docs/${versionObj.majorVersion}`);

            builders.forEach((builder) => {
                routes.push(`/docs/${versionObj.majorVersion}/${builder.title}`);
            });
        }
    }

    writeRoutesToFile(routes);

    console.log('Routes written to routes.txt');
}

generateRoutes();