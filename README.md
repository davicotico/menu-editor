# Menu Editor

Vanilla Javascript Menu Editor Library (made with Typescript). 

## [>>> Demo <<<](https://davidticona.com/demos/javascript-menu-editor/)

## Install

Via NPM

```
npm install @davicotico/menu-editor
```

Via CDN

```html
<!-- Styles -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/davicotico/menu-editor@1.2.0/dist/styles.min.css">

<!-- and the javascript file -->
<script src="https://cdn.jsdelivr.net/gh/davicotico/menu-editor@1.2.0/dist/menu-editor.min.js"></script>
<script>
	var menuEditor = new MenuEditor('element-id', { maxLevel: 3 });
</script>
```

## How to use

### Imports
```js
import '@davicotico/menu-editor/lib/css/styles.css';
import { MenuEditor } from '@davicotico/menu-editor';
```

### Creating the object

HTML
```html
<div id="element-id"></div>
```
Javascript

```js
const menuEditor = new MenuEditor('element-id', { maxLevel: 3 });
```

### Setting the Events

```js
menuEditor.onClickDelete((event) => {
	if (confirm('Do you want to delete the item ' + event.item.getDataset().text)) {
		event.item.remove(); // remove the item
	}
});

menuEditor.onClickEdit((event) => {
	let itemData = event.item.getDataset();
	console.log(itemData);
	menuEditor.edit(event.item); // set the item in edit mode
});

menuEditor.onDragEnd((event) => {
	let output = editor.getString();
	console.log(output);
	// add logic here
});
```

### Setting the data

The data

```js
var nestedData = [
	{
	"text": "Home",
	"href": "/home",
	"tooltip": "Go to home page",
	"icon": "fa-solid fa-house",
	"children": []
	},
	{
	"text": "About Us",
	"href": "/about",
	"tooltip": "Learn more about our company",
	"icon": "fa-solid fa-address-card",
	"children": []
	},
	{
	"text": "Services",
	"href": "/services",
	"tooltip": "Discover the services we offer",
	"icon": "fa-solid fa-gear",
	"children": [
		{
		"text": "Service 1",
		"href": "/services/1",
		"tooltip": "Details for Service 1",
		"icon": "cog",
		"children": []
		},
		{
		"text": "Service 2",
		"href": "/services/2",
		"tooltip": "Details for Service 2",
		"icon": "cog",
		"children": []
		}
	]
	}
];
```

The method:

```js
menuEditor.setArray(nestedData);
```

### Mount the menu editor

```js
menuEditor.mount();
```

### Add a new item

```js
let newItem = {
    text: txtText.value, // required
    href: txtHref.value, // required
    icon: txtIcon.value, // required
    tooltip: txtTooltip.value, // required
    something: "Something" // custom attributes are optional
};
menuEditor.add(newItem);
```

### Update an item

The menu editor must have an item in edit mode. See `onClickEdit` event in **Events** section

```js
let data = {
	text: txtText.value,
	href: txtHref.value,
	icon: txtIcon.value,
	tooltip: txtTooltip.value,
};
menuEditor.update(data);
```

### Output

```js
let output = menuEditor.getString();
console.log(output);
```

### Remove all items
```js
menuEditor.empty();
```

## DEV mode

Run this command

```shell
npm run dev
```
