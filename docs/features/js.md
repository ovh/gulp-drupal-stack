Compiles JS files using Babel. You can optionaly concat, uglify, and add sourcemaps.

!!! note ""
    We recommand to use [webpack](features/webpack.md) instead.

## Commands

- `gulp js` - Compile all JS files using Babel
- `gulp watch:js` - Watch and compile
- `gulp validate:js` - Test JS with ESLINT
- `gulp js:bundleBower` - (optional) compile, uglify, concat bower dependencies (result files will be `bower--*deps*.js`)
- `gulp watch:bower` - (optional) Watch and compile bower deps

---
