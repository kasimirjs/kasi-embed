"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ka_html = void 0;
function ka_html(htmlContent) {
    let e = document.createElement("template");
    e.innerHTML = htmlContent;
    return e;
}
exports.ka_html = ka_html;
