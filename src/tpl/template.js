import {ka_eval} from "../core/eval.js";
import {ka_elwalk} from "../core/elwalk.js";
import {ka_apply} from "../core/apply.js";
import {KaCustomElement} from "../ce/custom-element.js";


export class KaTemplate {

    constructor(template) {
        this.template = template;
        if (typeof this.template.__kachilds === "undefined")
            this.template.__kachilds = [];
        if (typeof this.template.__kasibling === "undefined")
            this.template.__kasibling = this.template.nextElementSibling;

        this.__renderCount = 0;
        this.$scope = {};
    }

    _error(msg) {
        console.error(`[ka-template] ${msg} on element`, this.template);
        throw `[ka-template] ${msg} on element` + this.template;
    }

    _appendTemplate() {
        let elements = this.template.content;

        let elList = [];
        for (let curE of elements.children) {
            curE = curE.cloneNode(true);
            curE._ka_maintained_by = this.template.getAttribute("_kaidx");
            elList.push(curE);
            this.template.parentNode.insertBefore(curE, this.template.__kasibling);
        }
        this.template.__kachilds.push(elList);
    }

    _removeLastChild() {
        if (this.template.__kachilds.length === 0)
            return;
        let childs = this.template.__kachilds[this.template.__kachilds.length - 1];
        for (let curE of childs) {
            this.template.parentElement.removeChild(curE);
        }
        this.template.__kachilds.length = this.template.__kachilds.length - 1;

    }

    _renderFor($scope, forStmt, forIfStmt) {
        //console.log("kachilds", this.template.__kachilds);
        let matches = forStmt.match(/^(let)?\s*(?<target>.+)\s+(?<type>of|in|repeat)\s+(?<select>.+?)\s*(indexby\s*(?<indexby>.+)|)$/);
        if (matches === null) {
            this._error(`Can't parse ka.for='${forStmt}'`);
        }
        let selectVal = ka_eval(matches.groups.select, $scope, this.template);

        if (matches.groups.type === "repeat") {
            if (typeof selectVal !== "number")
                this._error(`Error ka.for='${forStmt}': Selected val must be number in repeat loop`);
            selectVal = new Array(selectVal).fill(null);
        }

        let indexBy = null;
        if (matches.groups.indexby) {
            indexBy = matches.groups.indexby;
        }

        let eIndex = 0;
        for (let index in selectVal) {
            let curScope = {$scope: $scope, ...$scope};
            curScope[matches.groups.target] = index;

            if (indexBy !== null)
                curScope[indexBy] = eIndex;

            if (matches.groups.type === "of")
                curScope[matches.groups.target] = selectVal[index];

            if (this.template.__kachilds.length < eIndex + 1) {
                //console.log("append", eIndex, this.template.__kachilds.length);
                this._appendTemplate();
            }

            // Skip element if ka.for-if statement is not true
            if (forIfStmt !== null) {
                if (! ka_eval(forIfStmt, curScope, this.template) ) {
                    console.log("skip line");
                    continue; // Skip this node
                }
            }



            this._maintain(curScope, this.template.__kachilds[eIndex], eIndex);
            eIndex++;
        }
        for(let remIdx = eIndex; remIdx < this.template.__kachilds.length; ) {
            this._removeLastChild();
        }

    }

    _maintain($scope, childs, forIndex=0) {
        for (let child of childs) {
            child._ka_for_index = forIndex;
            ka_elwalk(child, (el) => {
                //console.log("walk", el);

                if (el instanceof HTMLTemplateElement) {
                    //console.log("maintain", el);
                    let r = new this.constructor(el);
                    r.render($scope);
                    return false;
                }

                if (typeof el._ka_maintained_by !== "undefined" && el._ka_maintained_by !== this.template.getAttribute("_kaidx")) {
                    return false;
                }

                ka_apply(el, $scope);
                if ((el instanceof HTMLElement && el.hasAttribute("ka.stop" )) || el["__ka_stop_render"]) {
                    return false; // Skip Element rendering
                }

            }, true, true);
        }
    }


    _renderIf($scope, stmt) {
         let selectVal = ka_eval(stmt, $scope, this.template);
        if (selectVal === true) {
            if (this.template.__kachilds.length === 0)
                this._appendTemplate();

            this._maintain($scope, this.template.__kachilds[0]);
        } else {
            this._removeLastChild();
        }
    }

    /**
     * Remove all rendered element
     */
    dispose() {
        for(;this.template.__kachilds.length > 0;)
            this._removeLastChild();
    }


    setScope($scope) {
        this.$scope = $scope;
    }

    /**
     * Render / Update the Template
     *
     * Once the scope in parameter 1 was set, it will render
     * without any parameters. Scope is available via property $scope
     *
     * @param $scope
     */
    render($scope = null) {
        if ($scope === null)
            $scope = this.$scope;
        this.$scope = $scope;
        this.__renderCount++;

        if (this.template.hasAttribute("ka.for")) {
            this._renderFor($scope, this.template.getAttribute("ka.for"), this.template.getAttribute("ka.for-if"));
        } else if (this.template.hasAttribute("ka.if")) {
            this._renderIf($scope, this.template.getAttribute("ka.if"));
        } else {
            if (typeof this.template._ka_active === "undefined") {
                this._appendTemplate();
                this.template._ka_active = true;
            }
            this._maintain($scope, this.template.__kachilds);
        }
    }

    /**
     * Return true if this template was renderd the first time
     *
     * @returns {boolean}
     */
    isFirstRender() {
        return this.__renderCount === 1;
    }

};
