import {customElement} from "../functions";

@customElement("ka-use")
export class KaUse extends HTMLElement {

    private myComponent : HTMLElement;

    get component() : HTMLElement{
        return this.myComponent
    }

    set component(val: HTMLElement) {
        this.myComponent = val;
        this.innerHTML = "";
        this.append(val);
    }

    /**
     * called from ka.use="" by apply()
     *
     * @param val
     */
    public use(val : HTMLElement) {
        if (val === this.myComponent)
            return;
        this.myComponent = val;
        this.innerHTML = "";
        this.append(val);
    }

    disconnectedCallback() {

    }

    connectedCallback() {
        this.style.display = "contents";
        this.setAttribute("ka.stop", "true");
    }
}
