/*
	Source:
	van Creij, Maurice (2018). "aspectratio.js: Keeps the proportions of a box the same regardless of browser size.", http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

// establish the class
var Aspectratio = function (config) {

	// PROPERTIES

	this.config = null;
	this.elements = null;

	// METHODS

	this.init = function (config) {
		// store the config
		this.config = config;
		this.elements = config.elements || [config.element];
		// pre-calculate and  store the ratios
		this.precalculate();
		// when the window changes size
		this.updateOnResize();
		// occasional check
		this.updateOnDelay();
		// initial update
		this.update();
		// return the object
		return this;
	};

	this.precalculate = function () {
		var ratioAttribute;
		// pre-calculate and  store the ratios
		this.ratios = [];
		for (var a = 0, b = this.elements.length; a < b; a += 1) {
			ratioAttribute = this.elements[a].getAttribute('data-ratio') || this.config.ratio;
			ratioAttribute = ratioAttribute.split(':');
			this.ratios[a] = parseInt(ratioAttribute[1]) / parseInt(ratioAttribute[0]);
		}
	};

	this.update = function () {
		var width, height, ratio, corrected;
		// adjust all the elements
		for (var a = 0, b = this.elements.length; a < b; a += 1) {
			// measure the width of the elementect
			width = this.elements[a].offsetWidth;
			// measure the height of the elementect
			height = this.elements[a].offsetHeight;
			corrected = width * this.ratios[a];
			// if the measurements are trustworthy
			if (width && height && height !== corrected) {
				// adjust the height
				this.elements[a].style.height = (corrected - this.config.offset) + 'px';
			}
		}
	};

	// EVENTS

	this.updateOnResize = function () {
		var _this = this;
		// when the window changes size
		window.addEventListener('resize', function () {
			_this.update();
		}, false);
	};

	this.updateOnDelay = function () {
		var _this = this;
		// if wanted
		if (this.config.interval > 0) {
			// occasional check
			this.config.timeout = setInterval(function () {
				_this.update();
			}, this.config.interval);
		}
	};

	this.init(config);

};

// return as a require.js module
if (typeof define != 'undefined') define([], function () { return Aspectratio });
if (typeof module != 'undefined') module.exports = Aspectratio;
