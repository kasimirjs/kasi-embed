
import {KaMessage} from "./Message";

let kaMessageBusInstance = null;

/**
 * Access this by using Dependency Injection $bus
 *
 *
 */
export class KaMessageBus {

    /**
     * @private
     */
    constructor() {
        this.index = 0;
        this.listeners = {};
    }

    /**
     *
     * @return {KaMessageBus}
     */
    static getInstance() {
        if (kaMessageBusInstance === null)
            kaMessageBusInstance = new KaMessageBus();
        return kaMessageBusInstance;
    }

    /**
     *
     * @template T
     * @param message KaToolsV1.Message<T>
     * @param fn {function(event: <T>)}
     * @returns {string}    The listener ID to unregister
     */
    on(message, fn) {
        let listenerId = "e" + this.index++;
        this.listeners[listenerId] = {
            on: message,
            fn: fn
        };
        return listenerId;
    }

    remove(listenerId) {
        delete this.listeners[listenerId];
    }

    /**
     *
     * @param message {KaMessageBus}
     */
    async trigger(message) {
        for (let curListenerId in this.listeners) {
            if (message instanceof this.listeners[curListenerId].on)
                await this.listeners[curListenerId].fn(message)
        }
    }
}
