/*
	Source:
	van Creij, Maurice (2012). "useful.cropper.js: A simple image cropper", version 20130510, http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.

	Prerequisites:
	<script src="./js/useful.js"></script>
	<!--[if IE]>
		<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
	<![endif]-->
*/

(function (useful) {

	// invoke strict mode
	"use strict";

	// private functions
	var aspectratio = {};
	aspectratio = {
		watch : function (element, settings) {
			// when the window changes size
			useful.events.add(window, 'resize', function () {
				aspectratio.update(element, settings);
			});
			// occasional check
			if (settings.interval > 0) {
				settings.timeout = setInterval(function () {
					aspectratio.update(element, settings);
				}, settings.interval);
			}
			// initial update
			aspectratio.update(element, settings);
		},
		update : function (element, settings) {
			var width, height, corrected;
			// measure the width of the object
			width = element.offsetWidth;
			// measure the height of the object
			height = element.offsetHeight;
			corrected = width * settings.ratio;
			// if the measurements are trustworthy
			if (width && height && height !== corrected) {
				// adjust the height
				element.style.height = (corrected - settings.offset) + 'px';
			}
		}
	};

	// public functions
	useful.events = useful.events || {};
	useful.events.add = function (element, eventName, eventHandler) {
		// exceptions
		eventName = (navigator.userAgent.match(/Firefox/i) && eventName.match(/mousewheel/i)) ? 'DOMMouseScroll' : eventName;
		// prefered method
		if ('addEventListener' in element) {
			element.addEventListener(eventName, eventHandler, false);
		}
		// alternative method
		else if ('attachEvent' in element) {
			element.attachEvent('on' + eventName, function (event) { eventHandler(event); });
		}
		// desperate method
		else {
			element['on' + eventName] = eventHandler;
		}
	};

	useful.models = useful.models || {};
	useful.models.clone = function (model) {
		var clonedModel, ClonedModel;
		// if the method exists
		if (typeof(Object.create) !== 'undefined') {
			clonedModel = Object.create(model);
		}
		// else use a fall back
		else {
			ClonedModel = function () {};
			ClonedModel.prototype = model;
			clonedModel = new ClonedModel();
		}
		// return the clone
		return clonedModel;
	};

	useful.css = useful.css || {};
	useful.css.select = function (input, parent) {
		var a, b, elements;
		// validate the input
		parent = parent || document;
		input = (typeof input === 'string') ? {'rule' : input, 'parent' : parent} : input;
		input.parent = input.parent || document;
		input.data = input.data || {};
		// use querySelectorAll to select elements, or defer to jQuery
		elements = (typeof(document.querySelectorAll) !== 'undefined') ?
			input.parent.querySelectorAll(input.rule) :
			(typeof(jQuery) !== 'undefined') ? jQuery(input.parent).find(input.rule).get() : [];
		// if there was a handler
		if (typeof(input.handler) !== 'undefined') {
			// for each element
			for (a = 0 , b = elements.length; a < b; a += 1) {
				// run the handler and pass a unique copy of the data (in case it's a model)
				input.handler(elements[a], useful.models.clone(input.data));
			}
		// else assume the function was called for a list of elements
		} else {
			// return the selected elements
			return elements;
		}
	};

	useful.aspectratio = {};
	useful.aspectratio.watch = aspectratio.watch;

}(window.useful = window.useful || {}));
