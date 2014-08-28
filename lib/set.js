module.exports = Set;

function Set(arr) {
    if (arr){
        this.add(arr);
    }
    this.dict = {};
}

Set.prototype.add = function (arr){
    for (var i=0;i < arr.length;i++){
        this.dict[arr[i]] = true;
    }
}

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

Set.prototype.toArray = function (){
    var out = [];
    for (var attrname in this.dict){
        out.push(attrname);
    }
    return out;
};

Set.prototype.toString = function (){
    return this.toArray().toString();
};

Set.prototype.length = function (){
    return this.toArray().length;
};
