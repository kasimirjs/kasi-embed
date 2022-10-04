var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import "reflect-metadata";
import { container } from "../app/ka-container";
/**
 * Inject a
 * @param name
 */
export function inject(name = null) {
    return function (target, propertyKey, parameterIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("inject", target, "key", propertyKey, parameterIndex, name);
            let val = yield container.get(propertyKey, true);
            console.log("got value", val);
            target[propertyKey] = val;
            return target;
        });
    };
}
/**
 * Instanciate a new Object and inject all Properties
 *
 * @param type
 * @param map
 */
export function di_instanciate(type, map = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        let params = Reflect.getMetadataKeys(type);
        console.log("instanciat", params, Object.getOwnPropertyDescriptors(type.constructor));
        let o = new type();
        Object.keys(o).forEach(k => console.log("instanciate", Reflect.getMetadata("inject", o, k)));
        return o;
    });
}
