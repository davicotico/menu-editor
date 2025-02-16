import { ElementItem } from "./ElementItem";
import { ItemData, Itemlistener, NestedItemData, ItemOptions, ItemDataset } from "./types";
import { ButtonGroup } from "./ButtonGroup";
import { HANDLER_ICON } from "./constants";
import { Collection } from "./Collection";
import { itemDataToDataset, setDatasetToElement } from "./functions";

export class Item implements ElementItem {
  protected element = document.createElement("div");
  protected dataset: ItemDataset;
  protected collection: Collection;
  protected options: ItemOptions = { sortableClassname: 'nested-sortable' }
  protected listenerEditButton: Itemlistener = () => {};
  protected listenerDeleteButton: Itemlistener = () => {};
  public buttonGroup: ButtonGroup;

  constructor(data: ItemData) {
    this.collection = new Collection();
    this.buttonGroup = new ButtonGroup(this);
    this.element.classList.add("list-group-item");
    this.dataset = itemDataToDataset(data);
  }

  public setOptions(options: ItemOptions) {
    this.options = options;
  }

  public setDataset(dataset: ItemDataset): void {
    this.dataset = dataset;
  }

  public getDataset(): ItemDataset {
    return this.dataset;
  }

  public setListenerEditButton(listener: Itemlistener) {
    this.listenerEditButton = listener;
  }

  public setListenerDeleteButton(listener: Itemlistener) {
    this.listenerDeleteButton = listener;
  }
  
  public add(item: ElementItem) {
    this.collection.add(item);
  }

  public remove(): void {
    this.getElement().remove();
  }

  public updateUI(data: ItemDataset): void {
    let textElement = this.element.querySelector('.item-text');
    let iconElement = this.element.querySelector('i');
    if (textElement != null) {
      textElement.innerHTML = data.text;
    }
    if (iconElement != null) {
      iconElement.className = data.icon;
    }
  }

  public addArray(data: Array<NestedItemData>) {
    data.forEach((item) => {
      let mi = new Item(item);
      mi.setOptions(this.options);
      mi.setListenerDeleteButton(this.listenerDeleteButton);
      mi.setListenerEditButton(this.listenerEditButton);
      mi.buttonGroup.onClickDelete(this.listenerDeleteButton);
      mi.buttonGroup.onClickEdit(this.listenerEditButton);
      setDatasetToElement(mi.getElement(), mi.getDataset());
      if (item.children != undefined && item.children.length > 0) {
        mi.addArray(item.children);
      }
      this.add(mi);
    });
  }

  protected createHandler(): HTMLSpanElement {
    let handler = document.createElement('span');
    handler.style.mixBlendMode = 'difference';
    handler.style.filter = "invert(1) grayscale(1)";
    handler.className = 'jme-handle';
    handler.innerHTML = HANDLER_ICON;
    return handler;
  }

  public mount(): void {
    let divTextActions = document.createElement("div");
    let span = document.createElement("span");
    let icon = document.createElement('i');
    icon.className = this.dataset.icon;
    let handler = this.createHandler();
    let text = document.createElement('span');
    text.className = 'item-text';
    text.style.paddingLeft = "5px";
    text.innerHTML = this.dataset.text;
    let divGroup = document.createElement("div");
    divTextActions.className = 'd-flex w-100 justify-content-between align-items-center';
    span.append(handler);
    span.append(icon);
    span.append(text);
    divGroup.classList.add("list-group", this.options.sortableClassname);
    divTextActions.append(span);
    this.buttonGroup.mount();
    divTextActions.append(this.buttonGroup.getElement());
    this.element.append(divTextActions);
    this.collection.getItems().forEach((item) => {
      item.mount();
      divGroup.appendChild(item.getElement());
    });
    this.element.append(divGroup);
  }

  public getElement(): HTMLElement {
    return this.element;
  }
}
