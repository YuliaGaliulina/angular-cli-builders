const fs = require('fs');
const path = require('path');
const fetchNgVersions = require('../requests/fetch-ng-versions');
const fetchBuildersForVersion = require('../requests/fetch-builders');
const fetchSchema = require('../requests/fetch-schema');

/**
 * Deletes all contents of a folder, if it exists.
 * @param {string} folderPath - The path to the folder to clean.
 */
const cleanFolder = (folderPath) => {
    if (fs.existsSync(folderPath)) {
        fs.readdirSync(folderPath).forEach((file) => {
            const filePath = path.join(folderPath, file);
            if (fs.lstatSync(filePath).isDirectory()) {
                cleanFolder(filePath); // Recursively clean subdirectories
            } else {
                fs.unlinkSync(filePath); // Delete files
            }
        });
        console.log(`Cleaned folder: ${folderPath}`);
    }
};

/**
 * Fetches and writes schemas for each builder.
 * @param {string} version - The full version string (e.g., '15.2.0').
 * @param {string} versionDir - The directory for the current version (e.g., `public/builders/v15`).
 * @param {Array} builders - List of builders from builders.json.
 */
const fetchAndWriteSchemas = async (version, versionDir, builders) => {
    const schemaDir = path.join(versionDir, 'schema');

    // Ensure the schema folder exists and clean it
    if (!fs.existsSync(schemaDir)) {
        fs.mkdirSync(schemaDir, { recursive: true });
        console.log(`Created schema folder: ${schemaDir}`);
    } else {
        cleanFolder(schemaDir);
    }

    // Fetch and write each schema with retries
    for (const { title, schemaUrl } of builders) {
        try {
            const schema = await fetchSchema(version, title, schemaUrl);
            const schemaFilePath = path.join(schemaDir, `${title}.json`);
            fs.writeFileSync(schemaFilePath, JSON.stringify(schema, null, 2));
            console.log(`Written schema for builder ${title} in ${schemaFilePath}`);
        } catch (error) {
            console.error(`Final failure fetching or writing schema for builder ${title}:`, error);
        }

        // Throttle requests to avoid rate limits
        await delay(2000); // Adjust delay time as needed
    }
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Creates a folder for a given version inside the builders directory and writes fetched builders and schemas.
 * @param {string} version - The full version string (e.g., '15.2.0').
 * @param {string} majorVersion - The major version (e.g., '15').
 * @param {string} baseDir - The base directory for the builders.
 */
const createVersionFolder = async (version, majorVersion, baseDir) => {
    const versionDir = path.join(baseDir, `v${majorVersion}`);

    // Ensure the directory exists and clean it
    if (!fs.existsSync(versionDir)) {
        fs.mkdirSync(versionDir, { recursive: true });
        console.log(`Created folder: ${versionDir}`);
    } else {
        cleanFolder(versionDir); // Clean existing folder contents
    }

    // Fetch builders for the given version
    const builders = await fetchBuildersForVersion(version);

    // Write the builders.json file in the version-specific folder
    const buildersFilePath = path.join(versionDir, 'builders.json');
    fs.writeFileSync(buildersFilePath, JSON.stringify(builders, null, 2));
    console.log(`Written builders.json for version ${version} in ${versionDir}`);

    // Fetch and write schemas for each builder
    await fetchAndWriteSchemas(version, versionDir, builders);
};

/**
 * Fetches Angular versions and returns them.
 */
const writeNgVersionsToFile = async () => {
    try {
        console.log('Fetching Angular versions...');
        const versions = await fetchNgVersions();

        if (versions.length === 0) {
            console.error('No versions fetched. Exiting.');
            return [];
        }

        console.log('Angular versions fetched successfully.');
        return versions;
    } catch (error) {
        console.error('Error occurred while fetching Angular versions:', error);
        return [];
    }
};

/**
 * Main function to orchestrate the fetching and folder creation.
 */
const main = async () => {
    const buildersBaseDir = path.join(__dirname, '../../frontend/public', 'builders');

    // Ensure the builders directory exists
    if (!fs.existsSync(buildersBaseDir)) {
        fs.mkdirSync(buildersBaseDir, { recursive: true });
    }

    // Fetch Angular versions
    const versions = await writeNgVersionsToFile();

    // Create folders and fetch builders and schemas for each version
    for (const { version, majorVersion } of versions) {
        await createVersionFolder(version, majorVersion, buildersBaseDir);
    }

    console.log('All folders, builders, and schemas have been successfully created!');
};

// Call the main function
main();