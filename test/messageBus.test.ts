import {MessageBus} from "../../kasi-app/src/message/MessageBus";
import * as util from "util";
import {BasicMessage, Message} from "../../kasi-app/src/message/Message";


class HelloMessage implements Message {
    MsgName = "hello";
}

describe("test runs", () => {
    it("shoud return something", () => {

        let bus = new MessageBus();
        bus.on(HelloMessage, (msg) => {
            console.log(msg);
        });
        console.log(util.inspect(bus, true));
        expect(true).toBe(true);
    })
})
