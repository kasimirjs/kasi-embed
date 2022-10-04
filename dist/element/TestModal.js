"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestModal = void 0;
const KaModal_1 = require("./KaModal");
class TestModal extends KaModal_1.KaModal {
    constructor() {
        super(...arguments);
        this.html = `<div>Hello World</div>`;
    }
    show() {
        this.render({});
        return super.show();
    }
}
exports.TestModal = TestModal;
