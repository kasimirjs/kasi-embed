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


/**
 * Check if parameter is undefined or null
 *
 * @param input
 */
export function isset(input : any) : boolean {
    return  (typeof input !== "undefined" && input !== null)
}


/**
 * Bind a scope to a template and re-render the template whenever
 * the scope changes.
 *
 * If deep is not explicit set to true, only changes on the root
 * object are observed.
 *
 * @param scopedef
 * @param template
 * @param deep
 */
export function bindScope<T extends KaScope>(scopedef : T, template: KaTemplate, deep: boolean = false) : T {
    scopedef.$tpl = template;
    scopedef.render = () : T => {
        template.render(proxy);
        return proxy;
    }

    let proxy = new Proxy(scopedef, {
        get(target : any, prop : string, receiver: RTCRtpReceiver) {
            if (prop.startsWith("$"))
                return target[prop];
            return target[prop];
        },
        set(target: any, p: string, value: any, receiver: any) : boolean {
            (async() => {
                if (target[p] === value)
                    return true; // Nothing changed

                target[p] = value;
                await ka_debounce(1,1);
                template.render(proxy);
            })()
            return true;
        }
    });
    return proxy as T;
}


/**
 * Bind a template to a scope
 *
 * @param template
 */
export function bindTemplate(template : KaTemplate) {
    return function (target : KaScope) : KaScope {
        return bindScope(target, template);
    }
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
