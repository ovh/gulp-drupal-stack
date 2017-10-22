Manage your JS files using webpack.

## Usage

Copy the `webpack.config.js` example file in your project.
You can then configure the JS bundles that you want:
```js
  entry: {
    main: path.resolve(__dirname, './js/main.js')
    [...]
  },
```

## Commands

- `gulp webpack` - Launch webpack compilation
- `gulp validate:webpack` - Test JS with ESLINT
- `gulp watch:webpack` - Watch and compile

---
