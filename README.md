# rome-angular
[![bitHound Overall Score](https://www.bithound.io/github/e-krebs/rome-angular/badges/score.svg)](https://www.bithound.io/github/e-krebs/rome-angular)
[![Bower version](https://badge.fury.io/bo/rome-angular.svg)](https://badge.fury.io/bo/rome-angular)

> rome-angular is a simple yet _powerfull_ [`angular`][1] directive for [`rome`][2].
>
> [`rome`][2] is a customizable date _(and time)_ picker, no jQuery !

## Demo
Live demo here http://e-krebs.github.io/rome-angular/

## Install
From bower
```shell
bower install --save rome-angular
```

## Setup
Both minified and non-minified version are provided.

[`Rome`][2] having a dependency on [`moment`][3], you can use your own distribution of moment, using `rome.standelone.js`
```html
	<script type="text/javascript" src="moment.min.js"></script>
	<script type="text/javascript" src="rome.standalone.min.js"></script>
	<script type="text/javascript" src="angular.min.js"></script>
	<script type="text/javascript" src="rome-angular.min.js"></script>
```
Or you can use the bundled `rome.js` distribution, which comes with [`moment`][3] in it.
```html
	<script type="text/javascript" src="rome.min.js"></script>
	<script type="text/javascript" src="angular.min.js"></script>
	<script type="text/javascript" src="rome-angular.min.js"></script>
```
If you need to do anything regarding internationalization, refer to [`moment`][3] for that. Basically, this will look like :
```html
	<script type="text/javascript" src="moment.min.js"></script>
	<script type="text/javascript" src="moment-locale-fr.js"></script>
	<script type="text/javascript" src="rome.standalone.min.js"></script>
	<script type="text/javascript" src="angular.min.js"></script>
	<script type="text/javascript" src="rome-angular.min.js"></script>
```

## Usage
> See the `example/` folder for a fully functional implementation/_demo_

Inject it into your angular module, and use it on either a div or a text input :
```html
    <script>
		angular.module('testApp', ['rome-angular'])
            .controller('testController', TestController);
		function TestController() {
			var vm = this;
			vm.mydate = new Date();
		}
    </script>
    <div rome="testCtrl.mydate"></div>
    <input type="text" rome="testCtrl.mydate">
```
You can provide a function to execute when the underlying value changes :
```html
    <div rome="testCtrl.mydate" rome-change="testCtrl.doSomething()"></div>
```

`rome-angular` supports rome options, as defined by rome.

You can specify these options using a configprovider :
```html
    <script>
		angular.module('testApp', ['rome-angular'])
            .config(romeConfig)
            .controller('testController', TestController);
            
		function romeConfig(romeConfigProvider) {
			romeConfigProvider.setDefaults({
				weekStart: 1,
				inputFormat: 'DD/MM/YYYY HH:mm:ss'
			});
		}
    </script>
```
Or you can sepecify these options on a specific element (they will override the configprovider's options)
```html
    <div rome="testCtrl.mydate" rome-options="{ inputFormat: 'DD-MM-YYYY, HH:mm', weekStart: 0}"></div>
```

# Build and tests

## Test
First, install dependencies, then run karma :
```shell
npm install
```
You can then run test either with karma or through gulp :
```shell
karma start
```
```shell
gulp test
```

## Build
Install dependencies and run build :
```shell
npm install
gulp build
```
Files are output in `dist/` :
- rome-angular.js
- rome-angular.min.js
- rome-angular.min.js.map

## Gulp watch
A gulp watch task is also available, running both test and build tasks
```shell
guild watch
```


# License
MIT


[1]: https://angularjs.org/
[2]: https://github.com/bevacqua/rome
[3]: http://momentjs.com/
