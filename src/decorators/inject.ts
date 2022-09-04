
import "reflect-metadata";
import {container} from "../app/ka-container";


/**
 * Inject a
 * @param name
 */
export function inject( name : string = null) : any {

    return async function (target: Object, propertyKey: string | symbol, parameterIndex: number) : Promise<any> {
         console.log("inject", target, "key", propertyKey, parameterIndex, name);
         let val = await container.get(propertyKey as string, true);
         console.log("got value", val);
         (<any>target)[propertyKey] = val;
         return target;
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

