var fs = require('fs'),
    glob = require('glob');

var languages = {};
glob.sync('json/main/*/characters.json').map(function(f) {
    var data = JSON.parse(fs.readFileSync(f));
    var languageCode = Object.keys(data.main)[0];

    // ignore the root folder, which is not a language folder
    if (languageCode == "root") {
    	return;
    }

    var charType = ["exemplarCharacters", "auxiliary", "index"];
    var codePointGroup = function(x) {
    // remove "[" and "]" from character list
    var charLists = data.main[languageCode].characters[charType[x]].slice(1, -1);
	var characters = charLists.split(' ');
	var codePoints = characters.map(function(x) {
		return x.charCodeAt(0);
	});	
	return codePoints;
	};

	var allCodePoints = {};
	for (i = 0; i < 3; i++) {
	allCodePoints[charType[i]]	= codePointGroup(i);
	};

    languages[languageCode] = allCodePoints; 
});
//console.log(languages);
fs.writeFileSync('output.json', JSON.stringify(languages, null, 2));

