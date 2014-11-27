/*
	Source:
	van Creij, Maurice (2014). "useful.range.js: Range input element", version 20141127, http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

// create the constructor if needed
var useful = useful || {};
useful.Aspectratio = useful.Aspectratio || function () {};

// extend the constructor
useful.Aspectratio.prototype.init = function (cfg) {
	// properties
	"use strict";
	this.instances = [];
	// methods
	this.each = function (elements, cfg) {
		var _cfg, instance;
		// for all elements
		for (var a = 0, b = elements.length; a < b; a += 1) {
			// clone the configuration
			_cfg = Object.create(cfg);
			// insert the current element
			_cfg.element = elements[a];
			// start a new instance of the object
			this.instances.push(new this.Main(this, _cfg));
		}
	};
	this.update = function () {
		// for every instance
		for (var a = 0, b = this.instances.length; a < b; a += 1) {
			// trigger the update
			this.instances[a].update();
		}
	};
	// go
	this.each(cfg.elements, cfg);
	this.init = function () {};
	return this;
};

// return as a require.js module
if (typeof module !== 'undefined') {
	exports = module.exports = useful.Aspectratio;
}
