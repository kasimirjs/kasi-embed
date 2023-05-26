import {createScopeObject, KaScope, KaScopeType} from "../types";
import {isset} from "../functions";
import {ka_templatify} from "../tpl/templatify";
import {ka_html} from "../ce/html";
import {KaTemplate} from "../tpl/template";
import {KaCustomFragment} from "./KaCustomFragment";
import {KaCustomWrapper} from "./KaCustomWrapper";


export class KaCustomElement extends HTMLElement {
    public __html = "<div>No template defined</div>";

    protected readonly scope : KaScope = createScopeObject();
    protected tplPrototype : HTMLElement = null;
    protected wrapper : KaCustomWrapper = null;
    private tpl : HTMLElement

    public init<T extends KaScope>(scope : T) : KaScopeType | T | KaScope  {
        // Check template set by customElement annotation
        if (isset (this.constructor["html"]))
            this.__html = this.constructor["html"];

        if (this.tplPrototype === null) {
            this.tplPrototype = ka_templatify(ka_html(this.__html));
        }

        this.scope.init(scope);
        return this.scope;
    }

    protected wrap(fragment : KaCustomWrapper) {
        this.wrapper = fragment;
    }


    setParentScope(scope : KaScope) {
        this.scope.$parent = scope;
    }

    async connectedCallback() {
        this.setAttribute("ka.stop", "true");

        if ( ! this.scope.isInitialized())
            this.init({});

        this.tpl = this.tplPrototype.cloneNode(true) as HTMLElement;

        if (this.wrapper !== null) {
            this.append(this.wrapper.wrapTemplate(this.tpl));
            await this.wrapper.fragmentConnectedCallback();
        } else {
            this.append(this.tpl);
        }

        this.scope.$tpl = new KaTemplate(this.tpl);
    }

    disconnectedCallback() {
        this.scope.$tpl.dispose();
    }
}
