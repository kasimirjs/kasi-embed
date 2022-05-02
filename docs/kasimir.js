/* KasimirJS EMBED - documentation: https://kasimirjs.infracamp.org - Author: Matthias Leuffen <m@tth.es>*/

/* from core/init.js */
class KaToolsV1 {}

/**
 * The last element started by Autostarter
 * @type {HTMLElement|HTMLScriptElement}
 */
let KaSelf = null;

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
KaToolsV1.debounce = async (min, max=null) => {
    if (max === null)
        max = min;
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

/* from core/eval.js */


KaToolsV1.eval = (stmt, __scope, e, __refs) => {
    const reserved = ["var", "null", "let", "const", "function", "class", "in", "of", "for", "true", "false", "await", "$this"];
    let r = "var $this = e;";
    for (let __name in __scope) {
        if (reserved.indexOf(__name) !== -1)
            continue;
        if (__name.indexOf("-") !== -1) {
            console.error(`Invalid scope key '${__name}': Cannot contain - in scope:`, __scope);
            throw `eval() failed: Invalid scope key: '${__name}': Cannot contain minus char '-'`;
        }
        r += `var ${__name} = __scope['${__name}'];`
    }
    // If the scope was cloned, the original will be in $scope. This is important when
    // Using events [on.click], e.g.
    if (typeof __scope.$scope === "undefined") {
        r += "var $scope = __scope;";
    }
    try {
        // console.log(r + '(' + stmt + ')');
        return eval(r  + '('+stmt+')')
    } catch (ex) {
        console.error("cannot eval() stmt: '" + stmt + "': " + ex + " on element ", e, "(context:", __scope, ")");
        throw "eval('" + stmt + "') failed: " + ex;
    }
}

/* from core/quick-template.js */

class KaToolsV1_QuickTemplate {

    constructor(selector) {
        if (typeof selector === "string")
            selector = KaToolsV1.querySelector(selector);
        this.template = selector;
        if ( ! this.template instanceof HTMLTemplateElement) {
            let error = "KaToolsV1_QuickTemplate: Parameter 1 is no <template> element. Selector: " + selector + "Element:" + this.template
            console.warn(error);
            throw error;
        }
        this._tplElem = document.createElement("template");
    }


    appendTo(selector, $scope) {
        if (typeof selector === "string")
            selector = KaToolsV1.querySelector(selector);

        let outerHtml = this.template.innerHTML;
        this._tplElem.innerHTML = outerHtml.replaceAll(/\[\[(.*?)\]\]/ig, (matches, stmt)=>{
            try {
                return KaToolsV1.eval(stmt, $scope)
            } catch (e) {
                console.error(`KaToolsV1_QuickTemplate: Error evaling stmt '${stmt}' on element `, this.template, "$scope:", $scope, "Error:", e);
                throw e;
            }
        });

        selector.append(document.importNode(this._tplElem.content, true));
    }

}

/* from core/apply.js */

KaToolsV1.apply = (selector, scope, recursive=false) => {
    if (typeof selector === "string")
        selector = KaToolsV1.querySelector(selector);

    let attMap = {
        "textcontent": "textContent",
        "htmlcontent": "htmlContent"
    }

    for(let attName of selector.getAttributeNames()) {
        //console.log(attName);
        if ( ! attName.startsWith("kap:")) {
            continue;
        }

        let attVal = selector.getAttribute(attName);

        let attType = attName.split(":")[1];
        let attSelector = attName.split(":")[2];
        if (typeof attSelector === "undefined")
            attSelector = null;

        let r = KaToolsV1.eval(attVal, scope, selector);

        switch (attType) {
            case "classlist":
                if (attSelector  !== null) {
                    if (r === true) {
                        selector.classList.add(attSelector)
                    } else {
                        selector.classList.remove(attSelector)
                    }
                    break;
                }
                for (let cname in r) {
                    if (r[cname] === true) {
                        selector.classList.add(cname);
                    } else {
                        selector.classList.remove(cname);
                    }
                }
                break;

            case "bind":
                selector.value = typeof r !== "undefined" ? r : "";
                if (typeof selector._kap_bind === "undefined") {
                    selector.addEventListener("change", () => {
                        scope = {$scope: scope, ...scope, __curVal: selector.value}
                        KaToolsV1.eval(`${attVal} = __curVal`, scope, selector);
                        console.log("changed", selector.value);
                    })
                    selector.addEventListener("keyup", () => {
                        scope = {$scope: scope,...scope, __curVal: selector.value}
                        KaToolsV1.eval(`${attVal} = __curVal`, scope, selector);
                    })
                    selector._kap_bind = true;
                }

                break;

            case "options":
                console.log(selector, selector.value);
                let value = selector.value;
                selector.options.length = 0;
                for (let option in r) {
                    if (isNaN(option)) {
                        selector.options.add(new Option(r[option], option));
                    } else {
                        if (typeof r[option].text !== "undefined") {
                            selector.options.add(new Option(r[option].text, r[option].value));
                        } else {
                            selector.options.add(new Option(r[option], r[option]));
                        }
                    }
                }
                if (value !== null)
                    selector.value = value;
                break;

            case "attr":
                if (attSelector  !== null) {
                    if (r === null || r === false) {
                        selector.removeAttribute(attSelector)
                    } else {
                        selector.setAttribute(attSelector, r);
                    }
                    break;
                }
                for (let cname in r) {
                    if (r[cname] ===null || r[cname] === false) {
                        selector.removeAttribute(cname);
                    } else {
                        selector.setAttribute(cname, r[cname]);
                    }
                }
                break;

            default:
                if (typeof attMap[attType] !== "undefined")
                    attType = attMap[attType];
                if (typeof selector[attType] === "undefined") {
                    console.warn("apply(): trying to set undefined property ", attType, "on element", selector);
                }
                selector[attType] = r;
                break;
        }



    }
    if (recursive) {
        for (let e of selector.children) {
            KaToolsV1.apply(e, scope, recursive);
        }
    }
}

/* from core/elwalk.js */
/**
 *
 * @param {HTMLElement} elem
 * @param fn
 * @param recursive
 */
KaToolsV1.elwalk = (elem, fn, recursive=false, includeTemplates=false) => {
    if (Array.isArray(elem))
        elem.children = elem;
    if (typeof elem.children === "undefined")
        return;
    if (includeTemplates) {
        if (elem instanceof HTMLTemplateElement)
            child = elem.content
    }
    for(let child of elem.children) {
        let ret = fn(child);
        if (ret === false)
            continue; // No recursiion

        if (recursive && typeof child.children !== "undefined")
            KaToolsV1.elwalk(child, fn, recursive);

    }
}

/* from tpl/templatify.js */

KaToolsV1._ka_el_idx = 0;
/**
 *
 * @param {HTMLElement} elem
 * @return {HTMLTemplateElement}
 */
KaToolsV1.templatify = (elem, returnMode=true) => {

    if (returnMode) {
        let returnTpl = document.createElement("template");
        returnTpl.setAttribute("_kaidx", (KaToolsV1._ka_el_idx++).toString())
        /* @var {HTMLTemplateElement} returnTpl */
        returnTpl.innerHTML = elem.innerHTML;
        KaToolsV1.templatify(returnTpl.content, false);
        return returnTpl;
    }

    if (elem instanceof HTMLTemplateElement)
        elem = elem.content;

    let wrapElem = (el, attName, attVal) => {
        let tpl = document.createElement("template");
        tpl.setAttribute("_kaidx", (KaToolsV1._ka_el_idx++).toString())
        let clonedEl = el.cloneNode(true);
        clonedEl.removeAttribute(attName);
        tpl.content.append(clonedEl);
        tpl.setAttribute(attName, attVal);
        el.replaceWith(tpl);
        return tpl;
    }

    KaToolsV1.elwalk(elem, (el) => {
        console.log(el);
        if ( ! el instanceof HTMLElement)
            return;
        let tpl = null;
        for (let attrName of el.getAttributeNames()) {
            if (attrName === "ka:for") {
                tpl = wrapElem(el, "ka:for", el.getAttribute("ka:for"));
                KaToolsV1.templatify(tpl, false);
                break;
            }
            if (attrName === "ka:if") {
                tpl = wrapElem(el, "ka:if", el.getAttribute("ka:if"));
                KaToolsV1.templatify(tpl, false);
                break;
            }
        }
    }, true, false);
}

/* from tpl/renderer.js */



class KaV1Renderer {

    constructor(template) {
        this.template = template;
        if (typeof this.template.__kachilds === "undefined")
            this.template.__kachilds = [];
        if (typeof this.template.__kasibling === "undefined")
            this.template.__kasibling = this.template.nextElementSibling;
    }

    _error(msg) {
        console.error(`[ka-template] ${msg} on element`, this.template);
        throw `[ka-template] ${msg} on element` + this.template;
    }

    _appendTemplate() {
        let elements = this.template.content;

        let elList = [];
        for (let curE of elements.children) {
            curE = curE.cloneNode(true);
            curE._ka_maintained_by = this.template.getAttribute("_kaidx");
            elList.push(curE);
            this.template.parentNode.insertBefore(curE, this.template.__kasibling);
        }
        this.template.__kachilds.push(elList);
    }

    _removeLastChild() {
        if (this.template.__kachilds.length === 0)
            return;
        let childs = this.template.__kachilds[this.template.__kachilds.length - 1];
        for (let curE of childs) {
            this.template.parentElement.removeChild(curE);
        }
        this.template.__kachilds.length = this.template.__kachilds.length - 1;

    }

    _renderFor($scope, stmt) {
        //console.log("kachilds", this.template.__kachilds);


        let matches = stmt.match(/^(let)\s+(?<target>.+)\s+(?<type>of|in)\s+(?<select>.+)$/);
        if (matches === null) {
            this._error(`Can't parse ka:for='${stmt}'`);
        }
        let selectVal = KaToolsV1.eval(matches.groups.select, $scope, this.template);
        let eIndex = 0;
        for (let index in selectVal) {
            let curScope = {$scope: $scope, ...$scope};
            curScope[matches.groups.target] = index;

            if (matches.groups.type === "of")
                curScope[matches.groups.target] = selectVal[index];

            if (this.template.__kachilds.length < eIndex + 1) {
                //console.log("append", eIndex, this.template.__kachilds.length);
                this._appendTemplate();
            }
            this._maintain(curScope, this.template.__kachilds[eIndex]);
            eIndex++;
        }

    }

    _maintain($scope, childs) {
        for (let child of childs) {
            KaToolsV1.elwalk(child, (el) => {
                //console.log("walk", el);
                if (el instanceof HTMLTemplateElement) {
                    //console.log("maintain", el);
                    let r = new KaV1Renderer(el);
                    r.render($scope);
                    return false;
                }

                if (typeof el._ka_maintained_by !== "undefined" && el._ka_maintained_by !== this.template.getAttribute("_kaidx")) {
                    return false;
                }

                KaToolsV1.apply(el, $scope);

            }, true);
        }
    }


    _renderIf($scope, stmt) {
         let selectVal = KaToolsV1.eval(stmt, $scope, this.template);
         if (selectVal === true && this.template.__kachilds.length === 0) {
             this._appendTemplate();
             this._maintain($scope, this.template.__kachilds[0]);
         } else {
             this._removeLastChild();
         }
    }


    render($scope) {
        if (this.template.hasAttribute("ka:for")) {
            this._renderFor($scope, this.template.getAttribute("ka:for"));
        } else if (this.template.hasAttribute("ka:if")) {
            this._renderIf($scope, this.template.getAttribute("ka:if"));
        } else {
            if (typeof this.template._ka_active === "undefined") {
                this._appendTemplate();
                this.template._ka_active = true;
            }
            this._maintain($scope, this.template.__kachilds);
        }
    }
}

/* from core/autostart.js */

(async ()=>{
    await KaToolsV1.domReady();

    // Unescape entities replaced by jekyll template engine
    for (let e of document.querySelectorAll("template[ka-unescape]")) {
        let data = e.innerHTML;
        e.innerHTML = data.replaceAll("&lt;", "<")
            .replaceAll("&amp;", "&")
            .replaceAll("&gt;", ">");
    }

    for (let e of document.querySelectorAll("template[ka-autostart]")) {
        let ne = document.importNode(KaToolsV1.querySelector("script", e.content), true).cloneNode(true);
        KaSelf = ne;
        if (e.nextElementSibling === null) {
            ne.parentNode.append(ne);
            continue;
        }
        e.parentNode.insertBefore(ne, e.nextElementSibling);
    }
})()

/* from core/router.js */

