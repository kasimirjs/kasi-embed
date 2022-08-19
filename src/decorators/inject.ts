
import "reflect-metadata";
import {KaMessageBus} from "../default/MessageBus";



export function inject( name : string = null) : any {


    return function (target: Object, propertyKey: string | symbol, parameterIndex: number) : any {
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
export async function di_instanciate<T>(type : {new(...args : any): T;},  map : {} = {}) : Promise<T> {
    let params = Reflect.getMetadataKeys(type);
    console.log ("instanciat", params, Object.getOwnPropertyDescriptors(type.constructor));

    let o = new type();
    Object.keys(o).forEach(k => console.log("instanciate",  Reflect.getMetadata("inject", o, k)));
    return o;
}

