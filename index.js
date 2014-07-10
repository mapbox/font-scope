#!/usr/bin/env node

var concat = require('concat-stream');
var colors = require('colors');

var input = process.stdin.pipe(concat(function(buf) {
    var data = JSON.parse(buf);
    data.forEach(function(face) {
        console.log(face.face);
        console.log('----------------');
        rangeCoverage(face.coverage);
    });
}));

function rangeCoverage(points) {
    var ranges = require('./data/ranges.json');
    ranges.forEach(function(r) {
        r.end = parseInt(r.end, 16);
        r.start = parseInt(r.start, 16);
        r.count = r.end - r.start;
        r.done = 0;
    });
    for (var i = 0; i < points.length; i++) {
        for (var r = 0; r < ranges.length; r++) {
            if (points[i] >= ranges[r].start && points[i] < ranges[r].end) {
                ranges[r].done++;
                break;
            }
        }
    }
    ranges.forEach(function(r) {
        var score = ((r.done / r.count) * 100);
        var grade = 'grey';
        if (score > 0) grade = 'red';
        if (score > 80) grade = 'green';
        console.log((r.name + ': ' + score.toFixed(2) + '%')[grade]);
    });
}
