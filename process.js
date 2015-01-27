var fs = require('fs'),
    glob = require('glob');

var languages = {};
glob.sync('json/main/*/characters.json').map(function(f) {
    var data = JSON.parse(fs.readFileSync(f));
    var languageCode = Object.keys(data.main)[0];
    // remove "[" and "]" from character list
    var charList = data.main[languageCode].characters.exemplarCharacters.slice(1, -1);
	var characters = charList.split(' ');
	var codePoints = characters.map(function(x) {
		return x.charCodeAt(0);
	});

    languages[languageCode] = codePoints;
});
console.log(languages);
fs.writeFileSync('output.json', JSON.stringify(languages, null, 2));

