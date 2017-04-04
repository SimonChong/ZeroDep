# ZeroDep

[![Build Status](https://travis-ci.org/SimonChong/ZeroDep.svg?branch=master)](https://travis-ci.org/SimonChong/ZeroDep)

A simple Zero Dependency, dependency management framework

## Problem - What problem does this solve?

Many JavaScript web dependency frameworks require you to have the framework loaded before doing ANYTHING. This framework and "method" does not require code to be run in ANY particular order. That means you could have this library loaded last and still have everything run in the right order.

+ This is particular useful if you simply concatenate and minify JS files together without regard for ordering.
+ Also useful if you have no control of where and when JS code runs.
  - Many large organizations have lots of different groups that edit and maintain different parts of a page. This approach helps unify JS into a common framework slowly over time.

## Getting Started

### Step 0. Download ZeroDep

Download and place the ZeroDep JavaScript library somewhere accessible via the web.

### Step 1. Include the ZeroDep JavaScript somewhere in your pages.

All dependancies and code requiring dependancies will be run after ZeroDep has run (code can of course be placed and loaded before). So if you want code to run in the HEAD html tag ZeroDep needs to load and run in the HEAD html tag.

Via HTML Script tag

```html
<script src="zerodep.js"></script>
```

OR

```html
<script src="zerodep.js" async></script>
```

OR

*Copy and paste the code into your script files or inline it in a script block in the HTML*


### Step 2. Start using Zero Dep


#### Defining dependancies

```javascript
(window.ZDQ = window.ZDQ || []).push(function(zd) {
  zd.def("NameOfDependency", function() {
    return "ArgumentToExpose";
  });
});
```

OR (if you know the zero dep lib has loaded)

```javascript
zd.def("NameOfDependency", function() {
	return "ArgumentToExpose";
});
```

#### Requiring dependancies

```javascript
(window.ZDQ = window.ZDQ || []).push(function(zd) {
  zd.req("Dependency", function(fromDefine) {
    //Do you stuff
  });
});
```

Requiring multiple dependancies

```javascript
(window.ZDQ = window.ZDQ || []).push(function(zd) {
  zd.req(["Dependency1","Dependency2"], function(fromDep1, fromDep2) {
    //Do you stuff
  });
});
```

OR (if you know the zero dep lib has loaded)

```javascript
zd.req("Dependency", function(fromDefine) {
  //Do you stuff
});
```
Requiring multiple dependancies

```javascript
zd.req(["Dependency1","Dependency2"], function(fromDep1, fromDep2) {
  //Do you stuff
});
```

#### Requiring and Defining dependancies together
