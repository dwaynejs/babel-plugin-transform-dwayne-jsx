# babel-plugin-transform-dwayne-jsx

Babel plugin for transforming JSX into Dwayne-compatible js.

It's recommended to use [babel-preset-dwayne](https://github.com/dwaynejs/babel-preset-dwayne)
instead of the plugin itself.

### Example

Input:

```jsx
const tmpl = (
  <div Class:active={active}>
    {text}
    <OtherBlock/>
  </div>
);
```

Output:

```js
let _tmpl, _mixin;

const tmpl = (_tmpl = [{
  type: "div",
  args: {
    "Class:active": (_mixin = _ => _.active, _mixin.mixin = Class, _mixin.__source = "source.js:2:8", _mixin)
  },
  children: [{
    type: "#text",
    value: _ => _.text
  }, {
    type: OtherBlock,
    args: {
      __source: "source.js:4:6"
    }
  }]
}], _tmpl.vars = ["active", "text"], _tmpl);
```

### Transformer

It's similar to [transform-dwayne-js](https://github.com/dwaynejs/transform-dwayne-js),
but for babel and JSX only.

All the options passed to the plugin are passed to the
[transformer](https://github.com/dwaynejs/transform-dwayne-html) itself.

By default the plugin sets `options.useES6` to true.
