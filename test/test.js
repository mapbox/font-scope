var test = require('tape'),
    fs = require('fs'),
    fontScope = require('../');

function fixture(t, name) {
    var input = name.map(function(n) {
        return JSON.parse(fs.readFileSync(__dirname + '/' + n));
    });
    var output = fontScope(input);
    if (process.env.UPDATE) {
        fs.writeFileSync(
            __dirname + '/' + name.join(',') + '.output.json',
            JSON.stringify(output, null, 2));
    }
    t.deepEqual(output,
        JSON.parse(fs.readFileSync(__dirname + '/' + name.join(',') + '.output.json')), name.join(','));
}

test('fontscope', function(t) {
    fixture(t, ['lato.json']);
    fixture(t, ['arial_unicode.json']);
    fixture(t, ['lato.json', 'arial_unicode.json']);
    fixture(t, ['arial_unicode.json', 'lato.json']);
    t.end();
});
