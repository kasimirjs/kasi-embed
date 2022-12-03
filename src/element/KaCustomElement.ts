import {KaScope} from "../types";
import {bindScope, isset} from "../functions";
import {ka_templatify} from "../tpl/templatify";
import {ka_html} from "../ce/html";
import {KaTemplate} from "../tpl/template";
import {ka_sleep} from "../core/sleep";


export class KaCustomElement extends HTMLElement {
    public __html = "<div>No template defined</div>";

    private __scope : KaScope

    public init<T extends KaScope>(scope : T) : T {
        // Check template set by customElement annotation
        if (isset (this.constructor.html))
            this.__html = this.constructor.html;

        let tpl = ka_templatify(ka_html(this.__html));
        this.append(tpl);

        this.__scope = bindScope(scope, new KaTemplate(tpl));
        return scope;
    }

    setParentScope(scope : KaScope) {
        this.__scope.$parent = scope;
    }

    async connectedCallback() {
        if (this.__scope === null)
            this.init({});

        // Allow parent Scope to be set.
        await ka_sleep(1);
        this.__scope.render();
    }

    disconnectedCallback() {
        if (isset(this.__scope))
            this.__scope.$tpl.dispose();
    }
}
