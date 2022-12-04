import {createScopeObject, KaScope} from "../types";
import {bindScope, isset} from "../functions";
import {ka_templatify} from "../tpl/templatify";
import {ka_html} from "../ce/html";
import {KaTemplate} from "../tpl/template";
import {ka_sleep} from "../core/sleep";


export class KaCustomElement extends HTMLElement {
    public __html = "<div>No template defined</div>";

    protected readonly __scope : KaScope = createScopeObject();
    protected tplPrototype : HTMLElement = null;
    private tpl : HTMLElement

    public init<T extends KaScope>(scope : T) : T | KaScope {
        // Check template set by customElement annotation
        if (isset (this.constructor["html"]))
            this.__html = this.constructor["html"];

        if (this.tplPrototype === null)
            this.tplPrototype = ka_templatify(ka_html(this.__html));

        this.__scope.init(scope);
        return this.__scope;
    }

    setParentScope(scope : KaScope) {
        this.__scope.$parent = scope;
    }

    async connectedCallback() {
        if ( ! this.__scope.isInitialized())
            this.init({});

        this.tpl = this.tplPrototype.cloneNode(true) as HTMLElement;
        this.append(this.tpl);
        this.__scope.$tpl = new KaTemplate(this.tpl);
    }

    disconnectedCallback() {
        this.__scope.$tpl.dispose();
    }
}
