import { ItemParameters } from './types';
export declare class ItemEvent {
    private eventTarget;
    on(eventName: string, listener: (params: ItemParameters) => void): void;
    emit(eventName: string, params: ItemParameters): void;
}
