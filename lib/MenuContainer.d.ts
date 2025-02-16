import { ElementItem } from './ElementItem';
import { Collection } from './Collection';
import { ItemOptions } from './types';
export declare class MenuContainer {
    protected element: HTMLDivElement;
    protected id: string;
    protected collection: Collection;
    protected options: ItemOptions;
    constructor(id: string);
    setOptions(options: ItemOptions): void;
    add(item: ElementItem, index?: number): void;
    empty(): void;
    mount(): void;
    getElement(): HTMLDivElement;
}
