class KaToolsV1_TemplateElement extends HTMLElement {
'use strict';

    constructor() {
        super();

        this.tplChilds = [];
        this.tplNextSibling = null;

    }


    async pushElement(srcnode) {
        return new Promise((resolve) => {
            if (this.tplNextSibling === null)
                this.tplNextSibling = this.nextElementSibling;
            let e = null;
            if (typeof srcnode.cloneNode === "function")
                e = document.importNode(srcnode.cloneNode(true), true);
            else
                e = srcnode;
            let nodes = [];
            if (e instanceof DocumentFragment) {
                for (let node of e.childNodes.entries()) {
                    nodes.push(node[1]);
                    console.log("node", node[1]);
                }
            } else {
                nodes = [e];
            }
            this.tplChilds.push(nodes);
            for (let e of nodes) {
                console.log("pushing", e);
                e.kaTplOwner = this;
                if (e instanceof NodeList) {
                    for (let el of e)
                        this.parentElement.insertBefore(el, this.tplNextSibling);
                } else {
                    this.parentElement.insertBefore(e, this.tplNextSibling);
                }

            }
            resolve();
        })

    }


    async walkElements(nodes, $scope, mainTpl) {

        console.log("startWalk", nodes, typeof nodes, nodes.render);
        let list = [];
        if (nodes instanceof Array) {

            console.log("is Array!");
            list = nodes;
        } else if (nodes instanceof KaToolsV1_TemplateElement) {
            console.log("trigger render", nodes);
            nodes.render($scope, mainTpl);
        } else if (nodes instanceof HTMLElement) {
            list = nodes.children
        }else if (nodes instanceof NodeList) {
            list = nodes
        } else if (nodes instanceof Text) {
            return;
        } else {
            console.error("Undefined Element type in walkElements():", nodes);
            throw "Undefined Element type in walkElements():" + nodes;
        }
        console.log("Walking",  list, list.length);
        for (let i = 0; i<list.length; i++) {
            let e = list[i];
            await this.walkElements(e, $scope, mainTpl);
        }
    }


    async render($scope, mainTpl) {
        console.log ("Rendering ka-tpl:", this);
        let isMaintanied = false;
        for (let attrName of this.getAttributeNames()) {
            for(let regex in KaToolsV1_Template.prototype.functions) {
                console.log("regex", regex, attrName);
                if (attrName.match(regex)) {
                    isMaintanied = KaToolsV1_Template.prototype.functions[regex]($scope, this, attrName, this.getAttribute(attrName));
                    break;
                }
            }
        }
        if ( ! isMaintanied && this.tplChilds.length === 0) {
            await this.pushElement(this.childNodes);
            //await KaToolsV1.debounce(100,200);
            this.walkElements(this.childNodes, $scope, mainTpl);
        }
    }

    connectedCallback() {
        console.log("connected!!!!!!!!!!!");
        this.hidden = true;
    }
}

customElements.define("ka-tpl", KaToolsV1_TemplateElement);
