"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ka_dom_ready = void 0;
__exportStar(require("./core/sleep"), exports);
__exportStar(require("./core/create-element"), exports);
var dom_ready_1 = require("./core/dom-ready");
Object.defineProperty(exports, "ka_dom_ready", { enumerable: true, get: function () { return dom_ready_1.ka_dom_ready; } });
__exportStar(require("./decorators/custom-element"), exports);
__exportStar(require("./element/KaHtmlElement"), exports);
__exportStar(require("./ce/html"), exports);
