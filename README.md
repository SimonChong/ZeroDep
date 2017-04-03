# ZeroDep

[![Build Status](https://travis-ci.org/SimonChong/ZeroDep.svg?branch=master)](https://travis-ci.org/SimonChong/ZeroDep)

A simple Zero Dependency, dependency management framework

## Problem - What problem does this solve?

Many JavaScript web dependency frameworks require you to have the framework loaded before doing ANYTHING. This framework and "method" does not require code to be run in ANY particular order. That means you could have this library loaded last and still have everything run in the right order. 

+ This is particular useful if you simply concatenate and minify JS files together without regard for ordering.
+ Also useful if you have no control of where and when JS code runs.
  - Many large organisations have lots of different groups that edit and maintain different parts of a page. This approach helps unify JS into a common framework slowly over time.
