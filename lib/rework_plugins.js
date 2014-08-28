var Set = require('./set')

function readLabels(s){
    var re = /^labels:(.*)/;
    var g = s.match(re);
    if (!g) return null;
    var arr = g[1].split(',').map(function (l){
        return l.trim();
    }).filter(function (l){
        return l.length;
    });
    return new Set(arr);
}

function writeLabels(set){
    return "labels:" + set.toString();
}

module.exports = {};

module.exports.getAnnotator = function (selectorSet, label, doOverrideLabels){
    return function (ast, reworkInstance){
        ast.rules.forEach(function (r){
            if (!r.selectors) return;
            var current_labels_set = new Set();

            var selectors = r.selectors.join(',');
            var comments_label = r.declarations.filter(function (d){ 
                return d.type === 'comment' && readLabels(d.comment) !== null;
            });

            // I don't want to override labels changed by hand
            if (comments_label.length && !doOverrideLabels){
                return;
            }

            // I'll change already existent labels
            if (comments_label.length){
                current_labels_set = readLabels(comments_label[0].comment);
            }

            if (selectorSet.has(selectors)){
                current_labels_set.add([label]);
            }

            // there are no previous labels and nothing to write.
            // no need to add one
            if (!comments_label.length && !current_labels_set.length()) return;

            // console.log(comments_label, current_labels_set.length())

            if (!comments_label.length){
                r.declarations.unshift({type: 'comment', comment: writeLabels(current_labels_set)});
            }
            else {
                comments_label[0].comment = {type: 'comment', comment: writeLabels(current_labels_set)};            
            }
        });

    };
};

module.exports.getFilterByAnnotation = function (with_labels_set, without_labels_sel){
    return function (ast, reworkInstance){
        ast.rules = ast.rules.filter(function (r){
            if (!r.selectors) return;
            var current_labels_set = new Set();

            var comments_label = r.declarations.filter(function (d){ 
                return d.type === 'comment' && readLabels(d.comment) !== null;
            });

            // I'll change already existent labels
            if (comments_label.length){
                current_labels_set = readLabels(comments_label[0].comment);
            }

            return current_labels_set.intersect(with_labels_set).length && without_labels_set.intersect(current_labels_set); 
        });
    };
};