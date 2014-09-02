var assert = require("assert");
var util = require('../lib/util');
var rework = require('rework');
var fs = require('fs');

var cssfile = 'test.css';
var css = fs.readFileSync(cssfile);


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
            var s = util.getSelector([
                {
                    name: 'test',
                    asts: rework(css, { source: cssfile })
                }
            ]);
            assert.equal(s[0], 'a');
            assert.equal(s[1], 'span');
            assert.equal(s[3], '.hello');
        });      
    });
});
