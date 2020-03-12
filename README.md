Gulp Drupal Stack
=================

![gulp-drupal-stack-banner](banner.png)

[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/ovh/ux)
[![travis](https://travis-ci.org/ovh-ux/gulp-drupal-stack.svg?branch=master)](https://travis-ci.org/ovh-ux/gulp-drupal-stack)
[![Documentation Status](https://readthedocs.org/projects/gulp-drupal-stack/badge/?version=latest)](http://gulp-drupal-stack.readthedocs.io/en/latest/?badge=latest)


This stack core is to be included in your main project and sets up many Gulp tasks that can work in many flexible ways by passing in different `config` objects, which can be based off of `gulpfile.default.yml` (and is merged with).


## Features

- SCSS => CSS compiling with LibSass, PostCSS, linting, CSScomb(x), and SourceMaps
- JS compiling via Babel, linting and aggregation
- webpack module bundling
- SVG => Font Icons compiling with support for adding mixins and classes to SCSS along with a demo page
- Drupal file watching to trigger Drush cache clears
- Copy any files to an other location
- Sprite generator (with Retina Display support)

All is easily configurable by changing values in your `gulpfile.yml` file in your project. These values are merged into the `gulpfile.default.yml` file - look there for the available options and defaults.


## Documentation

Full documentation is available [here](https://gulp-drupal-stack.readthedocs.io/en/latest/).


#### TODO

- Browsersync live reload and style injection (should be OK, not tested)
- Images => Images optimization (to validate)
- JS specs => JS tests using Karma


## Contributing

Have a look at the [Contributing section](.github/CONTRIBUTING.md). If you have any question feel free to discuss about it on our [Gitter](https://gitter.im/ovh/ux).


## Credits

Original project from [`p2-theme-core`](https://github.com/phase2/p2-theme-core).


## License

MIT (original license)
