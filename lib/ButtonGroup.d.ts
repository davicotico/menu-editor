import { ElementItem } from './ElementItem';
import { ItemEvent } from './ItemEvent';
import { ItemParameters } from './types';
declare class Button {
    private button;
    constructor(html: string);
    onClick(f: EventListenerOrEventListenerObject): void;
    getElement(): HTMLElement;
    getParemtElement(): HTMLElement | null;
}
export declare class ButtonGroup {
    protected item: ElementItem;
    protected container: HTMLDivElement;
    protected eventEmitter: ItemEvent;
    protected buttons: {
        edit: Button;
        delete: Button;
    };
    constructor(item: ElementItem);
    protected setEvents(): void;
    onClickDelete(listener: (params: ItemParameters) => void): void;
    onClickEdit(listener: (params: ItemParameters) => void): void;
    mount(): void;
    getElement(): HTMLDivElement;
}
export {};
