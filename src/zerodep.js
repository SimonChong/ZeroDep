(function() {
	'use strict';

	var namespace = {},
		eventFramework = {},
		runQ = {},
		done = {},
		i,

		run = function(name, code, args) {
			try {
				code.apply(window, args);
			} catch (e) {
				if (window.console) {
					console.log(name + " - RUN ERROR:", e, code);
				}
			}
		},
		runQue = function(name, args, q) {
			if (q[name]) {
				for (var i = 0; i < q[name].length; i++) {
					run(name, q[name][i], args);
				}
			}
		};

	var trigger = function(name, args) {
		name = name.toLowerCase();
		runQue(name, args, runQ);
		done[name] = args;
	};

	var react = function(name, code) {
		if (typeof name === 'string') {
			name = name.toLowerCase();
			if (done[name]) {
				run(name, code, done[name]);
			} else {
				if (!runQ[name]) {
					runQ[name] = [];
				}
				runQ[name].push(code);
			}
		} else if (name instanceof Array) {
			//Cater for a dependancy array
			var count = name.length,
				i,
				argsArray = [],
				cb = function(z) {
					return function() {
						count--;
						argsArray[z] = arguments[0];
						if (count === 0) {
							run(name, code, argsArray);
						}
					};
				};
			for (i = 0; i < name.length; i++) {
				react(name[i], cb(i));
			}
		}
	};

	//Exposed API
	window.ZD = {
		define: function(name, code) {
			var arg = code();
			trigger(name, [arg]);
		},
		require: function(deps, code) {
			react(deps, code);
		}
	};

	var toExe = window.ZDQ || [];
	for (i = 0; i < toExe.length; i++) {
		react("ZDL", toExe[i]);
	}
	window.ZDQ = {
		push: function(code) {
			react("ZDL", code);
		}
	};
	trigger("ZDL", [ZD]);

})();
