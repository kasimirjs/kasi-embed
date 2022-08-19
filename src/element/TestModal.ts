import {KaModal} from "./KaModal";

export class TestModal extends KaModal {

    public show() {
        this.render({})


        return super.show();
    }

    public html = `<div>Hello World</div>` as any;

}
