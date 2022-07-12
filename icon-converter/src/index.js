const sharp = require('sharp');
const fs = require('fs');
const process = require('process');
const { JSDOM } = require('jsdom');
const { program } = require('commander');
const path = require('path');

const encoding = 'utf-8';
const contentType = 'image/svg+xml';
const antdPath = require.resolve('@ant-design/icons-svg');

program
    .requiredOption('--output <string>')
    .option('--input <string>');

program.parse(process.argv);

const {
    input: inputName,
    output: outputName,
} = program.opts();


let themePath = path.resolve(
    antdPath,
    '../../inline-namespaced-svg',
    'outlined',
    `${inputName}.svg`,
);
let svgContent = fs.readFileSync(themePath, encoding);

const dom = new JSDOM();
const parser = new dom.window.DOMParser();
const doc = parser.parseFromString(svgContent, contentType);
const svgElement = doc.documentElement;


let result = sharp(Buffer.from(svgElement.outerHTML, encoding)).resize({
    fit: 'contain',
    background: 'transparent',
});

result.toFile(outputName, function (err) {
    if (err) {
        process.exit(1);
    }
});