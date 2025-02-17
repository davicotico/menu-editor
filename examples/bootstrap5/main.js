import { MenuEditor } from "@davicotico/menu-editor";
import '@davicotico/menu-editor/lib/css/styles.css';
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

const txtText = document.getElementById('txtText');
const txtHref = document.getElementById('txtHref');
const txtIcon = document.getElementById('txtIcon');
const txtTooltip = document.getElementById('txtTooltip');
const txtOutput = document.getElementById('txtOutput');

const btnUpdate= document.getElementById('btnUpdate');
const btnAdd = document.getElementById('btnAdd');
const btnOutput = document.getElementById('btnOutput');

const cleanForm = () => {
	txtHref.value = '';
	txtText.value = '';
	txtIcon.value = '';
	txtTooltip.value = '';
};

const menuEditor = new MenuEditor("element-id", { maxLevel: 3 });
menuEditor.onClickDelete((event) => {
	if (confirm('Do you want to delete the item ' + event.item.getDataset().text)) {
		event.item.remove(); // remove the item
	}
});

menuEditor.onClickEdit((event) => {
	let theItem = event.item;
	let a = theItem.getDataset();
	txtText.value = a.text;
	txtHref.value = a.href;
	txtIcon.value = a.icon;
	txtTooltip.value = a.tooltip;
	btnUpdate.removeAttribute('disabled');
	menuEditor.edit(event.item);
});

menuEditor.onDragEnd(() => {
	console.log('Drag end!!!');
});

menuEditor.setArray(nestedData);

btnAdd.addEventListener('click', () => {
	let newItem = {
		text: txtText.value,
		href: txtHref.value,
		icon: txtIcon.value,
		tooltip: txtTooltip.value,
		something: "Something"
	};
	menuEditor.add(newItem);
	btnUpdate.setAttribute('disabled', "true");
	cleanForm();
});

btnUpdate.addEventListener('click', () => {
	let data = {
		text: txtText.value,
		href: txtHref.value,
		icon: txtIcon.value,
		tooltip: txtTooltip.value,
	};
	menuEditor.update(data);
	btnUpdate.setAttribute('disabled', "true");
	cleanForm();
});

btnOutput.addEventListener('click', () => {
	txtOutput.value = menuEditor.getString();
});

menuEditor.mount();
