var Set = require('../lib/set');
var plugins = require('../lib/rework_plugins');
var rework = require('rework');
var fs = require('fs');
var path = require('path');

var assert = require("assert")


describe('rework plugins', function(){

    describe('getAnnotator', function(){
        var reworkInst;
        var cssfile = path.join(__dirname,'annotate_css','test.css');
        var css = fs.readFileSync(cssfile, "utf8");

        var cssresult1 = path.join(__dirname,'annotate_css','test_result1.css');
        var css_result1 = fs.readFileSync(cssresult1, "utf8");

        var cssresult2 = path.join(__dirname,'annotate_css','test_result2.css');
        var css_result2 = fs.readFileSync(cssresult2, "utf8");
        
        beforeEach(function(){
            reworkInst = rework(css, { source: cssfile });
        });

        it('annotate', function(){
            var annotator = plugins.getAnnotator(new Set(['.hello','span']), 'newlabel');
            reworkInst.use(annotator);
            var s = reworkInst.toString();
            assert.equal(s, css_result1);
        });

        it('annotate override', function(){
            var annotator = plugins.getAnnotator(new Set(['.hello','span']), 'newlabel', true);
            reworkInst.use(annotator);
            var s = reworkInst.toString();
            assert.equal(s, css_result2);
        });

    });

    describe('getFilterByAnnotation', function(){
        var reworkInst;
        var cssfile = path.join(__dirname,'filter_css','test.css');
        var css = fs.readFileSync(cssfile, "utf8");

        var cssresult1 = path.join(__dirname,'filter_css','test_result1.css');
        var css_result1 = fs.readFileSync(cssresult1, "utf8");

        var cssresult2 = path.join(__dirname,'filter_css','test_result2.css');
        var css_result2 = fs.readFileSync(cssresult2, "utf8"); 

        var cssresult3 = path.join(__dirname,'filter_css','test_result3.css');
        var css_result3 = fs.readFileSync(cssresult3, "utf8"); 

        beforeEach(function(){
            reworkInst = rework(css, { source: cssfile });
        });

        it('filter for label', function(){
            var filter = plugins.getFilterByAnnotation(new Set(['newlabel']));
            reworkInst.use(filter);
            var s = reworkInst.toString();
            assert.equal(s, css_result1);
        });

        it('filter for 2 labels', function(){
            var filter = plugins.getFilterByAnnotation(new Set(['newlabel', 'old']));
            reworkInst.use(filter);
            var s = reworkInst.toString();
            assert.equal(s, css_result2);
        });

        it('filter for label not found', function(){
            var filter = plugins.getFilterByAnnotation(undefined, new Set(['newlabel']));
            reworkInst.use(filter);
            var s = reworkInst.toString();
            assert.equal(s, css_result3);
        });

    });

});