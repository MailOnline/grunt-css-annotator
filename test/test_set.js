var Set = require('../lib/set');

var assert = require("assert")

describe('Set', function(){

    describe('set creation', function(){
        it('create', function(){
            var s = new Set(['1','2','3']);
            assert(s.has('1'));
            assert(!s.has('4'));
        });
        it('create and add', function(){
            var s = new Set();
            s.add(['1','2','3']);
            assert(s.has('1'));
        });
        it('create and add 2', function(){
            var s = new Set();
            s.add(['1']);
            s.add(['3']);
            s.add('2');
            assert(s.has('1'));
            assert(s.has('2'));
            assert(s.has('3'));
        });
        it('add and remove', function(){
            var s = new Set(['1','2','3']);
            s.remove(['1']);
            s.remove('3');
            assert(!s.has('1'));
            assert(s.has('2'));
            assert(!s.has('3'));
        });
        it('union', function(){
            var s0 = new Set(['1','2','3']);
            var s = s.union(new Set(['3','4','5']));

            assert(s.has('1'));
            assert(s.has('2'));
            assert(s.has('3'));
            assert(s.has('4'));
            assert(s.has('5'));
        });
        it('intersection', function(){
            var s0 = new Set(['1','2','3','4']);
            var s = s.union(new Set(['3','4','5']));

            assert(!s.has('1'));
            assert(!s.has('2'));
            assert(s.has('3'));
            assert(s.has('4'));
            assert(!s.has('5'));
        });
    });

});