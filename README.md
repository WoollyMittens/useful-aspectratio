# useful.aspectratio.js: Scripted Aspect Ratio

Adjusts the height of the box when the width changes to keep the proportions the same.

Try the <a href="http://www.woollymittens.nl/useful/default.php?url=aspectratio">aspectratio demo</a>.

## How to use the script

The stylesheet is best included in the header of the document.

```html
<link rel="stylesheet" href="./css/aspectratio.css"/>
```

This include can be added to the header or placed inline before the script is invoked.

```html
<script src="./js/useful.aspectratio.js"></script>
```

To enable the use of HTML5 tags in Internet Explorer 8 and lower, include *html5.js*. To provide an alternative for *document.querySelectorAll* in Internet Explorer 8 and lower, include *jQuery*.

```html
<!--[if lte IE 9]>
	<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<![endif]-->
```

### Using vanilla JavaScript

This is the safest way of starting the script, but allows for only one target element at a time.

```javascript
var parent = documentGetElementById('id');
useful.aspectratio.watch(parent, {
	'ratio' : 9/16,
	'interval' : 1000,
	'offset' : 0
});
```

**id : {string}** - The ID attribute of an element somewhere in the document.

**parent : {DOM node}** - The DOM element around which the functionality is centred.

**ratio : {float}** - The desired aspect ratio of height / width.

**interval : {integer}** - If larger than 0 this is the interval in milliseconds at which the script checks dimensions. The script also checks after every browser resize by default.

**offset : {integer}** - A fudge factor to compensate for small size differences. These are usually due to padding and borders.

### Using document.querySelectorAll

This method allows CSS Rules to be used to apply the script to one or more nodes at the same time.

```javascript
useful.css.select({
	rule : '.aspectratio',
	handler : useful.aspectratio.watch,
	data : {
		'ratio' : 9/16,
		'interval' : 1000,
		'offset' : 0
	}
});
```

**rule : {string}** - The CSS Rule for the intended target(s) of the script.

**handler : {function}** - The public function that starts the script.

**data : {object}** - Name-value pairs with configuration data.

### Using jQuery

This method is similar to the previous one, but uses jQuery for processing the CSS rule.

```javascript
$('.aspectratio').each(function (index, element) {
	useful.aspectratio.watch(element, {
		'ratio' : 9/16,
		'interval' : 1000,
		'offset' : 0
	});
});
```

## License
This work is licensed under a Creative Commons Attribution 3.0 Unported License. The latest version of this and other scripts by the same author can be found at http://www.woollymittens.nl/
