
KaToolsV1.CustomElement = class extends HTMLElement {

    constructor(props) {
        super(props);
        /**
         *
         * @protected
         * @type {KaToolsV1.Template}
         */
        this.$tpl = null;
        this.__isConnected = false;
    }


    isConnected() {
        return this.isConnected;
    }

    async connectedCallback() {
        let callback = this.constructor.__callback;
        callback.bind(this);

        if (this.constructor.__tpl !== null) {
            let tpl = KaToolsV1.templatify(this.constructor.__tpl);
            this.appendChild(tpl);
            this.$tpl = new KaToolsV1.Template(tpl);
            console.log("Tpl is", tpl);
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

        console.log("trigger");
        callback(... await KaToolsV1.provider.arguments(callback, {
            "$this": this,
            "$tpl": this.$tpl
        }));
        this.__isConnected = true;
    }

};
