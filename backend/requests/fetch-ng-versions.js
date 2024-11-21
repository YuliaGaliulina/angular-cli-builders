const { get } = require('axios');

const fetchNgVersions = async () => {
    try {
        const response = await get('https://registry.npmjs.org/@angular/cli');

        const distTags = response.data['dist-tags'];
        const lts = Object.entries(distTags)
            .filter(([tag]) => tag.includes('-lts'))
            .map(([, version]) => version)
            .filter((version) => version.split('.')[0] >= 12);

        const allLatestVersions = [...lts, distTags['latest']];

        return allLatestVersions
            .map((version) => ({
                version,
                majorVersion: version.split('.')[0]
            }))
            .sort((a, b) => b.majorVersion - a.majorVersion);

    } catch (error) {
        console.error('Failed to fetch data');
        return [];
    }
}

module.exports = fetchNgVersions;
