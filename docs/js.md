# JS

Compiles JS files using Babel. You can optionaly concat, uglify, and add sourcemaps.

## Commands

- `gulp js` - Compile all JS files using Babel
- `gulp watch:js` - Watch and compile
- `gulp validate:js` - Test JS with ESLINT
- `gulp js:bundleBower` - (optional) compile, uglify, concat bower dependencies (result files will be `bower--*deps*.js`)
- `gulp watch:bower` - (optional) Watch and compile bower deps


# Webpack

Manager your JS files using Webpack.

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

- `gulp webpack` - Launch Webpack compilation
- `gulp watch:webpack` - Watch and compile
