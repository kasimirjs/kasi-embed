import {KaToolsV1} from "../core/init";

KaToolsV1.CustomElement = class extends HTMLElement {

    constructor(props) {
        super(props);

        /**
         *
         * @public
         * @property $tpl {KaToolsV1.Template}
         * @var {KaToolsV1.Template}
         */
        this.__tpl = null;

        /**
         *
         * @type {KaToolsV1.EventDispatcher}
         * @private
         */
        this.__eventDispatcher = null;
        this.__isConnected = false;
    }

    /**
     * The Template associated with this Element
     *
     * @return {KaToolsV1.Template}
     */
    get $tpl () {
        return this.__tpl
    }

    /**
     * Get the application internal event dispatcher
     *
     * @returns {KaToolsV1.EventDispatcher}
     */
    get $eventDispatcher () {
        return this.__eventDispatcher
    }

    isConnected() {
        return this.isConnected;
    }

    /**
     * @abstract
     * @return {Promise<void>}
     */
    async connected() {
        console.warn("connected() method not overridden in", this);
    }

    async connectedCallback() {

        this.__eventDispatcher = await KaToolsV1.provider.get("$bus");
        let callback = this.constructor.__callback;
        if (callback === null) {
        } else {
            callback.bind(this);
        }

        if (this.constructor.__tpl !== null) {
            let origTpl = this.constructor.__tpl;
            if (origTpl instanceof KaToolsV1.RemoteTemplate)
                origTpl = await origTpl.load();

            let tpl = KaToolsV1.templatify(origTpl);

            if (this.constructor.__options.shadowDom === true) {
                let shadowDom = this.attachShadow(this.constructor.__options.shadowDomOptions);
                shadowDom.appendChild(tpl);
            } else {
                this.appendChild(tpl);
            }

            this.__tpl = new KaToolsV1.Template(tpl);
        }

        if (this.constructor.__options.waitEvent !== null) {
            let wd = this.constructor.__options.waitEvent.split("@");
            let eventName = wd[0];
            let target = document;
            if (wd.length === 2) {
                target = KaToolsV1.querySelector(wd[1]);
            }
            target.addEventListener(eventName, async (event) => {
                callback(... await KaToolsV1.provider.arguments(callback, {
                    "$this": this,
                    "$tpl": this.$tpl,
                    "$event": event
                }));
                this.__isConnected = true;
            })
            return;
        }

        if (callback === null) {
            // Class: Call connected() Method
            this.connected(...await KaToolsV1.provider.arguments(this.connected, {
                "$this": this,
                "$tpl": this.$tpl
            }));
            this.__isConnected = true;
            return
        }

        // Function
        callback(... await KaToolsV1.provider.arguments(callback, {
            "$this": this,
            "$tpl": this.$tpl
        }));
        this.__isConnected = true;
    }

};
