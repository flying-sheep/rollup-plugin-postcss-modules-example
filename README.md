# Example for [rollup-plugin-postcss-modules](https://github.com/flying-sheep/rollup-plugin-postcss-modules)

See it deployed at https://flying-sheep.github.io/rollup-plugin-postcss-modules-example/

The [bundle.js](https://flying-sheep.github.io/rollup-plugin-postcss-modules-example/dist/bundle.js)
demonstrates the generated code:

```js
var style = {…, "myClass":"my-component_my-class__RPeiE"}
[…]
React.createElement("div", { className: style.myClass }, "Test")
```

Which references the generated CSS:

```css
.my-component_my-class__RPeiE {
 background-color: lightgrey 
}
```
