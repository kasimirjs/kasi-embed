import {KaToolsV1} from "../core/init";

/**
 * Access this by using Dependency Injection $bus
 *
 * @type {KaToolsV1.EventDispatcher}
 */
KaToolsV1.MessageBus = class {

    constructor() {
        this.index = 0;
        this.listeners = {};
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
     * @param message {KaToolsV1.Event}
     */
    async trigger(message) {
        for (let curListenerId in this.listeners) {
            if (message instanceof this.listeners[curListenerId].on)
                await this.listeners[curListenerId].fn(message)
        }
    }
}

KaToolsV1.provider.defineService("$bus", () => new KaToolsV1.MessageBus());


