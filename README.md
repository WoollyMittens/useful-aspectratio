# useful.aspectratio.js: Scripted Aspect Ratio

Adjusts the height of the box when the width changes to keep the proportions the same.

Try the <a href="http://www.woollymittens.nl/useful/default.php?url=useful-aspectratio">demo</a>.

## How to include the script

The stylesheet is best included in the header of the document.

```html
<link rel="stylesheet" href="./css/useful-aspectratio.css"/>
```

This include can be added to the header or placed inline before the script is invoked.

```html
<script src="./js/useful-aspectratio.js"></script>
```

To enable the use of HTML5 tags in Internet Explorer 8 and lower, include *html5.js*.

```html
<!--[if lte IE 9]>
	<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
```

## How to start the script

This is the safest way of starting the script, but allows for only one target element at a time.

```javascript
var aspectratio = new useful.Aspectratio( document.getElementById('id'), {
	'ratio' : 9/16,
	'interval' : 1000,
	'offset' : 0
});
```

**id : {string}** - The ID attribute of an element somewhere in the document.

**ratio : {float}** - The desired aspect ratio of height / width.

**interval : {integer}** - If larger than 0 this is the interval in milliseconds at which the script checks dimensions. The script also checks after every browser resize by default.

**offset : {integer}** - A fudge factor to compensate for small size differences. These are usually due to padding and borders.

### Using document.querySelectorAll

This method allows CSS Rules to be used to apply the script to one or more nodes at the same time.

```javascript
var aspectratios = new useful.Instances(
	document.querySelectorAll('.aspect'),
	useful.Aspectratio,
	{
		'ratio' : 9/16,
		'interval' : 1000,
		'offset' : 0
	}
);
```

### Using jQuery

This method is similar to the previous one, but uses jQuery for processing the CSS rule and cloning the settings.

```javascript
var aspectratios = [];
$('.aspect').each(function (index, element) {
	aspectratios[index] = new useful.Aspectratio( element, {
		'ratio' : 9/16,
		'interval' : 1000,
		'offset' : 0
	});
	Aspectratios[index].start();
});
```

## How to control the script

### Update

```javascript
aspectratio.update();
```

Adjust the aspect ratio.

## How to build the script

This project uses node.js from http://nodejs.org/

This project uses grunt.js from http://gruntjs.com/

The following commands are available for development:
+ `npm install` - Installs the prerequisites.
+ `grunt import` - Re-imports libraries from supporting projects to `./src/libs/` if available under the same folder tree.
+ `grunt dev` - Builds the project for development purposes.
+ `grunt prod` - Builds the project for deployment purposes.
+ `grunt watch` - Continuously recompiles updated files during development sessions.
+ `grunt serve` - Serves the project on a temporary web server at http://localhost:8000/ .

## License

This work is licensed under a Creative Commons Attribution 3.0 Unported License. The latest version of this and other scripts by the same author can be found at http://www.woollymittens.nl/
