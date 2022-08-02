
import {KaMessage} from "./Message";


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
     * @template T
     * @param message T
     * @param fn {function(msg: T<>)}
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
     * @param message {KaMessage}
     */
    async trigger(message) {
        for (let curListenerId in this.listeners) {
            if (message instanceof this.listeners[curListenerId].on)
                await this.listeners[curListenerId].fn(message)
        }
    }
}
