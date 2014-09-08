/*
	Source:
	van Creij, Maurice (2014). "useful.aspectratio.js: Keeps the proportions of a box the same regardless of browser size.", version 20140828, http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.

	Prerequisites:
	<!--[if IE]>
		<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
	<![endif]-->
*/

// public object
var useful = useful || {};

(function(){

	// invoke strict mode
	"use strict";

	// private functions
	useful.Aspectratio = function (obj, cfg) {
		this.obj = obj;
		this.cfg = cfg;
		this.start = function () {
			var context = this;
			// when the window changes size
			window.addEventListener('resize', function () {
				context.update();
			}, false);
			// occasional check
			if (this.cfg.interval > 0) {
				this.cfg.timeout = setInterval(function () {
					context.update();
				}, this.cfg.interval);
			}
			// initial update
			this.update();
			// disable the start function so it can't be started twice
			this.start = function () {};
		};
		this.update = function () {
			var width, height, corrected;
			// measure the width of the object
			width = this.obj.offsetWidth;
			// measure the height of the object
			height = this.obj.offsetHeight;
			corrected = width * this.cfg.ratio;
			// if the measurements are trustworthy
			if (width && height && height !== corrected) {
				// adjust the height
				this.obj.style.height = (corrected - this.cfg.offset) + 'px';
			}
		};
		// go
		this.start();
	};

	// return as a require.js module
	if (typeof module !== 'undefined') {
		exports = module.exports = useful.Aspectratio;
	}

})();
