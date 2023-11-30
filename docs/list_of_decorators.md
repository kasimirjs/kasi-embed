# Decorator Functions

Decorators in the KaToolsV1 framework are functions that modify the behavior of classes or methods. Below is a table of available decorator functions along with a short description and usage examples.

| Decorator        | Description                                                  | Example Usage                                                                 |
|------------------|--------------------------------------------------------------|-------------------------------------------------------------------------------|
| `@customElement` | Defines a new custom element with a given tag name.          | `@customElement("my-element")`<br>`class MyElement extends HTMLElement {...}` |
| `@template`      | Associates a template with a custom element or modal class.  | `@template(html)`<br>`class MyCustomElement extends KaCustomElement {...}`    |
| `@autorender`    | Automatically renders the element when a property changes.   | `@autorender("my-tag")`<br>`class MyAutoRenderElement {...}`                  |
| `@inject`        | Injects a dependency into a class property.                  | `@inject("MyService")`<br>`class MyClass {...}`                               |

## Examples

### `@customElement`

The `@customElement` decorator is used to define a new custom element with a specified tag name. This tag name is then used in the HTML to instantiate the custom element.

```typescript
@customElement("my-element")
class MyElement extends HTMLElement {
    connectedCallback() {
        this.innerHTML = "<p>Hello, World!</p>";
    }
}
```

### `@template`

The `@template` decorator is used to associate an HTML template with a custom element or modal class. The template can be a string or an `HTMLTemplateElement`.

```typescript
const myElementTemplate = `<div>Template Content</div>`;

@template(myElementTemplate)
class MyCustomElement extends KaCustomElement {
    // Class implementation...
}
```

### `@autorender`

The `@autorender` decorator is not fully implemented in the provided code. Typically, such a decorator would be used to automatically render the element when a property changes. However, since the implementation is missing, we cannot provide a functional example.

### `@inject`

The `@inject` decorator is used to inject a dependency into a class property. The dependency is resolved from a container, allowing for inversion of control.

```typescript
class MyService {
    // Service implementation...
}

@inject("MyService")
class MyClass {
    myService: MyService;

    constructor() {
        console.log(this.myService); // Instance of MyService
    }
}
```

**Note:** The examples provided above are simplified to demonstrate the usage of decorators within the KaToolsV1 framework. In a full application, additional setup and configuration may be required to utilize these features effectively.