# KaToolsV1 Framework

KaToolsV1 is a TypeScript-based framework designed to streamline the development of web applications. It provides a set of tools for creating custom elements, managing templates, and handling state with ease.

## Quick Start

To get started with KaToolsV1, import the necessary modules from the framework into your project:

```typescript
import { KaCustomElement, KaTemplate, createScopeObject } from "katools";
```

Define a custom element with a template:

```typescript
@customElement("my-element")
@template(`<div ka.textContent="message"></div>`)
class MyElement extends KaCustomElement {
  constructor() {
    super();
    this.init({ message: "Hello, World!" });
  }
}
```

Use your custom element in HTML:

```html
<my-element></my-element>
```

## Core Concepts

### Scopes and Templates

- **Scopes**: Manage the state and logic of your components.
- **Templates**: Define the HTML structure and bind it to your scope.

### Custom Elements

Create reusable web components with encapsulated logic and styling.

### Modals and Fragments

Utilize modals for dialog boxes and fragments for partial templates.

## Utility Functions

Frequently used utility functions:

| Function          | Description                               | Example Usage                     |
|-------------------|-------------------------------------------|-----------------------------------|
| `isset`           | Check if a value is set                   | `if (isset(value)) { ... }`       |
| `isUndefined`     | Check if a value is undefined             | `if (isUndefined(value)) { ... }` |
| `random_string`   | Generate a random string                  | `let str = random_string(10);`    |
| `ka_await_element`| Wait for an element to appear in the DOM  | `await ka_await_element("#id");`  |
| `ka_sleep`        | Delay execution for a specified duration  | `await ka_sleep(1000);`           |
| `ka_dom_ready`    | Wait for the DOM to be ready             | `await ka_dom_ready();`           |

For more utility functions, see [Utility Functions Documentation](/docs/list_of_utility_functions.md).

## Decorators

Decorators to enhance your classes and methods:

| Decorator        | Description                                                  | Example Usage                                                                 |
|------------------|--------------------------------------------------------------|-------------------------------------------------------------------------------|
| `@customElement` | Define a new custom element                                  | `@customElement("my-element")`                                                |
| `@template`      | Associate a template with a class                            | `@template("<div>...</div>")`                                                 |
| `@autorender`    | Automatically render when properties change (not implemented)| `@autorender("my-tag")`                                                       |
| `@inject`        | Inject a dependency into a class property                    | `@inject("MyService")`                                                        |

For more details on decorators, see [Decorator Functions](/docs/list_of_decorators.md).

## Debouncing Events

Use the `Debouncer` class to limit the rate of function execution:

```typescript
import { Debouncer } from "katools";

let debouncer = new Debouncer(100, 300);
window.addEventListener('resize', async () => {
  await debouncer.debounce();
  // Handle resize event
});
```

For more on debouncing, see [Using the Debouncer](/docs/usage_debouncer.md).

## Examples

- [Modal Example](/examples/modal.ts): Demonstrates how to create and use a modal.
- [Templating Example](/examples/templating.ts): Shows how to define a custom element with a template.

## HTML Properties (`ka.*`)

Dynamic HTML properties for binding and behavior:

| Property          | Description                               | Example Usage                     |
|-------------------|-------------------------------------------|-----------------------------------|
| `ka.textContent`  | Bind text content                         | `<span ka.textContent="msg"></span>` |
| `ka.htmlContent`  | Bind HTML content                         | `<div ka.htmlContent="html"></div>` |
| `ka.for`          | Repeat an element                         | `<div ka.for="let item of items"></div>` |
| `ka.if`           | Conditionally include an element          | `<div ka.if="condition"></div>` |
| `ka.on`           | Attach event listeners                    | `<button ka.on.click="action()"></button>` |
| `ka.ref`          | Create a reference in the scope           | `<input ka.ref=" 'inputRef' " />` |
| `ka.classlist`    | Toggle classes conditionally              | `<div ka.classlist="{active: isActive}"></div>` |
| `ka.style`        | Apply styles dynamically                  | `<div ka.style="{color: colorVar}"></div>` |
| `ka.bind`         | Two-way data binding                      | `<input ka.bind="model.property" />` |
| `ka.options`      | Generate `<option>` elements dynamically  | `<select ka.options="optionsList"></select>` |
| `ka.attr`         | Set or remove attributes dynamically      | `<img ka.attr.src="imageUrl" />` |
| `ka.prop`         | Set properties on the element             | `<audio ka.prop.paused="isPaused"></audio>` |
| `ka.stop`         | Stop rendering process for child elements | `<div ka.stop></div>` |
| `ka.debug`        | Log evaluated expression for debugging    | `<div ka.debug="value"></div>` |

For a complete list of HTML properties, see [KaToolsV1 HTML Properties](/docs/list_of_ka_template_attributes.md).

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines on how to contribute to the project.

## License

KaToolsV1 is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.