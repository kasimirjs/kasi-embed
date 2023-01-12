
import {Message} from "./Message";



type MessageConstructor = {new () : Message};

/**
 * Access this by using Dependency Injection $bus
 *
 *
 */
class MessageBus {

    public index : number = 0;
    public listeners : any = {};
    /**
     * @private
     */
    constructor() {

    }

    /**
     *
     * @template T
     * @param message T
     * @param fn {function(msg: T<>)}
     * @returns {string}    The listener ID to unregister
     */
    on<T extends MessageConstructor>(message: T, fn: (msg : T) => void) : string {
        let listenerId = "e" + this.index++;

        console.log("register", message.name);
        this.listeners[listenerId] = {
            on:  message,
            fn: fn
        };
        return listenerId;
    }

    remove(listenerId : string) {
        delete this.listeners[listenerId];
    }

    /**
     *
     * @param message {KaMessage}
     */
    async trigger(message : Message) {
        for (let curListenerId in this.listeners) {
            if (message instanceof this.listeners[curListenerId].on)
                await this.listeners[curListenerId].fn(message)
        }
    }
}


export const messageBus = new MessageBus();
