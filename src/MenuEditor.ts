import Sortable from "sortablejs";
import { Item } from "./Item";
import { MenuContainer } from "./MenuContainer";
import { NestedItemData, Itemlistener, ItemDataset, ItemData, MenuEditorOptions } from "./types";
import { datasetToItemData, getMaxNestedLevel, setDatasetToElement, updateLevels } from "./functions";
import { ElementItem } from "./ElementItem";
import { defaultOptions } from "./constants";

export default class MenuEditor {
  private menuContainer: MenuContainer;
  private currentItem: ElementItem | null = null;
  protected listenerDeleteButton: Itemlistener;
  protected listenerEditButton: Itemlistener;
  protected listenerDragEnd: (_evt: Sortable.SortableEvent) => void;
  protected sortableClassname: string = '';
  protected options: MenuEditorOptions;

  constructor(id: string, options: MenuEditorOptions = defaultOptions) {
    this.menuContainer = new MenuContainer(id);
    this.sortableClassname = `${id}-nested-sortable`;
    this.options = options;
    this.menuContainer.setOptions({ sortableClassname: this.sortableClassname });
    this.listenerDeleteButton = () => {};
    this.listenerEditButton = () => {};
    this.listenerDragEnd = () => {};
  }

  public add(data: ItemDataset) {
    let newItem = new Item(data);
    newItem.setOptions({sortableClassname: this.sortableClassname});
    newItem.setListenerEditButton(this.listenerEditButton);
    newItem.buttonGroup.onClickEdit(this.listenerEditButton);
    newItem.setListenerDeleteButton(this.listenerDeleteButton);
    newItem.buttonGroup.onClickDelete(this.listenerDeleteButton);
    setDatasetToElement(newItem.getElement(), data);
    newItem.getElement().ariaLevel = '0';
    this.menuContainer.add(newItem);
    newItem.mount();
    this.makeItemSortable(newItem);
    this.menuContainer.getElement().append(newItem.getElement());
  }

  public edit(item: ElementItem): void {
    this.currentItem = item;
  }

  public update(data: ItemDataset): void {
    if (this.currentItem == null) {
      return;
    }
    this.currentItem.setDataset(data);
    setDatasetToElement(this.currentItem.getElement(), data);
    this.currentItem.updateUI(data);
    this.currentItem = null;
  }

  public setArray(arr: Array<NestedItemData>) {
    arr.forEach((elem) => {
      let item = new Item(elem);
      item.setOptions({sortableClassname: this.sortableClassname});
      item.setListenerDeleteButton(this.listenerDeleteButton);
      item.setListenerEditButton(this.listenerEditButton);
      item.buttonGroup.onClickDelete(this.listenerDeleteButton);
      item.buttonGroup.onClickEdit(this.listenerEditButton);
      setDatasetToElement(item.getElement(), item.getDataset());
      if (Array.isArray(elem.children)) {
        if (elem.children.length > 0) {
          item.addArray(elem.children);
        }
      }
      this.menuContainer.add(item);
    });
  }

  public getString(): string {
    let json = this.htmlToJson(this.menuContainer.getElement());
    return JSON.stringify(json);
  }

  protected htmlToJson(element: HTMLElement): ItemData[] {
    let items = element.children;
    let arr: ItemData[] = [];
    for (var i = 0; i < items.length; i++) {
      let item = items.item(i) as HTMLElement;
      let objeto: ItemData = datasetToItemData(item.dataset);
      let lastDiv = item.lastElementChild as HTMLElement;
      objeto["children"] = [];
      if (lastDiv.childElementCount > 0) {
        let arrChild = this.htmlToJson(lastDiv);
        objeto["children"] = arrChild;
      }
      arr.push(objeto);
     }
    return arr;
  }

  public onClickEdit(listener: Itemlistener) {
    this.listenerEditButton = listener;
  }

  public onClickDelete(listener: Itemlistener) {
    this.listenerDeleteButton = listener;
  }

  public onDragEnd(listener: (evt: Sortable.SortableEvent) => void) {
      this.listenerDragEnd = listener;
  }

  public empty(): void {
    this.menuContainer.empty();
  }

  public mount(): void {
    this.menuContainer.mount();
    this.makeItSortable();
    updateLevels(this.menuContainer.getElement());
  }

  protected makeItSortable(): void {
    var nestedSortables = [].slice.call<NodeListOf<HTMLElement>, [], HTMLElement[]>(document.querySelectorAll("." + this.sortableClassname));
    for (var i = 0; i < nestedSortables.length; i++) {
      new Sortable(nestedSortables[i], {
        handle: ".jme-handle",
        ghostClass: "ghost",
        group: {
          name: 'nested',
          pull: (to, _from, dragEl) => {
            if (this.options.maxLevel < 0) {
              return true;
            }
            let targetLevel = parseInt(to.el.ariaLevel as string);
            let itemLevel = getMaxNestedLevel(dragEl, 0);
            let level = itemLevel + targetLevel;
            return (level < this.options.maxLevel);
          },
        },
        onEnd: (_evt) => {
          updateLevels(this.menuContainer.getElement());
          this.listenerDragEnd(_evt);
        },
        animation: 150,
        fallbackOnBody: true,
        swapThreshold: 0.65,
      });
    }
  }

  protected makeItemSortable(item: Item): void {
    let element: HTMLElement | null = item.getElement().querySelector('.' + this.sortableClassname);
    if (element == null) {
      return;
    }
    new Sortable(element, {
      handle: ".jme-handle",
      ghostClass: "ghost",
      group: {
        name: 'nested',
        pull: (to, _from, dragEl) => {
          if (this.options.maxLevel < 0) {
            return true;
          }
          let targetLevel = parseInt(to.el.ariaLevel as string);
          let itemLevel = getMaxNestedLevel(dragEl, 0);
          let level = itemLevel + targetLevel;
          return (level < this.options.maxLevel);
        },
      },
      onEnd: (_evt) => {
        updateLevels(this.menuContainer.getElement());
      },
      animation: 150,
      fallbackOnBody: true,
      swapThreshold: 0.65,
    });
  }
}
