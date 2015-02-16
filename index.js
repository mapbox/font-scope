var difference = require('lodash.difference');
var languages = require('./language_codepoints.json');

/**
 * Analyze a font's coverage across languages
 *
 * Analysis results include:
 *
 * ```js
 * {
 *   name: 'English font name'
 *   id: 'Unicode font code'
 *   ratio: // percentage coverage as number from 0 to 1
 *   count: // codepoints in this font for this language
 *   total: // codepoints in this language
 * }
 * ```
 *
 * @alias fontScope
 * @param {Array} points an array of codepoints covered by a given font,
 * as an array of integers
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
            total: exemplarCharacters.length,
            count: coverages.reduce(function(sum, v) { return sum + v; }, 0),
            coverages: coverages
        };
    });
};
