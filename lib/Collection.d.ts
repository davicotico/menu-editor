import { ElementItem } from './ElementItem';
export declare class Collection {
    protected items: Array<ElementItem>;
    constructor();
    protected insertAt(item: ElementItem, index: number): void;
    add(item: ElementItem, index?: number): void;
    getItems(): ElementItem[];
    empty(): void;
    getLength(): number;
}
