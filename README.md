Gulp Drupal Theme - Core
========================

![gulp-drupal-theme-core-banner](banner.png)
[![Maintenance](https://img.shields.io/maintenance/yes/2017.svg)]() [![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/ovh/ux) [![travis](https://travis-ci.org/ovh-ux/gulp-drupal-theme-core.svg?branch=master)](https://travis-ci.org/ovh-ux/gulp-drupal-theme-core)

This theme core is to be included in your main project and sets up many Gulp tasks that can work in many flexible ways by passing in different `config` objects, which can be based off of `gulpfile.default.yml` (and is merged with).


## Features

- SCSS => CSS compiling with LibSass, PostCSS, linting, and SourceMaps
- JS compiling via Babel, linting and aggregation
- WebPack module bundling
- SVG => Font Icons compiling with support for adding mixins and classes to SCSS along with a demo page
- Drupal file watching to trigger Drush cache clears

All is easily configurable by changing values in your `gulpfile.yml` file in your project. These values are merged into the `gulpfile.default.yml` file - look there for the available options and defaults.

## TODO

- BrowserSync live reload and style injection (should be OK, not tested)
- Images => Images optimization (to validate)
- JS specs => JS tests using Karma


## Prerequisites

- [Node](https://nodejs.org)
- [Gulp-cli](http://gulpjs.com/): `npm install -g gulp-cli`


## Installation

- `npm install gulp-drupal-theme-core --save-dev`
- Create a `gulpfile.yml` in your theme, and overrides options from the `gulpfile.default.yml`
- Make a `gulpfile.js` in your project, with:
```js
    "use strict";

    const gulp = require("gulp");
    const yaml = require("js-yaml");
    const fs = require("fs");

    // `rc` allows all config options to be overridden with CLI flags like `--js.enabled="` or in `~/.p2-theme-corerc` files, among many others: https://www.npmjs.com/package/rc
    const config = require("rc")("gulp-drupal-theme-core", yaml.safeLoad(fs.readFileSync(`${__dirname}/gulpfile.yml`, "utf8"), { json: true }));
    const themeCore = require("gulp-drupal-theme-core");

    const tasks = {
        compile: [],
        watch: [],
        validate: [],
        clean: [],
        "default": []
    };

    themeCore(gulp, config, tasks);

    gulp.task("clean", gulp.parallel(tasks.clean));
    gulp.task("compile", gulp.series(
        "clean",
        gulp.series(tasks.compile)
    ));
    gulp.task("validate", gulp.parallel(tasks.validate));
    gulp.task("watch", gulp.parallel(tasks.watch));
    tasks.default.push("watch");
    gulp.task("default", gulp.series(
        "compile",
        gulp.parallel(tasks.default)
    ));
```

### Babel
In order to use Babel, you need to create a `.babelrc` into your project, with the presets that you want installed.

### ESLINT
You need to create a `.eslintrc.js` file, and specify whitch rules that you want (`eslint-config-ovh` is recommanded).


## Usage

### Global Commands

- `gulp` - Run all compile tasks, and watch for changes
- `gulp compile` - Run all compile tasks
- `gulp validate` - Run all validate tasks (eslint, ...)
- `gulp watch` - Watch for changes
- `gulp clean` - Run all clean tasks

### Specifics Commands

You can launch specifics tasks, for example "lint CSS files". In this example, you can use `gulp validate:css`.

All the documentation can be found inside the `docs` folder.


## Contributing

Have a look at the [Contributing section](.github/CONTRIBUTING.md). If you have any question feel free to discuss about it on our [Gitter](https://gitter.im/ovh/ux).


## Credits

Original project from [`p2-theme-core`](https://github.com/phase2/p2-theme-core).


## License

MIT (original license)
