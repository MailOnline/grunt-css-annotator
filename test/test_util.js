var assert = require("assert");
var util = require('../lib/util');
var Set = require('../lib/set');

var rework = require('rework');
var fs = require('fs');
var path = require('path');

var cssfile = path.join(__dirname,'annotate_css','test.css');
var css = fs.readFileSync(cssfile, "utf8");


describe('Util', function(){

    describe('flatten', function(){

        it('should flatten an array', function(){
            var a = util.flatten([[1,2],[3],[4]]);
            assert.equal(a.length, 4);
            assert.equal(a[0], 1);
            assert.equal(a[1], 2);
            assert.equal(a[2], 3);
            assert.equal(a[3], 4);
        });

        it('should flatten an array (empty ones)', function(){
            var a = util.flatten([[],[3],[]]);
            assert.equal(a.length, 1);
            assert.equal(a[0], 3);
        });      
    });

    describe('getSelectors', function(){

        it('should extract some selectors', function(){
            var s = util.getSelectors([
                {
                    name: 'test',
                    ast: rework(css, { source: cssfile })
                }
            ]);
            assert.equal(s[0], 'a');
            assert.equal(s[1], 'span');
            assert.equal(s[2], '.hello');
        });      
    });
    describe('union', function(){
        it('should calculate the union', function(){
            var s0 = [new Set(['1','2','3']), new Set(['3','4','5'])];
            var s = util.union(s0);

            assert(s.has('1'));
            assert(s.has('2'));
            assert(s.has('3'));
            assert(s.has('4'));
            assert(s.has('5'));
        });      
    });

    describe('intersection', function(){
        it('should calculate the intersection', function(){
            var s0 = [new Set(['1','2','3', '4']), new Set(['3','4','5'])];
            var s = util.intersection(s0);

            assert(!s.has('1'));
            assert(!s.has('2'));
            assert(s.has('3'));
            assert(s.has('4'));
            assert(!s.has('5'));
        });      
    });


});
