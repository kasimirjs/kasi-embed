import {createScopeObject, KaScope} from "../types";
import {bindScope, isset} from "../functions";
import {ka_templatify} from "../tpl/templatify";
import {ka_html} from "../ce/html";
import {KaTemplate} from "../tpl/template";
import {ka_sleep} from "../core/sleep";


export class KaCustomFragment {
    protected readonly scope : KaScope = createScopeObject();
    protected html : string = null
    private tplPrototype : HTMLElement
    private tpl : HTMLElement

    public init<T extends KaScope>(scope : T) : T | KaScope {
        // Check template set by customElement annotation
        if (isset(this.constructor["html"]) && this.html === null)
            this.html = this.constructor["html"];

        if ( ! isset (this.tplPrototype))
            this.tplPrototype = ka_templatify(ka_html(this.html));

        this.scope.init(scope);

        return this.scope;
    }


    setParentScope(scope : KaScope) {
        this.scope.$parent = scope;
    }

    setScope(scope : KaScope) {
        this.scope.importFrom(scope);
    }

    async fragementConnectedCallback(parentElement : HTMLElement) {
        parentElement.setAttribute("ka.stop", "true");

        if ( ! this.scope.isInitialized()) {
           this.init({});
        }

        this.tpl = this.tplPrototype.cloneNode(true) as HTMLElement;
        this.scope.$tpl = new KaTemplate(this.tpl);
        parentElement.append(this.tpl);

        await ka_sleep(1);
        this.scope.render();
    }

    fragmentDisconnectedCallback() {
        this.scope.$tpl.dispose();
    }
}
