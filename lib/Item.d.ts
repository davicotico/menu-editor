import { ElementItem } from './ElementItem';
import { ItemData, Itemlistener, NestedItemData, ItemOptions, ItemDataset } from './types';
import { ButtonGroup } from './ButtonGroup';
import { Collection } from './Collection';
export declare class Item implements ElementItem {
    protected element: HTMLDivElement;
    protected dataset: ItemDataset;
    protected collection: Collection;
    protected options: ItemOptions;
    protected listenerEditButton: Itemlistener;
    protected listenerDeleteButton: Itemlistener;
    buttonGroup: ButtonGroup;
    constructor(data: ItemData);
    setOptions(options: ItemOptions): void;
    setDataset(dataset: ItemDataset): void;
    getDataset(): ItemDataset;
    setListenerEditButton(listener: Itemlistener): void;
    setListenerDeleteButton(listener: Itemlistener): void;
    add(item: ElementItem): void;
    remove(): void;
    updateUI(data: ItemDataset): void;
    addArray(data: Array<NestedItemData>): void;
    protected createHandler(): HTMLSpanElement;
    mount(): void;
    getElement(): HTMLElement;
}
