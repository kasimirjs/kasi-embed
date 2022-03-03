

class KaToolsV1_Template extends KaToolsV1_TemplateElement {

    render($scope) {
        //super.render($scope, this);
        console.log("array main", this.tplChilds);
        this.walkElements(this.tplChilds, $scope, this);
    }

    async connectedCallback() {
        super.connectedCallback();
        KaToolsV1_Template.instance = this;
        await KaToolsV1.domReady();
        console.log("appending", this, this.querySelector("template").content);
        this.pushElement(this.querySelector("template").content)
    }

}

/**
 * Reference to the last defined App-Template
 *
 * @type {KaToolsV1_Template}
 */
KaToolsV1_Template.instance = null;

customElements.define("ka-tpl-app", KaToolsV1_Template);
