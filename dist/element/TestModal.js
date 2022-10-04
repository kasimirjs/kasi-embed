import { KaModal } from "./KaModal";
export class TestModal extends KaModal {
    constructor() {
        super(...arguments);
        this.html = `<div>Hello World</div>`;
    }
    show() {
        this.render({});
        return super.show();
    }
}
