import { ItemDataset, ItemOptions } from './types';
export interface ElementItem {
    setOptions(options: ItemOptions): void;
    setDataset(dataset: ItemDataset): void;
    getDataset(): ItemDataset;
    add(item: ElementItem): void;
    remove(): void;
    mount(): void;
    updateUI(dataset: ItemDataset): void;
    getElement(): HTMLElement;
}
