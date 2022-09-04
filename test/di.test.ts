import {KaMessageBus} from "../src/default/MessageBus";
import {inject} from "../src/decorators/inject";
import * as util from "util";
import {container} from "../src/app/ka-container";


class TestInjectable {

    @inject("bus")
    public bus : any

}

container.defineService("bus", () => {
    return new KaMessageBus();
});


describe("test runs", () => {
    it("shoud return something", () => {

        let e = new TestInjectable();
        console.log(util.inspect(e, true));
        expect(e.bus).toBeInstanceOf(KaMessageBus);
    })
})
