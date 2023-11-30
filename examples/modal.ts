/**
 * This example demonstrates how to define and use a modal window with a custom template using the KaToolsV1 framework.
 * It shows how to create a modal class, define its HTML content, and invoke the modal with dynamic data.
 *
 * This is a raw example with custom Modal HTML. Want to use Boostrap modals? Use the predefined classed from https://github.com/kasimirjs/kasimirjs-kit-bootstrap (Include this link in README.md)
 */

import { KaCustomModal, template } from "../src";

// Define the HTML template for the modal.
let html = `
<div class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Image Details: [[ media.name + "." + media.extension ]]</h5>
                <button type="button" class="close" ka.on.click="$fn.close()" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>Image URL: [[ media.url ]]</p>
                <p>Image Description: [[ media.description ]]</p>
            </div>
            <div class="modal-footer">
                <button type="button" ka.on.click="$fn.close()">Close</button>
            </div>
        </div>
    </div>
</div>
`;

// Apply the template to the custom modal class.
@template(html)
export class ImageDetailsModal extends KaCustomModal {
    public show(media): Promise<null> {
        // Initialize the scope with media data and functions.
        let scope = this.init({
            media,
            $fn: {
                close: () => this.resolve(null)
            },
        });
        // Display the modal.
        return super.show();
    }
}


// Usage example:
// To use the modal, create an instance of ImageDetailsModal and call the show method with the media object.
let media = { name: 'example', extension: 'jpg', url: 'path/to/image.jpg', description: 'An example image' };
let data = await (new ImageDetailsModal()).show(media);

/**
 * Comments on the example:
 * - The example has been simplified to focus on demonstrating the modal functionality using the KaToolsV1 framework.
 * - Third-party styles and frameworks have been removed to focus on the core functionality.
 * - The example includes a simple use case of displaying a modal with dynamic content based on the provided media object.
 * - Additional explanations have been added as comments to guide the user through the example.
 * - The example could be extended to demonstrate more features such as event handling and data fetching.
 */
