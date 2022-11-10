"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _KaModal_main, _KaModal_configDefaults, _KaModal_promise;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KaModal = void 0;
const template_1 = require("../tpl/template");
const create_element_1 = require("../core/create-element");
const html_js_1 = require("../ce/html.js");
const templatify_js_1 = require("../tpl/templatify.js");
class KaModal {
    constructor(tagName = "ka-modal", shadowRootInit = null, modalConfig = {}) {
        _KaModal_main.set(this, void 0);
        this.$tpl = null;
        _KaModal_configDefaults.set(this, {
            parentElement: document.body,
            zIndex: 9999,
            styleBase: "position:fixed; top:0; bottom:0; left:0; right:0;",
            styleBackdrop: "background-color: #999;opacity:0.5;",
            maxWidth: 800,
        });
        _KaModal_promise.set(this, {
            promise: null,
            reject: null,
            resolve: null,
        });
        let config = __classPrivateFieldGet(this, _KaModal_configDefaults, "f");
        config = Object.assign(Object.assign({}, config), modalConfig);
        this.element = (0, create_element_1.ka_create_element)(tagName, { hidden: "hidden" }, null, config.parentElement);
        this.backdrop = (0, create_element_1.ka_create_element)("div", { style: `${config.styleBase};${config.styleBackdrop};z-index:${config.zIndex};` }, null, this.element);
        let master = (0, create_element_1.ka_create_element)("div", { style: `position:fixed;left:0;right:0;display:flex;justify-content:center;z-index:${config.zIndex + 1};` }, null, this.element);
        __classPrivateFieldSet(this, _KaModal_main, (0, create_element_1.ka_create_element)("div", { style: `;max-height:100%;max-width:100%;` }, null, master), "f");
        this.adjustWidth(config);
        __classPrivateFieldGet(this, _KaModal_promise, "f").promise = new Promise((resolve, reject) => { __classPrivateFieldGet(this, _KaModal_promise, "f").resolve = resolve; __classPrivateFieldGet(this, _KaModal_promise, "f").reject = reject; });
    }
    adjustWidth(modalConfig) {
        let w = window.innerWidth;
        if (w > modalConfig.maxWidth)
            w = modalConfig.maxWidth;
        __classPrivateFieldGet(this, _KaModal_main, "f").style.width = w + "px";
    }
    render(scope = null) {
        if (this.$tpl === null) {
            let html = this.html;
            if (typeof html === "string") {
                html = (0, html_js_1.ka_html)(html);
            }
            let elem = (0, templatify_js_1.ka_templatify)(html);
            __classPrivateFieldGet(this, _KaModal_main, "f").appendChild(elem);
            this.$tpl = new template_1.KaTemplate(elem);
        }
        console.log("render", this);
        this.$tpl.render(scope);
    }
    resolve(...params) {
        this.element.remove();
        __classPrivateFieldGet(this, _KaModal_promise, "f").resolve(...params);
    }
    show() {
        this.element.removeAttribute("hidden");
        return __classPrivateFieldGet(this, _KaModal_promise, "f").promise;
    }
}
exports.KaModal = KaModal;
_KaModal_main = new WeakMap(), _KaModal_configDefaults = new WeakMap(), _KaModal_promise = new WeakMap();
