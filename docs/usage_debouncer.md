# Using the Debouncer in KaToolsV1

The debouncer is a utility class provided by the KaToolsV1 framework that helps to limit the rate at which a function can execute. This is particularly useful for handling rapid events such as window resizing, scrolling, or keypresses in a performant way.

## Debouncer Functionality

The debouncer class provided by KaToolsV1 is `Debouncer`. It allows you to create a debouncer instance that can be used to debounce a function call. The debouncer ensures that the function is not called too frequently and can be configured with minimum and maximum intervals.

## Example Usage

Here is an example of how to use the `Debouncer` class within a custom element to handle window resize events:

```typescript
import { Debouncer } from "katools";

class ResponsiveElement extends HTMLElement {
    private resizeDebouncer: Debouncer;

    constructor() {
        super();
        this.handleResize = this.handleResize.bind(this);
        this.resizeDebouncer = new Debouncer(100, 300);
    }

    connectedCallback() {
        window.addEventListener('resize', this.handleResize);
    }

    disconnectedCallback() {
        window.removeEventListener('resize', this.handleResize);
    }

    async handleResize() {
        // Debounce the resize event handling
        await this.resizeDebouncer.debounce();

        // Code to handle the resize event goes here
        console.log('Resize event handled after debounce.');
    }
}

customElements.define('responsive-element', ResponsiveElement);

// Usage in HTML:
// <responsive-element></responsive-element>
```

In this example, the `handleResize` method is called every time the window is resized. However, the actual resize handling code (the `console.log` statement) will only execute after the debouncer's conditions are met.

## Additional Explanations

- The `Debouncer` class constructor takes two parameters: `min` and `max`. The `min` parameter specifies the minimum amount of time to wait before the function can be called again, while the `max` parameter specifies the maximum time to wait before the function is called automatically.
- The `Debouncer` class is useful to avoid executing a function too frequently, which can lead to performance issues, especially in cases where the function performs expensive operations such as DOM updates or data fetching.

## Extending the Example

To demonstrate more functionality, let's extend the example to include a method that performs an expensive operation, such as fetching data from an API whenever the window is resized:

```typescript
import { Debouncer } from "katools";

class DataFetchingElement extends HTMLElement {
    private resizeDebouncer: Debouncer;

    constructor() {
        super();
        this.handleResize = this.handleResize.bind(this);
        this.resizeDebouncer = new Debouncer(100, 300);
    }

    connectedCallback() {
        window.addEventListener('resize', this.handleResize);
    }

    disconnectedCallback() {
        window.removeEventListener('resize', this.handleResize);
    }

    async handleResize() {
        // Debounce the resize event handling
        await this.resizeDebouncer.debounce();

        // Fetch data from an API after the debounce period
        this.fetchData();
    }

    async fetchData() {
        // Simulate a data fetch with a timeout
        setTimeout(() => {
            console.log('Data fetched from API.');
        }, 500);
    }
}

customElements.define('data-fetching-element', DataFetchingElement);

// Usage in HTML:
// <data-fetching-element></data-fetching-element>
```

In this extended example, the `fetchData` method simulates an API call that is triggered after the debounced resize event. This ensures that the data fetching does not occur too frequently and only happens after the user has finished resizing the window, within the constraints set by the debouncer's `min` and `max` parameters.

## Important Note on Debouncing

It is advised to use the `Debouncer` class instead of the `ka_debounce()` function. The `ka_debounce()` function does not have context awareness and might lead to unexpected behavior if not managed correctly. The `Debouncer` class provides a more robust and reliable way to debounce functions with proper context handling.

## Debouncer Class Prototype

```typescript
class Debouncer {
    constructor(min: number, max?: number);
    debounce(min?: number, max?: number): Promise<void>;
}
```

- `constructor(min: number, max?: number)`: Initializes a new instance of the `Debouncer` class with the specified minimum and optional maximum intervals.
- `debounce(min?: number, max?: number): Promise<void>`: Returns a promise that resolves after the debounce conditions are met. The `min` and `max` parameters can override the values set during construction.