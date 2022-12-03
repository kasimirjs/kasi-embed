import {customElement, isset} from "../functions";
import {KaCustomFragment} from "./KaCustomFragment";
import {KaScope} from "../types";

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
    public use(val : HTMLElement, parentScope : KaScope) {
        if (val === this.myComponent)
            return;

        if (isset(val.setParentScope))
            val.setParentScope(parentScope);


        this.myComponent = val;
        this.innerHTML = "";

        if (val instanceof KaCustomFragment) {
            val.fragementConnectedCallback(this);
            return;
        }

        this.append(val);
    }

    disconnectedCallback() {

    }

    connectedCallback() {
        this.style.display = "contents";
        this.setAttribute("ka.stop", "true");
    }
}
