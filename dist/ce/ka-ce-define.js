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
exports.ka_ce_define = void 0;
const is_constructor_1 = require("../core/is-constructor");
const custom_element_1 = require("./custom-element");
/**
 * Define a new CustomElement
 *
 * @param elementName {string}
 * @param controller {function($tpl: KaToolsV1.Template, $this: KaToolsV1.CustomElement, $container: KaToolsV1.Container)}
 * @param template {HTMLTemplateElement|Promise<HTMLTemplateElement>}
 * @param options
 * @returns {Promise<void>}
 */
function ka_ce_define(elementName, controller, template = null, options = { waitEvent: null, shadowDom: false, shadowDomOptions: { mode: 'open' } }) {
    return __awaiter(this, void 0, void 0, function* () {
        let opts = Object.assign({ waitEvent: null, shadowDom: false, shadowDomOptions: { mode: 'open' } }, options);
        template = yield template;
        let ctrlClass = null;
        if ((0, is_constructor_1.ka_is_constructor)(controller)) {
            ctrlClass = controller;
            ctrlClass.__callback = null;
        }
        else {
            ctrlClass = class extends custom_element_1.KaCustomElement {
            };
            ctrlClass.__callback = controller;
        }
        ctrlClass.__tpl = template;
        ctrlClass.__options = opts;
        customElements.define(elementName, ctrlClass);
    });
}
exports.ka_ce_define = ka_ce_define;
