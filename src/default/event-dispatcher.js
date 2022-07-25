/**
 * Access this by using Dependency Injection $eventDispatcher
 *
 * @type {KaToolsV1.EventDispatcher}
 */
KaToolsV1.EventDispatcher = class {

    constructor() {
        this.index = 0;
        this.listeners = {};
    }

    /**
     *
     * @param eventName {string}
     * @param fn {function}
     * @returns {string}
     */
    addEventListener(eventName, fn) {
        let listenerId = "e" + this.index++;
        this.listeners[listenerId] = {
            on: eventName,
            fn: fn
        };
        return listenerId;
    }

    removeEventListener(listenerId) {
        delete this.listeners[listenerId];
    }

    /**
     *
     * @param eventName {string}
     * @param payload {*}
     */
    async triggerEvent (eventName, payload={}) {
        for (let curName in this.listeners) {
            if (this.listeners[curName].on === eventName)
                await this.listeners[curName].fn(payload)
        }
    }
}

KaToolsV1.provider.defineService("$eventDispatcher", () => new KaToolsV1.EventDispatcher());


