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

### TODO

- BrowserSync live reload and style injection (should be OK, not tested)
- Images => Images optimization (to validate)
- JS specs => JS tests using Karma


## Documentation

Full documentation is available [here](https://drucker.readthedocs.io/en/latest).


## Contributing

Have a look at the [Contributing section](.github/CONTRIBUTING.md). If you have any question feel free to discuss about it on our [Gitter](https://gitter.im/ovh/ux).


## Credits

Original project from [`p2-theme-core`](https://github.com/phase2/p2-theme-core).


## License

MIT (original license)
