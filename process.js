var fs = require('fs'),
    glob = require('glob');

/**
 * Process the unicode table data give to us by the unicode consortium
 * into a single JSON file with codepoints for different parts of each language
 * which we save as language_codepoints.json
 */

var languages = [];
var langNamesData = JSON.parse(fs.readFileSync('unicode-data/main/en/languages.json'));

var ignoreLanguages = ['root', 'en-001', 'en-AU', 'en-CA', 'en-GB', 'en-HK', 'en-IN', 'pt-PT'];

glob.sync('unicode-data/main/*/characters.json').map(function(f) {
    var data = JSON.parse(fs.readFileSync(f));
    var languageCode = Object.keys(data.main)[0];

    // ignore the root folder, which is not a language folder:
    if (ignoreLanguages.indexOf(languageCode) != -1) { return; }

    var allCodePoints = {};

    var charType = ['exemplarCharacters', 'auxiliary', 'index', 'punctuation'];

    // Function to create an array of code points for each charType of a lang:
    var codePointGroup = function(x) {
        // remove '[' and ']' from character lists:
        var charList = data.main[languageCode].characters[charType[x]].slice(1, -1);
        // remove '//' for now:
        if (charType[x] == 'punctuation') {
            charList = charList.replace(/(\\+)/g, function(m, a) {
                if (a.length === 2) {
                    return '\\';
                } else {
                    return '';
                }
            });
        }

        var characters = charList.split(' ');
        var codePoints = characters.map(function(x) {
            return x.charCodeAt(0);
        });
        return codePoints;
    };

    // Add keys for all the arrays of code points to a lang's object:
    for (i = 0; i < charType.length; i++) {
        allCodePoints[charType[i]] = codePointGroup(i);
    }

    // Add all the lang objects as keys to the top-level object:
    languages.push({
        id: languageCode,
        name: langNamesData.main.en.localeDisplayNames.languages[languageCode].replace('Norwegian', '').trim(),
        codepoints: allCodePoints
    });
});

fs.writeFileSync('language_codepoints.json', JSON.stringify(languages));
