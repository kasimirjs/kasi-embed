# KaToolsV1 HTML Properties (`ka.*`)

KaToolsV1 provides a set of custom HTML properties prefixed with `ka.` to enable dynamic behavior and content binding within templates. Below is a table summarizing these properties, along with short descriptions and examples.

| Property | Description | Example                                                                                                                       |
|----------|-------------|-------------------------------------------------------------------------------------------------------------------------------|
| `ka.textContent` | Sets the text content of an element to the evaluated expression. | `<span ka.textContent="user.name"></span>`                                                                                    |
| `ka.htmlContent` | Sets the inner HTML of an element to the evaluated expression. | `<div ka.htmlContent="formattedContent"></div>`                                                                               |
| `ka.for` | Repeats the element for each item in the provided collection. | `<div ka.for="let item of items"></div>`                                                                                      |
| `ka.if` | Conditionally includes the element based on the evaluated expression. | `<div ka.if="user.isLoggedIn"></div>`                                                                                         |
| `ka.on` | Attaches an event listener to the element. | `<button ka.on.click="$fn.save()">Save</button>`                                                                              |
| `ka.ref` | Creates a reference to the element in the scope. | `<input ka.ref=" 'usernameInput' " />`                                                                                        |
| `ka.classlist` | Conditionally toggles classes on the element. | `<div ka.classlist="{active: isActive}" ka.classlist.active="isActive"></div>` or `<div ka.classlist.active="isActive"></div>` |
| `ka.style` | Applies inline styles to the element based on the evaluated object. | `<div ka.style="{color: textColor}"></div>` or     `<div ka.style.color="textColor"></div>`                           |
| `ka.bind` | Creates a two-way data binding on form elements. | `<input ka.bind="user.email" />`                                                                                              |
| `ka.options` | Dynamically generates `<option>` elements for a `<select>` element. | `<select ka.options="optionList"></select>`                                                                                   |
| `ka.attr` | Sets or removes attributes based on the evaluated expression. | `<img ka.attr.src="user.avatarUrl" />`                                                                                        |
| `ka.prop` | Sets properties on the element. | `<audio ka.prop.paused="isPaused"></audio>`                                                                                   |
| `ka.stop` | Stops the rendering process for child elements. | `<div ka.stop></div>`                                                                                                         |
| `ka.debug` | Logs the evaluated expression to the console for debugging. | `<div ka.debug="currentValue"></div>`                                                                                         |

## Examples

### Dynamic Text Content

```html
<!-- Display the user's name dynamically -->
<span ka.textContent="user.name"></span>
```

### Conditional Rendering

```html
<!-- Show the element only if the user is logged in -->
<div ka.if="user.isLoggedIn">
  Welcome, <span ka.textContent="user.name"></span>!
</div>
```

### Event Handling

```html
<!-- Call the save function when the button is clicked -->
<button ka.on.click="$fn.save()">Save</button>
```

### Two-Way Data Binding

```html
<!-- Create a two-way binding on the input element -->
<input type="text" ka.bind="user.email" />
```

### Dynamic Class Toggle

```html
<!-- Toggle the 'active' class based on the isActive property -->
<div ka.classlist="{active: isActive}"></div>
```

### Dynamic Style Application

```html
<!-- Apply styles dynamically based on the textColor property -->
<div ka.style="{color: textColor}"></div>
```

### Dynamic Options for Select Element

```html
<!-- Generate options for the select element dynamically -->
<select ka.options="optionList"></select>
```

### Dynamic Attributes

```html
<!-- Set the src attribute dynamically for an image -->
<img ka.attr.src="user.avatarUrl" />
```

### Property Binding

```html
<!-- Control the paused property of an audio element -->
<audio ka.prop.paused="isPaused"></audio>
```

### Debugging

```html
<!-- Log the current value to the console for debugging -->
<div ka.debug="currentValue"></div>
```

