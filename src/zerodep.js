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


	var react = function(name, code, mkAsync) {
		var toRun = mkAsync ? makeAsync(code) : code;
		if (typeof name === 'string') {
			name = name.toLowerCase();
			if (done[name]) {
				run(name, toRun, [done[name]]);
			} else {
				if (!runQ[name]) {
					runQ[name] = [];
				}
				runQ[name].push(toRun);
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
							run(name, toRun, argsArray);
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
		define: function(name, code, makeAsync) {
			var args = code();
			args = args instanceof Array ? args : [args];
			trigger(name, args);
		},
		require: function(deps, code, makeAsync) {
			react(deps, code, makeAsync);
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
	trigger("ZDL", ZD);

})();
