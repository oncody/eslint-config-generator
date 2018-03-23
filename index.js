const request = require('request-promise-native');
const eslintRuleRegex = /<td>\s*<p>\s*<a\s+href=".*">(.*)<\/a>\s*<\/p>\s*<\/td>/gm;

// other default levels are 'warn' and 'off'
const defaultLevel = 'error';

request('https://eslint.org/docs/rules/')
    .then(function (body) {
        let rules = '';

        rules += `'use strict';\n\n`;
        rules += 'module.exports = {\n';
        rules += '  rules: {\n';

        let match;
        while (match = eslintRuleRegex.exec(body)) {
            rules += `    '${match[1]}': ${defaultLevel},\n`;
        }

        rules += '  }\n';
        rules += '};\n';

        console.log(rules);
    })
    .catch(function (err) {
        console.log(err);
    });