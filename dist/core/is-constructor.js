"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ka_is_constructor = void 0;
/**
 * Returns true if fn in parameter 1 is a contructor
 *
 *
 * @param fn
 * @returns {boolean}
 */
function ka_is_constructor(fn) {
    return fn.toString().startsWith("class");
}
exports.ka_is_constructor = ka_is_constructor;
