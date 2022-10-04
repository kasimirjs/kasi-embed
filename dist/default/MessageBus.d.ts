import { Message } from "./Message";
declare type MessageConstructor = {
    new (): Message;
};
/**
 * Access this by using Dependency Injection $bus
 *
 *
 */
export declare class MessageBus {
    index: number;
    listeners: any;
    /**
     * @private
     */
    constructor();
    /**
     *
     * @template T
     * @param message T
     * @param fn {function(msg: T<>)}
     * @returns {string}    The listener ID to unregister
     */
    on<T extends MessageConstructor>(message: T, fn: (msg: T) => void): string;
    remove(listenerId: string): void;
    /**
     *
     * @param message {KaMessage}
     */
    trigger(message: Message): Promise<void>;
}
export {};
