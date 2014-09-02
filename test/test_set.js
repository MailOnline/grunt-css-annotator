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
            var s = s0.union(new Set(['3','4','5']));

            assert(s.has('1'));
            assert(s.has('2'));
            assert(s.has('3'));
            assert(s.has('4'));
            assert(s.has('5'));
        });
        it('intersection', function(){
            var s0 = new Set(['1','2','3','4']);
            var s = s0.intersection(new Set(['3','4','5']));

            assert(!s.has('1'));
            assert(!s.has('2'));
            assert(s.has('3'));
            assert(s.has('4'));
            assert(!s.has('5'));
        });
        it('is subset of', function(){
            var s0 = new Set(['1','2']);
            var s1 = new Set(['1','2','3']);
            var s2 = new Set(['2','3']);
            var s3 = new Set();

            assert(s0.isSubsetOf(s0));
            assert(s0.isSubsetOf(s1));
            assert(!s0.isSubsetOf(s2));
            assert(!s0.isSubsetOf(s3));

            assert(s1.isSubsetOf(s1));
            assert(!s1.isSubsetOf(s0));
            assert(!s1.isSubsetOf(s2));
            assert(!s1.isSubsetOf(s3));

            assert(s2.isSubsetOf(s2));
            assert(!s2.isSubsetOf(s0));
            assert(s2.isSubsetOf(s1));
            assert(!s2.isSubsetOf(s3));

            assert(s3.isSubsetOf(s3));
            assert(s3.isSubsetOf(s0));
            assert(s3.isSubsetOf(s1));
            assert(s3.isSubsetOf(s2));

        });
    });

});