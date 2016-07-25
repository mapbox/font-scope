var difference = require('lodash.difference');
var languages = require('./language_codepoints.json');

/**
 * Analyze a font's coverage across languages
 *
 * Analysis results include:
 *
 * ```js
 * {
 *   name: 'English',    // English font name
 *   id: 'en',           // Unicode font code
 *   coverages: [26, 0], // array of how many codepoints are covered by each points
 *   count: 26,          // codepoints in this font for this language
 *   total: 26           // codepoints in this language
 * }
 * ```
 *
 * @alias fontScope
 * @param {Array<Array>} points_array an array of arrays of codepoints, corresponding
 * to the coverage of multiple fonts.
 * @returns {Object} analysis
 */
module.exports = function(points_array) {
    return languages.map(function(language) {
        var exemplarCharacters = language.codepoints.exemplarCharacters,
            charactersLeft = exemplarCharacters,

        coverages = points_array.map(function(points) {
            var nextValue = difference(charactersLeft, points),
                covered = charactersLeft.length - nextValue.length;
            charactersLeft = nextValue;
            return covered;
        });

        return {
            name: language.name,
            id: language.id,
            total: exemplarCharacters.length,
            count: coverages.reduce(function(sum, v) { return sum + v; }, 0),
            coverages: coverages
        };
    });
};
