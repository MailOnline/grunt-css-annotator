var Set = require('../lib/set');
var plugins = require('../lib/rework_plugins');
var rework = require('rework');
var fs = require('fs');

var assert = require("assert")

var cssfile = 'test.css';
var css = fs.readFileSync(cssfile);

var cssresult1 = 'test_result1.css';
var css_result1 = fs.readFileSync(cssresult1);

var cssresult2 = 'test_result2.css';
var css_result2 = fs.readFileSync(cssresult2);

describe('rework getAnnotator', function(){

    describe('', function(){
        var reworkInst;
        
        beforeEach(function(){
            reworkInst = rework(css, { source: cssfile });
        });

        it('annotate', function(){
            var annotator = plugins.getAnnotator(new Set(['a','.hello']), 'newlabel');
            reworkInst.use(annotator);
            reworkInst.toString();
            assert.equal();
        });
    });

});