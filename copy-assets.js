const fs = require('fs');
const path = require('path');

function copyFolderSync(from, to) {
    if (!fs.existsSync(to)) {
        fs.mkdirSync(to, { recursive: true });
    }
    fs.readdirSync(from).forEach(element => {
        if (fs.lstatSync(path.join(from, element)).isFile()) {
            fs.copyFileSync(path.join(from, element), path.join(to, element));
            console.log(`Copied: ${element}`);
        } else {
            copyFolderSync(path.join(from, element), path.join(to, element));
        }
    });
}

const srcDir = path.join(__dirname, 'src', 'migrations');
const distDir = path.join(__dirname, 'dist', 'migrations');

if (fs.existsSync(srcDir)) {
    console.log(`Copying migrations from ${srcDir} to ${distDir}...`);
    copyFolderSync(srcDir, distDir);
    console.log('Migrations copied successfully.');
} else {
    console.log('No migrations folder found in src.');
}
