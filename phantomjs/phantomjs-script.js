var system = require('system');
var out = [];

var input = JSON.parse(system.stdin.read());

var urls = input.urls;
var selectors = input.selectors;

for (var i = 0; i < urls.length; i++){

    (function (url){
        var page = require('webpage').create();

        page.onInitialized = function() {

            page.evaluate(function(selectors) {
                document.addEventListener('DOMContentLoaded', function() {

                    function removePseudoClasses(s){ // remove :after, :hover etc.
                        return s.replace(/:{1,2}[^ ,]*/, '');
                    }

                    setTimeout(function (){

                        var used_selectors = [];
                        var unused_selectors = [];

                        selectors.forEach(function (sel){
                            var nodes;
                            try{
                                nodes = document.querySelectorAll(removePseudoClasses(sel));
                            }
                            catch (e){
                                nodes = [];
                            }

                            if (nodes.length){
                                used_selectors.push(sel)
                            }
                            else {
                                unused_selectors.push(sel)                
                            }

                        });
                        window.callPhantom(used_selectors);

                    }, 3000);
                }, false);

            }, selectors);
        };

        page.onCallback = function(data) {
            // console.log(data);
            out.push({url: url, sel: data});
            if (out.length === urls.length){
                system.stdout.writeLine('results:' + JSON.stringify(out));
                phantom.exit(0);
            }
        };

        page.open(url);    

    }(urls[i]));

}

