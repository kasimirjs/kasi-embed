import {customElement, isset, random_string} from "../functions";
import {KaCustomFragment} from "./KaCustomFragment";
import {KaScope} from "../types";

@customElement("ka-use-" + random_string().toLowerCase())
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


        if (isset(val["setParentScope"]))
            val["setParentScope"](parentScope);

        this.myComponent = val;
        this.innerHTML = "";

        // If not specified scope is the parent scope.
        if ( ! this.hasAttribute("ka.scope"))
            val["setScope"](parentScope);

        if (val instanceof KaCustomFragment) {
            val.fragmentConnectedCallback(this);
            return;
        }

        this.append(val);
    }

    /**
     * set dedicated scope using ka.scope
     *
     * @param scope
     */
    public setScope(scope : KaScope) {
        if (this.myComponent instanceof KaCustomFragment) {
            this.myComponent.setScope(scope);
        }
    }

    disconnectedCallback() {

    }

    connectedCallback() {
        this.style.display = "contents";
        this.setAttribute("ka.stop", "true");
        if (this.myComponent instanceof KaCustomFragment) {
            this.myComponent.fragmentConnectedCallback(this);
        }
    }
}
