module.exports = {};

var flatten = module.exports.flatten = function (arr){
    return arr.reduce(function(a, b) {
        return a.concat(b);
    }, []);
};

var notEmpty = module.exports.notEmpty = function (item){
    return !!item;
};

module.exports.getSelectors = function(asts){
    var selectors = asts.map(function (o){
        return o.ast.obj.stylesheet.rules.map(function (r){
            if (!r.selectors) return;
            return r.selectors.join(',');
        });
    });

    selectors = selectors.filter(notEmpty);
    selectors = flatten(selectors).filter(notEmpty);

    return selectors;  
};