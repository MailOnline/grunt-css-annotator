grunt-css-annotator
===================

This module contains a couple of grunt task useful for optimizing the css for the critical path.


## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-css-annotator --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-css-annotator');
```

css-annotator
-------------
This grunt task reads a group of css files and collects all the selectors used. Then it checks which of these selectors are used in the pages listed. After that it writes all the css in a folder adding a label next to each css rule used.
It uses Phantomjs to scan the webpages so it detects any markup added by Javascript (3 seconds after onDomContentLoaded).

This is an example of the options

    "css-annotator": {
        dist:{
            src: 'css/**/*.css',
            dest: 'annotated/',
            label: 'used',
            override: false,
            urls: [
                'http://www.example.com/page1.html',
                'http://www.example.com/page2.html',
                'http://www.example.com/page3.html',
            ]
        }
    }

This is an example of the annotation (there may be more than one label and they can be edited by hand):

    a{
        /*labels:used,article*/
        color: red;
    }

    a.special{
        /*labels:article*/
        color: green;
    }

##Options

* __src__: a group of css. You can use the grunt [globbing syntax](http://gruntjs.com/configuring-tasks#globbing-patterns)
* __dest__: a folder where the resulting css are written
* __label__: this label is added to any css rule that is used 
* __override__: (default false) if there is already a label annotated it doesn't change this label, just updates the empty ones
* __urls__ an array of urls to parse against the selector extracted from the css


css-annotator-filter
--------------------
This grunt task filters a css removing the rules annotated with the syntax used by the previous task.

    "css-annotator-filter": {
        dist:{
            src: 'css/**/*.css',
            dest: 'filtered/',
            with_label: ['used'],
            without_label: ['foo', 'bar'],
        }
    }

##Options

* __src__: a group of css. You can use the grunt [globbing syntax](http://gruntjs.com/configuring-tasks#globbing-patterns)
* __dest__: a folder where the resulting css are written
* __with_label__: any css rules containing one of these label will be removed
* __without_label__: any css rules that don't contain one of these label will be removed

Status
======
This package is considered experimental. Use it at your own risk !!!

Credits
=======
Many thanks to the Mailonline who sponsored this project and allowed an open source release.
This project uses [GRUNT](http://gruntjs.com/) and [REWORK](https://github.com/reworkcss/rework)