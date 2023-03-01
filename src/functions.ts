/**
 * Check if parameter 1 is undefined or null
 *
 * @param input
 */
import {KaScope} from "./types";
import {KaTemplate} from "./tpl/template";
import {ka_debounce} from "./core/debounce";
import {ka_templatify} from "./tpl/templatify";
import {ka_html} from "./ce/html";
import {ka_sleep} from "./core/sleep";


/**
 * Check if parameter is undefined or null
 *
 * @param input
 */
export function isset(input : any) : boolean {
    return  (typeof input !== "undefined" && input !== null)
}

export function isUndefined(input : any) : boolean {
    return (typeof input === "undefined");
}

/**
 * Defines a customElement
 *
 * Usage as class decorator @customElement("some-tag")
 *
 * @param tagName
 */
export function customElement(tagName : string, template : string = null) {
    return function (classOrDescriptor: any) : void {
        if (template !== null) {
            console.log("set template", template);
            classOrDescriptor.html = template;
        }

        console.debug("registering custom element", classOrDescriptor, tagName);
        customElements.define(tagName, classOrDescriptor);
        return classOrDescriptor;
    }
}


export function template(template : string | HTMLTemplateElement) {
     return function (classOrDescriptor: any) : void {

         classOrDescriptor.html = template;

         return classOrDescriptor;
     }
}
