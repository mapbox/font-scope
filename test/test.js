var test = require('tape'),
    fs = require('fs'),
    fontScope = require('../');

function fixture(t, name) {
    var input = JSON.parse(fs.readFileSync(__dirname + '/' + name));
    var output = fontScope(input);
    if (process.env.UPDATE) {
        fs.writeFileSync(
            __dirname + '/' + name + '.output.json',
            JSON.stringify(output, null, 2));
    }
    t.deepEqual(output, 
        JSON.parse(fs.readFileSync(__dirname + '/' + name + '.output.json')), name);
}

test('fontscope', function(t) {
    fixture(t, 'lato.json');
    fixture(t, 'arial_unicode.json');
    t.end();
});
