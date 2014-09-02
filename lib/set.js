/*
deadly simple and minimal set of strings implementation
*/

module.exports = Set;

function Set(arr) {
    this.dict = {};
    if (arr){
        this.add(arr);
    }
}

Set.prototype.add = function (arr){
    if (typeof arr === 'string'){
        this.dict[arr] = true;
    } else {
        for (var i=0;i < arr.length;i++){
            this.dict[arr[i]] = true;
        }        
    }
};

Set.prototype.remove = function (arr){
    if (typeof arr === 'string'){
        this.dict[arr] && delete this.dict[arr];
    } else {
        for (var i=0;i < arr.length;i++){
            this.dict[arr] && delete this.dict[arr[i]];
        }        
    }
};


Set.prototype.has = function (s){
    return s in this.dict;
};

Set.prototype.union = function (s){
    var newset = new Set();
    for (var attrname in this.dict) {
        newset[attrname] = true;
    }
    for (var attrname in s.dict) {
        newset[attrname] = true;
    }
    return newset;
};

Set.prototype.intersection = function (s){
    var newset = new Set();
    for (var attrname in this.dict) {
        if (attrname in s.dict){
            newset[attrname] = true;    
        }        
    }
    return newset;
};

Set.prototype.toArray = function (sortFunc){
    var out = [];
    for (var attrname in this.dict){
        out.push(attrname);
    }
    out.sort(sortFunc);
    return out;
};

Set.prototype.toString = function (sortFunc){
    var arr = this.toArray(sortFunc);
    return arr.toString();
};

Set.prototype.length = function (){
    return this.toArray().length;
};
