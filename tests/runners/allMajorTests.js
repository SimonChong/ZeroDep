(function() {
	'use strict';

	QUnit.module('All Tests');
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
			zd.def("test1", function() {
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
			zd.def("test2", function() {
				assert.ok("RUN SOME CODE", "Defining a function as 'test2' works");
				return "output2";
			});
			zd.req("test2", function(fromDefine) {
				assert.ok("RUN SOME CODE", "Requiring 'test2' before running a function");
				assert.deepEqual(fromDefine, "output2", "Argument reflects what was returned");
				done();
			});
		});
	});

	QUnit.test('should be able to "define" with multiple arguments and have them "requred"', function(assert) {
		assert.expect(7);
		var done = assert.async();

		//Define and Require it
		(window.ZDQ = window.ZDQ || []).push(function(zd) {
			zd.def("test2a", function() {
				assert.ok("RUN SOME CODE", "Defining a function as 'test2' works");
				return ["output0", "output1", "output2", "output3", "output4", "output4"];
			});
			zd.req("test2a", function(args) {
				assert.ok("RUN SOME CODE", "Requiring 'test2' before running a function");
				assert.deepEqual(args[0], "output0", "Argument0 reflects what was returned in the defined");
				assert.deepEqual(args[1], "output1", "Argument1 reflects what was returned in the defined");
				assert.deepEqual(args[2], "output2", "Argument2 reflects what was returned in the defined");
				assert.deepEqual(args[3], "output3", "Argument3 reflects what was returned in the defined");
				assert.deepEqual(args[4], "output4", "Argument4 reflects what was returned in the defined");
				done();
			});
		});
	});

	QUnit.test('should be able to "require" something before "defining" it', function(assert) {
		assert.expect(3);
		var done = assert.async();

		//Require it!
		(window.ZDQ = window.ZDQ || []).push(function(zd) {
			zd.req("test3", function(fromDefine) {
				assert.ok("RUN SOME CODE", "Requiring 'test3' before it was defined. But it should run after");
				assert.deepEqual(fromDefine, "SomethingNeeded", "Argument was what we required from test3");

				done();
			});
		});

		//Define it!
		(window.ZDQ = window.ZDQ || []).push(function(zd) {
			zd.def("test3", function() {
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
			zd.def("test4A", function() {
				assert.ok("RUN SOME CODE", "Defining 'test3'");
				return "SomethingNeededA";
			});
		});

		//Define it!
		(window.ZDQ = window.ZDQ || []).push(function(zd) {
			zd.def("test4B", function() {
				assert.ok("RUN SOME CODE", "Defining 'test3'");
				return ["SomethingNeededB", "SomthingElse"];
			});
		});

		//Require it!
		(window.ZDQ = window.ZDQ || []).push(function(zd) {
			zd.req(["test4A", "test4B"], function(fromDefine1, fromDefine2) {
				assert.ok("RUN SOME CODE", "Running after 2 defines");
				assert.deepEqual(fromDefine1, "SomethingNeededA", "Argument 0 was what we required from the first define");
				assert.deepEqual(fromDefine2[0], "SomethingNeededB", "Argument 0 was what we required from the second define");
				assert.deepEqual(fromDefine2[1], "SomthingElse", "Argument 1 was what we required from the second define");

				done();
			});
		});
	});

	QUnit.test('should be able to "define" something while "require"ing something', function(assert) {
		assert.expect(5);
		var done = assert.async();

		//Define it!
		(window.ZDQ = window.ZDQ || []).push(function(zd) {
			zd.def("test6A", function() {
				assert.ok("RUN SOME CODE", "Defining 'test6A'");
				return "SomethingNeededA";
			});
		});

		//Define it!
		(window.ZDQ = window.ZDQ || []).push(function(zd) {
			zd.req("test6A", function(fromDefine1) {
				zd.def("test6B", function() {
					assert.ok("RUN SOME CODE", "Defining 'test6B'");
					return [fromDefine1, "SomethingNeededB"];
				});
			});
		});

		//Require it!
		(window.ZDQ = window.ZDQ || []).push(function(zd) {
			zd.req(["test6B"], function(fromDefine) {
				assert.ok("RUN SOME CODE", "Running after 2 defines");
				assert.deepEqual(fromDefine[0], "SomethingNeededA", "Argument 0 was what we required from the second define");
				assert.deepEqual(fromDefine[1], "SomethingNeededB", "Argument 1 was what we required from the second define");

				done();
			});
		});
	});

	QUnit.test('should be able to "reqDef" something', function(assert) {
		assert.expect(5);
		var done = assert.async();

		//Define it!
		(window.ZDQ = window.ZDQ || []).push(function(zd) {
			zd.def("test6A", function() {
				assert.ok("RUN SOME CODE", "Defining 'test6A'");
				return "SomethingNeededA";
			});
		});

		//Define it!
		(window.ZDQ = window.ZDQ || []).push(function(zd) {
			zd.reqDef("test6A", "test6B", function(fromDefine1) {
				assert.ok("RUN SOME CODE", "Defining 'test6B'");
				return [fromDefine1, "SomethingNeededB"];
			});
		});

		//Require it!
		(window.ZDQ = window.ZDQ || []).push(function(zd) {
			zd.req(["test6B"], function(fromDefine) {
				assert.ok("RUN SOME CODE", "Running after 2 defines");
				assert.deepEqual(fromDefine[0], "SomethingNeededA", "Argument 0 was what we required from the second define");
				assert.deepEqual(fromDefine[1], "SomethingNeededB", "Argument 1 was what we required from the second define");

				done();
			});
		});
	});

	QUnit.test('should be able to "reqDef" something, requiring multiple things', function(assert) {
		assert.expect(7);
		var done = assert.async();

		//Define it!
		(window.ZDQ = window.ZDQ || []).push(function(zd) {
			zd.def("test7A", function() {
				assert.ok("RUN SOME CODE", "Defining 'test7A'");
				return "SomethingNeededA";
			});
		});

		//Define it!
		(window.ZDQ = window.ZDQ || []).push(function(zd) {
			zd.def("test7B", function() {
				assert.ok("RUN SOME CODE", "Defining 'test7B'");
				return "SomethingNeededB";
			});
		});

		//Require and Define it!
		(window.ZDQ = window.ZDQ || []).push(function(zd) {
			zd.reqDef(["test7A", "test7B"], "test7C", function(fromDefine1, fromDefine2) {
				assert.ok("RUN SOME CODE", "Defining 'test7C'");
				return [fromDefine1, fromDefine2, "SomethingNeededC"];
			});
		});

		//Require it!
		(window.ZDQ = window.ZDQ || []).push(function(zd) {
			zd.req(["test7C"], function(fromDefine) {
				assert.ok("RUN SOME CODE", "Running after 3 defines");
				assert.deepEqual(fromDefine[0], "SomethingNeededA", "Argument 0 was what we required from the third define");
				assert.deepEqual(fromDefine[1], "SomethingNeededB", "Argument 1 was what we required from the third define");
				assert.deepEqual(fromDefine[2], "SomethingNeededC", "Argument 2 was what we required from the third define");

				done();
			});
		});
	});

})();
