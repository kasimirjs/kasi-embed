
import "reflect-metadata";
import {KaMessageBus} from "../default/MessageBus";



export function inject( name= null) {


    return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
         console.log("inject", target, propertyKey, parameterIndex, name);
         return Reflect.metadata("inject", name);
    }
}

/**
 * Instanciate a new Object and inject all Properties
 *
 * @param type
 * @param map
 */
export async function di_instanciate<T>(type : {new(...args): T;},  map : {} = {}) : Promise<T> {
    let params = Reflect.getMetadataKeys(type);
    console.log ("instanciat", params, Object.getOwnPropertyDescriptors(type.constructor));

    let o = new type();
    Object.keys(o).forEach(k => console.log("instanciate",  Reflect.getMetadata("inject", o, k)));
}

class Wurst {
    @inject
    #bus : KaMessageBus;

    constructor(
        @inject("bus") public injcted1,
        @inject("dispatcher") public injected2,
        @inject("lol") lol2
    ) {
    }
}

(async() => {
    let modal = await di_instanciate(Wurst);
})()


