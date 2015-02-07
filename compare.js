var _ = require('lodash'),
	fs = require('fs');

var arialUnicode = {};
arialUnicode.name = 'Arial Unicode';
arialUnicode.cp = require('./arial_unicode.json');

var lato = {};
lato.name = 'Lato';
lato.cp = require('./lato.json');

var fonts = [];
fonts[0] = arialUnicode;
fonts[1] = lato;

var allLangs = require('./output.json');
//var allLangs = JSON.parse(fs.readFileSync('output.json'));
// What's the difference between this ^ and require?

// Array of all the languages we're checking font coverage against
var langNames = Object.getOwnPropertyNames(allLangs);

// Loop through each font
for (i = 0; i < fonts.length; i++) {
	var supportedCp = {};
	console.log('\n' + fonts[i].name.toUpperCase() + '\n');
	// Loop through each language
	for (j = 0; j < langNames.length; j++) {
		// Compare exemplarCharacters array in language with font array
		supportedCp[langNames[j]] = (_.intersection(allLangs[langNames[j]].exemplarCharacters, fonts[i].cp));
		// Data for name of en-HK, en-IN, en-001 not available in original download from Unicode
		// so using the language code for these instead of name
		if (allLangs[langNames[j]].name === undefined) {
			// output % of each language covered by font
			console.log(langNames[j] + ': ' + Math.round(supportedCp[langNames[j]].length / allLangs[langNames[j]].exemplarCharacters.length * 100) + '%');
		} else {
			// Output % of each language covered by font
			console.log(allLangs[langNames[j]].name + ': ' + Math.round(supportedCp[langNames[j]].length / allLangs[langNames[j]].exemplarCharacters.length * 100) + '%');
		}
	}
}



