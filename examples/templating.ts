/**
 * This example demonstrates how to define a Custom Element with a custom template using the KaToolsV1 framework.
 * It showcases the use of "ka." prefixed attributes for dynamic content and behavior within the template.
 */

// Define the HTML template for the custom element.
let html = `
<div class="container">
    <h2>Pages:</h2>
    <div ka.for="let page of pages indexby pageIndex" class="page-details">
        <div>[[pageIndex+1]]:</div>
        <details ka.attr.open="openstate[page.pid] ?? false">
            <summary ka.on.click="openstate[page.pid] = !openstate[page.pid]">Page ID: [[ page.pid ]]</summary>
            <div>
                <label>PID</label>
                <input type="text" ka.bind="page.pid_new">
                <label>Title</label>
                <input type="text" ka.bind="page.title">
                <button ka.on.click="$fn.save(page)">Save</button>
            </div>
        </details>
    </div>
</div>
`;

// Define the custom element using the KaToolsV1 framework.
@customElement("index-page")
@template(html)
class IndexPage extends KaCustomElement {

    constructor() {
        super();
        // Initialize the scope with default values and functions.
        let scope = this.init({
            pages: [],
            openstate: {},
            $fn: {
                save: async (page) => {
                    console.log("Saving page:", page);
                    // Perform save operation here.
                },
                update: async () => {
                    // Fetch and update the list of pages.
                    scope.pages = await this.fetchPages();
                }
            }
        });
    }

    async connectedCallback(): Promise<void> {
        super.connectedCallback();
        // Update the list of pages when the element is connected to the DOM.
        await this.scope.$fn.update();
    }

    async fetchPages(): Promise<any[]> {
        // Fetch the list of pages from an API or other data source.
        return []; // Replace with actual fetch logic.
    }
}

// Usage:
// To use the custom element, include the following tag in your HTML:
// <index-page></index-page>
// Ensure that the KaToolsV1 framework is properly initialized and the custom element is registered before using it.

/**
 * Comments on the example:
 * - The example has been simplified to focus on demonstrating the custom element creation and template binding.
 * - The use of third-party styles and frameworks has been removed to focus on the KaToolsV1 framework functionality.
 * - The example now includes a simple use case of binding data to inputs and handling a save operation.
 * - Additional explanations have been added as comments to guide the user through the example.
 * - The example could be extended to demonstrate more features such as conditional rendering, event handling, and data fetching.
 */
