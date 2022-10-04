"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ka_str_to_camel_case = void 0;
/**
 * Transform any input to CamelCase
 *
 * Example: some-class => someClass
 *
 * @param str {string}
 * @return {string}
 */
function ka_str_to_camel_case(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (ltr, idx) => idx === 0 ? ltr.toLowerCase() : ltr.toUpperCase()).replace(/[^a-zA-Z0-9]+/g, '');
}
exports.ka_str_to_camel_case = ka_str_to_camel_case;
