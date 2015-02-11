var intersection = require('lodash.intersection');
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
module.exports = function(points) {
    return languages.map(function(language) {
        var exemplarCharacters = language.codepoints.exemplarCharacters;
        var coveredCharacters = intersection(exemplarCharacters, points);
        return {
            name: language.name,
            id: language.name,
            ratio: coveredCharacters.length  / exemplarCharacters.length,
            count: coveredCharacters.length,
            total: exemplarCharacters.length
        };
    });
};
