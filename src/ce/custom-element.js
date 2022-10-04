import {ka_templatify} from "../tpl/templatify.js";
import {KaTemplate} from "../tpl/template.js";
import {ka_query_selector} from "../core/query-select.js";
import {RemoteTemplate} from "./htmlFile.ts";

export class KaCustomElement extends HTMLElement {

    constructor(props) {
        super(props);

        /**
         *
         * @protected
         * @var {KaTemplate}
         */
        this.__tpl = null;

        this.__isConnected = false;
    }

    /**
     * The Template associated with this Element
     *
     * @return {KaTemplate}
     */
    get $tpl () {
        return this.__tpl
    }

    isConnected() {
        return this.isConnected;
    }

    /**
     * @abstract
     * @return {Promise<void>}
     */
    async connected($tpl, $this) {
        console.warn("connected() method not overridden in", this);
    }

    async connectedCallback() {
        let callback = this.constructor.__callback;
        if (callback === null) {
        } else {
            callback.bind(this);
        }

        if (this.constructor.__tpl !== null) {
            let origTpl = this.constructor.__tpl;
            if (origTpl instanceof RemoteTemplate)
                origTpl = await origTpl.load();

            let tpl = ka_templatify(origTpl);

            if (this.constructor.__options.shadowDom === true) {
                let shadowDom = this.attachShadow(this.constructor.__options.shadowDomOptions);
                shadowDom.appendChild(tpl);
            } else {
                this.appendChild(tpl);
            }

            this.__tpl = new KaTemplate(tpl);
        }

        if (this.constructor.__options.waitEvent !== null) {
            let wd = this.constructor.__options.waitEvent.split("@");
            let eventName = wd[0];
            let target = document;
            if (wd.length === 2) {
                target = ka_query_selector(wd[1]);
            }
            target.addEventListener(eventName, async (event) => {
                callback(this.$tpl, this);
                this.__isConnected = true;
            })
            return;
        }

        if (callback === null) {
            // Class: Call connected() Method
            await this.connected(this.$tpl, this);
            this.__isConnected = true;
            return
        }

        // Function
        callback(this.$tpl, this);
        this.__isConnected = true;
    }

};
