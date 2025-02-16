import { default as Sortable } from 'sortablejs';
import { Item } from './Item';
import { NestedItemData, Itemlistener, ItemDataset, ItemData, MenuEditorOptions } from './types';
import { ElementItem } from './ElementItem';
export default class MenuEditor {
    private menuContainer;
    private currentItem;
    protected listenerDeleteButton: Itemlistener;
    protected listenerEditButton: Itemlistener;
    protected listenerDragEnd: (_evt: Sortable.SortableEvent) => void;
    protected sortableClassname: string;
    protected options: MenuEditorOptions;
    constructor(id: string, options?: MenuEditorOptions);
    add(data: ItemDataset): void;
    edit(item: ElementItem): void;
    update(data: ItemDataset): void;
    setArray(arr: Array<NestedItemData>): void;
    getString(): string;
    protected htmlToJson(element: HTMLElement): ItemData[];
    onClickEdit(listener: Itemlistener): void;
    onClickDelete(listener: Itemlistener): void;
    onDragEnd(listener: (evt: Sortable.SortableEvent) => void): void;
    empty(): void;
    mount(): void;
    protected makeItSortable(): void;
    protected makeItemSortable(item: Item): void;
}
