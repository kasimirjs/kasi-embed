"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const init_1 = require("../core/init");
/**
 * Return array of arguments of the function
 *
 * <example>
 *     function f1(arg1, arg2=null) {}
 *
 *     assert(KaToolsV1.getArgs(f1) === ["arg1", "arg2"])
 * </example>
 *
 * @param func
 * @returns {string[]}
 */
init_1.KaToolsV1.getArgs = (func) => {
    return (func + '')
        .replace(/[/][/].*$/mg, '') // strip single-line comments
        .replace(/^(.*?)=>.*$/s, (m, m1) => m1)
        .replace(/\s+/g, '') // strip white space
        .replace(/[/][*][^/*]*[*][/]/g, '') // strip multi-line comments
        .split('){', 1)[0].replace(/^[^(]*[(]/, '') // extract the parameters
        .replace(/=[^,]+/g, '') // strip any ES6 defaults
        .split(',').filter(Boolean).map(e => e.replace(")", "")).filter(e => e !== "");
};
