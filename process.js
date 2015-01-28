var fs = require('fs'),
    glob = require('glob');

var languages = {};
var langNamesData = JSON.parse(fs.readFileSync('json/main/en/languages.json'));
//console.log(langNamesData);

glob.sync('json/main/*/characters.json').map(function(f) {
    var data = JSON.parse(fs.readFileSync(f));
    var languageCode = Object.keys(data.main)[0];

    // ignore the root folder, which is not a language folder:
    if (languageCode == "root") {
    	return;
    };

    var allCodePoints = {};
    // Add the language's full name in English as the first key in a lang's object:
    allCodePoints["name"] = langNamesData.main.en.localeDisplayNames.languages[languageCode];
    
    var charType = ["exemplarCharacters", "auxiliary", "index", "punctuation"];

    // Function to create an array of code points for each charType of a lang:
    var codePointGroup = function(x) {
        // remove "[" and "]" from character lists:
        var charList = data.main[languageCode].characters[charType[x]].slice(1, -1);
        // remove "//" for now: 
        if (charType[x] == "punctuation") {
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
	}

    // Add keys for all the arrays of code points to a lang's object:
	for (i = 0; i < 4; i++) {
	   allCodePoints[charType[i]] = codePointGroup(i);
	};
    // Add all the lang objects as keys to the top-level object:
    languages[languageCode] = allCodePoints; 

});

fs.writeFileSync('output.json', JSON.stringify(languages, null, 2));

