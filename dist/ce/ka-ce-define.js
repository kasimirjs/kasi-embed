var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ka_is_constructor } from "../core/is-constructor";
import { KaCustomElement } from "./custom-element";
/**
 * Define a new CustomElement
 *
 * @param elementName {string}
 * @param controller {function($tpl: KaToolsV1.Template, $this: KaToolsV1.CustomElement, $container: KaToolsV1.Container)}
 * @param template {HTMLTemplateElement|Promise<HTMLTemplateElement>}
 * @param options
 * @returns {Promise<void>}
 */
export function ka_ce_define(elementName, controller, template = null, options = { waitEvent: null, shadowDom: false, shadowDomOptions: { mode: 'open' } }) {
    return __awaiter(this, void 0, void 0, function* () {
        let opts = Object.assign({ waitEvent: null, shadowDom: false, shadowDomOptions: { mode: 'open' } }, options);
        template = yield template;
        let ctrlClass = null;
        if (ka_is_constructor(controller)) {
            ctrlClass = controller;
            ctrlClass.__callback = null;
        }
        else {
            ctrlClass = class extends KaCustomElement {
            };
            ctrlClass.__callback = controller;
        }
        ctrlClass.__tpl = template;
        ctrlClass.__options = opts;
        customElements.define(elementName, ctrlClass);
    });
}
