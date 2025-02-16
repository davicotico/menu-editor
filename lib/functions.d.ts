import { ItemData, ItemDataset } from './types';
declare function itemDataToDataset(data: ItemData): ItemDataset;
declare function datasetToItemData(dataset: DOMStringMap): ItemData;
declare function setDatasetToElement(el: HTMLElement, data: ItemDataset): void;
declare function getParents(elem: HTMLElement, root: HTMLElement, callback: Function): HTMLElement[];
declare function updateLevels(element: HTMLElement, level?: number): void;
declare function getMaxNestedLevel(element: HTMLElement, currentLevel: number): number;
export { setDatasetToElement, itemDataToDataset, datasetToItemData, getParents, updateLevels, getMaxNestedLevel, };
