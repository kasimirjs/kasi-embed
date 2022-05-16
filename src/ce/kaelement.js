
class KaToolsV1_CustomElement extends HTMLElement {
    static __runMethod = "connected";

    constructor(props) {
        super(props);
        /**
         *
         * @protected
         * @type {KaV1Renderer}
         */
        this.$tpl = null;


        this.__isConnected = false;
    }


    isConnected() {
        return this.isConnected;
    }

    async connectedCallback() {
        console.log(this, this[this.constructor.__runMethod], this.constructor.__runMethod);
        let renderer = null;
        let callback = this.connected;
        callback.bind(this);

        if (this.constructor.__tpl !== null) {
            let tpl = KaToolsV1.templatify(this.constructor.__tpl);
            this.appendChild(tpl);
            this.$tpl = new KaV1Renderer(tpl);
        }
        if (this.constructor.__waitEvent !== null) {
            let wd = this.constructor.__waitEvent.split("@");
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
        console.log(callback);
        callback(... await KaToolsV1.provider.arguments(callback, {
            "$this": this,
            "$tpl": this.$tpl
        }));
        this.__isConnected = true;
    }

}
