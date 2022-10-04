"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.di_instanciate = exports.inject = void 0;
require("reflect-metadata");
const ka_container_1 = require("../app/ka-container");
/**
 * Inject a
 * @param name
 */
function inject(name = null) {
    return function (target, propertyKey, parameterIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("inject", target, "key", propertyKey, parameterIndex, name);
            let val = yield ka_container_1.container.get(propertyKey, true);
            console.log("got value", val);
            target[propertyKey] = val;
            return target;
        });
    };
}
exports.inject = inject;
/**
 * Instanciate a new Object and inject all Properties
 *
 * @param type
 * @param map
 */
function di_instanciate(type, map = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        let params = Reflect.getMetadataKeys(type);
        console.log("instanciat", params, Object.getOwnPropertyDescriptors(type.constructor));
        let o = new type();
        Object.keys(o).forEach(k => console.log("instanciate", Reflect.getMetadata("inject", o, k)));
        return o;
    });
}
exports.di_instanciate = di_instanciate;
