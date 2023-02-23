import { Subject } from 'rxjs';
interface EventBus {
    on(eventName: string, listener: Function): void;
    off(eventName: string, listener: Function): void;
}
export declare function createEventBus(pdfJsViewer: any, destroy$: Subject<void>): EventBus;
export {};
