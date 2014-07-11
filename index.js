#!/usr/bin/env node

var concat = require('concat-stream');
var colors = require('colors');

module.exports.rangeCoverage = function(points) {
    var ranges = require(__dirname + '/data/ranges.json');
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
    return ranges.map(function(r) {
        var score = ((r.done / r.count) * 100);
        return {
            name: r.name,
            score: score
        };
    });
};
