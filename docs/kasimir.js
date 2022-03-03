/* KasimirJS EMBED - documentation: https://kasimirjs.infracamp.org - Author: Matthias Leuffen <m@tth.es>*/

/* from core/init.js */
class KaToolsV1 {}

/* from core/dom-ready.js */
/**
 * Wait for DomContentLoaded or resolve immediate
 *
 * <example>
 * await MicxToolsVx.domReady();
 * </example>
 *
 * @return {Promise<string>}
 */
KaToolsV1.domReady = async ()=> {
    return new Promise((resolve) => {
        if (document.readyState === "complete" || document.readyState === "loaded")
            return resolve("loaded");
        document.addEventListener("DOMContentLoaded", ()=>resolve('DOMContentLoaded'));
    });
}

/* from core/query-select.js */
/**
 * Query a Element or trigger an Exception
 *
 * @param query
 * @param parent
 * @param exception
 * @return {HTMLElement}
 */
KaToolsV1.querySelector = (query, parent, exception) => {
    if (typeof exception === "undefined")
        exception = `querySelector '${query}' not found`
    if (typeof parent === "undefined" || parent === null)
        parent = document;
    let e = parent.querySelectorAll(query);
    if (e.length === 0) {
        console.warn(exception, "on parent: ", parent);
        throw exception;
    }
    return e[0];
}

/* from core/debounce.js */

KaToolsV1._debounceInterval = {i: null, time: null};

/**
 * Debounce a event
 *
 *
 *
 * @param min   Minimum Time to wait
 * @param max   Trigger event automatically after this time
 * @return {Promise<unknown>}
 */
KaToolsV1.debounce = async (min, max) => {
    let dbi = KaToolsV1._debounceInterval;
    return new Promise((resolve) => {
        if (dbi.time < (+new Date()) - max && dbi.i !== null) {
            return resolve();
        }
        if (dbi.i !== null) {
            return;
        }
        dbi.time = (+new Date());
        dbi.i = window.setTimeout(() => {
            dbi.i = null;
            return resolve('done');

        }, min);
    });

}

/* from tpl/template-element.js */
class KaToolsV1_TemplateElement extends HTMLElement {
'use strict';

    constructor() {
        super();

        this.tplChilds = [];
        this.tplNextSibling = null;

    }


    async pushElement(srcnode) {
        return new Promise((resolve) => {
            if (this.tplNextSibling === null)
                this.tplNextSibling = this.nextElementSibling;
            let e = null;
            if (typeof srcnode.cloneNode === "function")
                e = document.importNode(srcnode.cloneNode(true), true);
            else
                e = srcnode;
            let nodes = [];
            if (e instanceof DocumentFragment) {
                for (let node of e.childNodes.entries()) {
                    nodes.push(node[1]);
                    console.log("node", node[1]);
                }
            } else {
                nodes = [e];
            }
            this.tplChilds.push(nodes);
            for (let e of nodes) {
                console.log("pushing", e);
                e.kaTplOwner = this;
                if (e instanceof NodeList) {
                    for (let el of e)
                        this.parentElement.insertBefore(el, this.tplNextSibling);
                } else {
                    this.parentElement.insertBefore(e, this.tplNextSibling);
                }

            }
            resolve();
        })

    }


    async walkElements(nodes, $scope, mainTpl) {

        console.log("startWalk", nodes, typeof nodes, nodes.render);
        let list = [];
        if (nodes instanceof Array) {

            console.log("is Array!");
            list = nodes;
        } else if (nodes instanceof KaToolsV1_TemplateElement) {
            console.log("trigger render", nodes);
            nodes.render($scope, mainTpl);
        } else if (nodes instanceof HTMLElement) {
            list = nodes.children
        }else if (nodes instanceof NodeList) {
            list = nodes
        } else if (nodes instanceof Text) {
            return;
        } else {
            console.error("Undefined Element type in walkElements():", nodes);
            throw "Undefined Element type in walkElements():" + nodes;
        }
        console.log("Walking",  list, list.length);
        for (let i = 0; i<list.length; i++) {
            let e = list[i];
            await this.walkElements(e, $scope, mainTpl);
        }
    }


    async render($scope, mainTpl) {
        console.log ("Rendering ka-tpl:", this);
        let isMaintanied = false;
        for (let attrName of this.getAttributeNames()) {
            for(let regex in KaToolsV1_Template.prototype.functions) {
                console.log("regex", regex, attrName);
                if (attrName.match(regex)) {
                    isMaintanied = KaToolsV1_Template.prototype.functions[regex]($scope, this, attrName, this.getAttribute(attrName));
                    break;
                }
            }
        }
        if ( ! isMaintanied && this.tplChilds.length === 0) {
            await this.pushElement(this.childNodes);
            //await KaToolsV1.debounce(100,200);
            this.walkElements(this.childNodes, $scope, mainTpl);
        }
    }

    connectedCallback() {
        console.log("connected!!!!!!!!!!!");
        this.hidden = true;
    }
}

customElements.define("ka-tpl", KaToolsV1_TemplateElement);

/* from tpl/template.js */


class KaToolsV1_Template extends KaToolsV1_TemplateElement {

    render($scope) {
        //super.render($scope, this);
        console.log("array main", this.tplChilds);
        this.walkElements(this.tplChilds, $scope, this);
    }

    async connectedCallback() {
        super.connectedCallback();
        KaToolsV1_Template.instance = this;
        await KaToolsV1.domReady();
        console.log("appending", this, this.querySelector("template").content);
        this.pushElement(this.querySelector("template").content)
    }

}

/**
 * Reference to the last defined App-Template
 *
 * @type {KaToolsV1_Template}
 */
KaToolsV1_Template.instance = null;

customElements.define("ka-tpl-app", KaToolsV1_Template);

/* from tpl/template-attrs.js */
KaToolsV1_Template.prototype.functions = {};


KaToolsV1_Template.prototype.functions[/^\*for$/] = ($scope, tplElem, attrVal) => {
    console.log("applying for");
    return true; // For maintains the elements itself
}
