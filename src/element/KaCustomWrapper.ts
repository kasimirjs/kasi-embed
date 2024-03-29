import {createScopeObject, KaScope} from "../types";
import {isset} from "../functions";
import {ka_templatify} from "../tpl/templatify";
import {ka_html} from "../ce/html";
import {KaTemplate} from "../tpl/template";
import {ka_sleep} from "../core/sleep";
import {ka_create_element} from "../core/create-element";


export class KaCustomWrapper {
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


    private returnedTpl : HTMLElement;

    public wrapTemplate(tpl : HTMLElement) : HTMLElement {
        this.scope.$content = tpl;
        return this.tpl;
    }

    async fragmentConnectedCallback() {
        if ( ! this.scope.isInitialized()) {
           this.init({});
        }
        this.returnedTpl = this.tplPrototype;

        this.tpl = this.tplPrototype.cloneNode(true) as HTMLElement;
        this.scope.$tpl = new KaTemplate(this.tpl);
    }

    public async wrapFinish() {
        this.scope.render();
    }

    fragmentDisconnectedCallback() {
        this.scope.$tpl.dispose();
    }
}
