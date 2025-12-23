/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const experimentName = process.argv[2];

if (!experimentName) {
    console.error("Please provide an experiment name, e.g., 'npm run delete:experiment fluid-sim'");
    process.exit(1);
}

const safeName = experimentName.toLowerCase().replace(/[^a-z0-9-]/g, '-');
const baseDir = path.join(__dirname, '../src/app/experiments');
const groupDir = path.join(baseDir, `(${safeName})`);

if (!fs.existsSync(groupDir)) {
    console.error(`Experiment "${safeName}" does not exist at ${groupDir}`);
    process.exit(1);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question(`Are you sure you want to delete the experiment "${safeName}"? This action cannot be undone. (y/N) `, (answer) => {
    if (answer.toLowerCase() !== 'y') {
        console.log('Deletion cancelled.');
        rl.close();
        process.exit(0);
    }

    // 1. Delete the directory
    try {
        fs.rmSync(groupDir, { recursive: true, force: true });
        console.log(`Deleted directory: ${groupDir}`);
    } catch (err) {
        console.error(`Error deleting directory: ${err.message}`);
        rl.close();
        process.exit(1);
    }

    // Check for and delete components directory
    const componentsDir = path.join(__dirname, '../src/components/experiments', safeName);
    if (fs.existsSync(componentsDir)) {
        try {
            fs.rmSync(componentsDir, { recursive: true, force: true });
            console.log(`Deleted components directory: ${componentsDir}`);
        } catch (err) {
            console.warn(`Warning: Could not delete components directory: ${err.message}`);
        }
    }

    // 2. Remove from homepage
    const homePagePath = path.join(__dirname, '../src/app/(main)/page.tsx');
    if (fs.existsSync(homePagePath)) {
        try {
            let homeContent = fs.readFileSync(homePagePath, 'utf8');

            // Regex to find the object entry in the experiments array
            // Matches: { title: "...", description: "...", href: "/experiments/safeName" },
            // We are lenient with whitespace
            const entryRegex = new RegExp(`\\s*\\{[^}]*href:\\s*["']/experiments/${safeName}["'][^}]*\\},?`, 'g');

            if (entryRegex.test(homeContent)) {
                homeContent = homeContent.replace(entryRegex, '');
                // Clean up potentially leftover blank lines or commas could be tricky, 
                // but removing the whole object block usually leaves acceptable formatting or Prettier fixes it.

                fs.writeFileSync(homePagePath, homeContent, 'utf8');
                console.log(`Removed "${safeName}" from homepage experiment list.`);
            } else {
                console.warn(`Could not find entry for "${safeName}" in homepage. Manual cleanup might be required.`);
            }
        } catch (err) {
            console.error(`Error updating homepage: ${err.message}`);
        }
    }

    console.log(`\nExperiment "${safeName}" deleted successfully.`);
    rl.close();
});
