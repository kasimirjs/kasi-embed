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
export function customElement(tagName : string|null = null, template : string = null) {
    return function (classOrDescriptor: any) : void {
        if (template !== null) {
            classOrDescriptor["html"] = template;
        }

        if (window["_kasi_defined_custom_elements"] === undefined) {
            window["_kasi_defined_custom_elements"] = [];
        }
        if (tagName === null) {
            if (window["_kasi_anon_element_id"] === undefined) {
                window["_kasi_anon_element_id"] = 0;
            }
            tagName = "kasimirjs-anon-element-" + window["_kasi_anon_element_id"]++;
        }

        //console.debug("registering custom element", classOrDescriptor, tagName);
        if ( ! window["_kasi_defined_custom_elements"].includes(tagName) ) {
            customElements.define(tagName, classOrDescriptor);
            window["_kasi_defined_custom_elements"].push(tagName);
        }


        return classOrDescriptor;
    }
}


export async function ka_await_element(selector : string, parent : ParentNode = document,  maxWait : number = 2000) : Promise<HTMLElement> {
    let elem = parent.querySelector(selector);
    let rounds = 1;
    while(elem === null && maxWait > 0) {
        let delay = 20 * rounds++;
        await ka_sleep(delay);
        elem = parent.querySelector(selector);
        maxWait -= delay;
    }
    return elem as HTMLElement;
}



export function template(template : string | HTMLTemplateElement) {
     return function (classOrDescriptor: any) : void {

         classOrDescriptor["html"] = template;

         return classOrDescriptor;
     }
}


export function random_string(len : number = 12) : string {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < len; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
