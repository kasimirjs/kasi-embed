var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @abstract
 * @class
 */
export class KaWidget {
    /**
     * Don't call this directly
     *
     * call await Widget.show() instead
     *
     * @private
     * @deprecated Use Widget.show() instead of constructor
     * @param autoAppendToElement
     */
    constructor(autoAppendToElement = window.document.body) {
        let self = this.constructor;
        /**
         *
         * @type {HTMLElement}
         */
        this.$element = document.createElement(self.options.elementName);
        /**
         *
         * @type {KaToolsV1.Template}
         */
        this.$tpl = null;
        this._globalClickEventHandler = null;
        let shadow = this.$element;
        if (self.options.shadowDom) {
            shadow = this.$element.attachShadow(self.options.shadowDomOptions);
        }
        this.readyPromise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let tpl = yield self.getTemplate();
            if (typeof tpl === "string")
                tpl = KaToolsV1.html(tpl);
            if (tpl !== null) {
                let t = KaToolsV1.templatify(tpl);
                shadow.append(t);
                this.$tpl = new KaToolsV1.Template(t);
            }
            yield this.__init();
            resolve();
        }));
        if (autoAppendToElement !== null) {
            autoAppendToElement.append(this.$element);
        }
        this._globalClickEventHandler = (e) => {
            if (KaToolsV1.getParentElement(this.$element, e.target) === null) {
                // Outside click
                this.destroy();
            }
        };
    }
    /**
     * @abstract
     * @interface
     * @return {{shadowDom: {boolean}, elementName: {string}, shadowDomOptions: {mode: 'open'}}}
     */
    static get options() {
        return { shadowDom: false, elementName: "ka-widget", shadowDomOptions: { mode: 'open' } };
    }
    /**
     *  Await the ready instance
     *
     * @static
     * @public
     * @return {Promise<this>}
     */
    static Load() {
        return __awaiter(this, void 0, void 0, function* () {
            let i = new this.prototype.constructor();
            yield i.ready();
            return i;
        });
    }
    /**
     * Called after initialization is complete (Template loaded etc)
     *
     * @abstract
     * @return {Promise<void>}
     */
    __init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield KaToolsV1.sleep(100);
            document.addEventListener("click", this._globalClickEventHandler);
        });
    }
    ready() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.readyPromise;
        });
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._globalClickEventHandler !== null)
                document.removeEventListener("click", this._globalClickEventHandler);
            this.$element.remove();
        });
    }
    /**
     * Return the HTMLTemplate
     *
     * @abstract
     * @return {HTMLTemplateElement}
     */
    static getTemplate() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
