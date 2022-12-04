import {createScopeObject, KaScope} from "../types";
import {bindScope, isset} from "../functions";
import {ka_templatify} from "../tpl/templatify";
import {ka_html} from "../ce/html";
import {KaTemplate} from "../tpl/template";
import {ka_sleep} from "../core/sleep";


export class KaCustomFragment {
    protected readonly __scope : KaScope = createScopeObject();
    private __html = "<div>No Template defined</div>"
    private tplPrototype : HTMLElement
    private tpl : HTMLElement

    public init<T extends KaScope>(scope : T) : T | KaScope {
        // Check template set by customElement annotation
        if (isset(this.constructor["html"]))
            this.__html = this.constructor["html"];

        if ( ! isset (this.tplPrototype))
            this.tplPrototype = ka_templatify(ka_html(this.__html));

        this.__scope.init(scope);

        return this.__scope;
    }


    setParentScope(scope : KaScope) {
        this.__scope.$parent = scope;
    }

    setScope(scope : KaScope) {
        this.__scope.importFrom(scope);
    }

    async fragementConnectedCallback(parentElement : HTMLElement) {
        if ( ! this.__scope.isInitialized()) {
           this.init({});
        }

        this.tpl = this.tplPrototype.cloneNode(true) as HTMLElement;
        this.__scope.$tpl = new KaTemplate(this.tpl);
        parentElement.append(this.tpl);

        await ka_sleep(1);
        this.__scope.render();
    }

    fragmentDisconnectedCallback() {
        this.__scope.$tpl.dispose();
    }
}
