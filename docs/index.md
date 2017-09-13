Gulp Drupal Theme - Core
========================

![gulp-drupal-theme-core-banner](banner.png)

This theme core is to be included in your main project and sets up many Gulp tasks that can work in many flexible ways by passing in different `config` objects, which can be based off of `gulpfile.default.yml` (and is merged with).


## Features

- SCSS => CSS compiling with LibSass, PostCSS, linting, and SourceMaps
- JS compiling via Babel, linting and aggregation
- WebPack module bundling
- SVG => Font Icons compiling with support for adding mixins and classes to SCSS along with a demo page
- Drupal file watching to trigger Drush cache clears

All is easily configurable by changing values in your `gulpfile.yml` file in your project. These values are merged into the `gulpfile.default.yml` file - look there for the available options and defaults.


## Prerequisites

- [Node](https://nodejs.org)
- [Gulp-cli](http://gulpjs.com/): `npm install -g gulp-cli`


## Installation

Follow theses steps:

```bash
$ cd <your-theme>
# Install it
$ npm install gulp-drupal-theme-core --save-dev
# Create a gulpfile.js
$ cp node_modules/gulp-drupal-theme-core/templates/gulpfile.js ./
# Create a gulpfile.yml (config file)
$ vi gulpfile.yml
# <set the config that you want, and save it>
```


## Usage

See [Usage](usage.md) section.


## Credits

Original project from [p2-theme-core](https://github.com/phase2/p2-theme-core).


## License

MIT (original license)

---
