const fs = require('fs');
const path = require('path');

const outputPath = 'dist';

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
}

console.log('Start building the exclusions list');

const banks = fs.readFileSync('exclusions/banks.txt').toString();
const firefox = fs.readFileSync('exclusions/firefox.txt').toString();
const sensitive = fs.readFileSync('exclusions/sensitive.txt').toString();

// common issues
const issues = fs.readFileSync('exclusions/issues.txt').toString();

// android-specific issues
const android = fs.readFileSync('exclusions/android.txt').toString();

// mac-specific issues
const mac = fs.readFileSync('exclusions/mac.txt').toString();

// windows-specific issues
const windows = fs.readFileSync('exclusions/windows.txt').toString();

const header = `//
// AdGuard HTTPS exclusions
// More information: https://github.com/AdguardTeam/HttpsExclusions
//`;

// Android (just a list)
const androidPath = path.join(outputPath, 'android_exclusions.txt');
const androidContents = `${header}\n${android}\n${banks}\n${firefox}\n${sensitive}\n${issues}`;
fs.writeFileSync(androidPath, androidContents);
console.log(`Android: ${androidPath}, ${androidContents.split('\n').length} lines.`);

// Windows (just a list)
const windowsPath = path.join(outputPath, 'windows_exclusions.txt');
const windowsContents = `${header}\n${windows}\n${banks}\n${firefox}\n${sensitive}\n${issues}`
    .split('\n')
    .filter((line) => {
        // Strip comments
        line = line.trim();
        if (!line || line.indexOf('//') !== -1) {
            return false;
        }
        return true;
    })
    .join('\n');

fs.writeFileSync(windowsPath, windowsContents);
console.log(`Windows: ${windowsPath}, ${windowsContents.split('\n').length} lines.`);

// Mac (prepare for a plist, strip comments)
const macContents = `${mac}\n${banks}\n${firefox}\n${sensitive}\n${issues}`
    .split('\n')
    .filter((line) => {
        // Strip comments
        line = line.trim();
        if (!line || line.indexOf('//') !== -1) {
            return false;
        }
        return true;
    })
    .map(line => {
        return `\t\t<string>${line}</string>`;
    })
    .join('\n');

const macPath = path.join(outputPath, 'mac_exclusions.txt');
fs.writeFileSync(macPath, macContents);
console.log(`Mac: ${macPath}, ${macContents.split('\n').length} lines.`);

console.log('Exclusions list are ready!');
