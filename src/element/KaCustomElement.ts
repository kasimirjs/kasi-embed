import {createScopeObject, KaScope, KaScopeType} from "../types";
import {isset} from "../functions";
import {ka_templatify} from "../tpl/templatify";
import {ka_html} from "../ce/html";
import {KaTemplate} from "../tpl/template";


export class KaCustomElement extends HTMLElement {
    public __html = "<div>No template defined</div>";

    protected readonly scope : KaScope = createScopeObject();
    protected tplPrototype : HTMLElement = null;
    private tpl : HTMLElement

    public init<T extends KaScope>(scope : T) : KaScopeType | T | KaScope  {
        // Check template set by customElement annotation
        if (isset (this.constructor["html"]))
            this.__html = this.constructor["html"];

        if (this.tplPrototype === null)
            this.tplPrototype = ka_templatify(ka_html(this.__html));

        this.scope.init(scope);
        return this.scope;
    }

    setParentScope(scope : KaScope) {
        this.scope.$parent = scope;
    }

    async connectedCallback() {
        this.setAttribute("ka.stop", "true");

        if ( ! this.scope.isInitialized())
            this.init({});

        this.tpl = this.tplPrototype.cloneNode(true) as HTMLElement;
        this.append(this.tpl);
        this.scope.$tpl = new KaTemplate(this.tpl);
    }

    disconnectedCallback() {
        this.scope.$tpl.dispose();
    }
}
