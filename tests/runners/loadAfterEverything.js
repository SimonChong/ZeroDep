(function() {
	'use strict';

	QUnit.module('After Everything');
	// This file should run before the ZeroDep library

	QUnit.test('ZDQ loads and runs after everything', function(assert) {
		assert.expect(1);
		var done = assert.async();

		//Queue runs
		(window.ZDQ = window.ZDQ || []).push(function(zd) {
			assert.ok("RUN SOME CODE", "ZDQ runs");
			done();
		});
	});

	QUnit.test('should be able to "define" a function', function(assert) {
		assert.expect(1);
		var done = assert.async();

		//Define it!
		(window.ZDQ = window.ZDQ || []).push(function(zd) {
			zd.define("test1", function() {
				assert.ok("RUN SOME CODE", "Running code in a define block works");
				done();
				return "output1";
			});
		});
	});

	QUnit.test('should be able to "define" and "requre" functions', function(assert) {
		assert.expect(3);
		var done = assert.async();

		//Define and Require it
		(window.ZDQ = window.ZDQ || []).push(function(zd) {
			zd.define("test2", function() {
				assert.ok("RUN SOME CODE", "Defining a function as 'test2' works");
				return "output2";
			});
			zd.require("test2", function(fromDefine) {
				assert.ok("RUN SOME CODE", "Requiring 'test2' before running a function");
				assert.equal(fromDefine, "output2", "Argument reflects what was returned");
				done();
			});
		});
	});

	QUnit.test('should be able to "define" with multiple arguments and have them "requred"', function(assert) {
		assert.expect(7);
		var done = assert.async();

		//Define and Require it
		(window.ZDQ = window.ZDQ || []).push(function(zd) {
			zd.define("test2a", function() {
				assert.ok("RUN SOME CODE", "Defining a function as 'test2' works");
				return ["output0", "output1", "output2", "output3", "output4", "output4"];
			});
			zd.require("test2a", function(args) {
				assert.ok("RUN SOME CODE", "Requiring 'test2' before running a function");
				assert.equal(args[0], "output0", "Argument0 reflects what was returned in the defined");
				assert.equal(args[1], "output1", "Argument1 reflects what was returned in the defined");
				assert.equal(args[2], "output2", "Argument2 reflects what was returned in the defined");
				assert.equal(args[3], "output3", "Argument3 reflects what was returned in the defined");
				assert.equal(args[4], "output4", "Argument4 reflects what was returned in the defined");
				done();
			});
		});
	});

	QUnit.test('should be able to "require" something before "defining" it', function(assert) {
		assert.expect(3);
		var done = assert.async();

		//Require it!
		(window.ZDQ = window.ZDQ || []).push(function(zd) {
			zd.require("test3", function(fromDefine) {
				assert.ok("RUN SOME CODE", "Requiring 'test3' before it was defined. But it should run after");
				assert.equal(fromDefine, "SomethingNeeded", "Argument was what we required from test3");

				done();
			});
		});

		//Define it!
		(window.ZDQ = window.ZDQ || []).push(function(zd) {
			zd.define("test3", function() {
				assert.ok("RUN SOME CODE", "Defining 'test3'");
				return "SomethingNeeded";
			});
		});
	});

	QUnit.test('should be able to "require" multiple things', function(assert) {
		assert.expect(6);
		var done = assert.async();

		//Define it!
		(window.ZDQ = window.ZDQ || []).push(function(zd) {
			zd.define("test4A", function() {
				assert.ok("RUN SOME CODE", "Defining 'test3'");
				return "SomethingNeededA";
			});
		});

		//Define it!
		(window.ZDQ = window.ZDQ || []).push(function(zd) {
			zd.define("test4B", function() {
				assert.ok("RUN SOME CODE", "Defining 'test3'");
				return ["SomethingNeededB", "SomthingElse"];
			});
		});

		//Require it!
		(window.ZDQ = window.ZDQ || []).push(function(zd) {
			zd.require(["test4A", "test4B"], function(fromDefine1, fromDefine2) {
				assert.ok("RUN SOME CODE", "Running after 2 defines");
				assert.equal(fromDefine1[0], "SomethingNeededA", "Argument 0 was what we required from the first define");
				assert.equal(fromDefine2[0], "SomethingNeededB", "Argument 0 was what we required from the second define");
				assert.equal(fromDefine2[1], "SomthingElse", "Argument 1 was what we required from the second define");

				done();
			});
		});
	});

})();
