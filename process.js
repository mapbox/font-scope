var fs = require('fs'),
    glob = require('glob');

// Hello! intent here is
//
// * parse the json in each 'characters' file
// * take the string at data.main[language].characters.exemplarCharacters,
//   split it by spaces, figure out the char code at each point,
//   and end up with something like
//
// { en: [1,2,3,4] }
//
// in which the key is the language type and the array is an array
// of numbers representing unicode points
var languages = {};
glob.sync('json/main/*/characters.json').map(function(f) {
    var data = JSON.parse(fs.readFileSync(f));
    var languageCode = Object.keys(data.main)[0];
    languages[languageCode] = [];
});
console.log(languages);
