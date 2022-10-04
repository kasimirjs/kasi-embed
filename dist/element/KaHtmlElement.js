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
exports.KaHtmlElement = void 0;
const template_1 = require("../tpl/template");
const templatify_1 = require("../tpl/templatify");
const html_1 = require("../ce/html");
class KaHtmlElement extends HTMLElement {
    constructor(shadowRootInit = null) {
        super();
        this.shadowRootInit = shadowRootInit;
        this.addEventListener("load", (e) => console.log(e));
    }
    connectedCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            let htmlTpl;
            if (typeof this.html === "function") {
                let fn = this.html;
                htmlTpl = yield fn(this);
            }
            if (typeof htmlTpl === "string")
                htmlTpl = (0, html_1.ka_html)(htmlTpl);
            let attachTo = this;
            if (this.shadowRootInit !== null) {
                attachTo = this.attachShadow(this.shadowRootInit);
            }
            if (this.html !== null) {
                let tpl = (0, templatify_1.ka_templatify)(htmlTpl);
                this.$tpl = new template_1.KaTemplate(tpl);
                attachTo.appendChild(tpl);
            }
            this.connected();
        });
    }
    disconnectedCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            this.disconnected();
        });
    }
}
exports.KaHtmlElement = KaHtmlElement;
