/*
	Source:
	van Creij, Maurice (2014). "useful.aspectratio.js: Keeps the proportions of a box the same regardless of browser size.", version 20141127, http://www.woollymittens.nl/.

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
	// methods
	this.only = function (cfg) {
		// start an instance of the script
		return new this.Main(cfg, this);
	};
	this.each = function (cfg) {
		var _cfg, instances = [];
		// for all element
		for (var a = 0, b = cfg.elements.length; a < b; a += 1) {
			// clone the cfguration
			_cfg = Object.create(cfg);
			// insert the current element
			_cfg.element = cfg.elements[a];
			// delete the list of elements from the clone
			delete _cfg.elements;
			// start a new instance of the object
			console.log('_cfg.element', _cfg.element);
			instances[a] = new this.Main(_cfg, this);
		}
		// return the instances
		return instances;
	};
	// return a single or multiple instances of the script
	return (cfg.elements) ? this.each(cfg) : this.only(cfg);
};

// return as a require.js module
if (typeof module !== 'undefined') {
	exports = module.exports = useful.Aspectratio;
}
