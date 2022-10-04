var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Access this by using Dependency Injection $bus
 *
 *
 */
export class MessageBus {
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
        console.log("register", message.name);
        this.listeners[listenerId] = {
            on: message.prototype.MsgName,
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
    trigger(message) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let curListenerId in this.listeners) {
                if (message instanceof this.listeners[curListenerId].on)
                    yield this.listeners[curListenerId].fn(message);
            }
        });
    }
}
