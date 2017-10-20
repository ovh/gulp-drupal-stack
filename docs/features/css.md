Compiles SCSS to CSS using [gulp-sass](https://github.com/dlmanning/gulp-sass), which in turn uses `node-sass`, which in turn uses `libsass`.

## Usage

You can create individual CSS files bundle, using the config:
```yml
  src:
    - scss/main.scss        # -> dist/main.css
    - scss/my/app1.scss     # -> dist/app1.css
    - scss/my/app2.scss     # -> dist/app2.css
    [...]
```

## Commands

- `gulp css` - Compile SCSS to CSS
- `gulp watch:css` - Watch and compile
- `gulp validate:css` - Test SCSS with [gulp-sass-lint](https://github.com/sasstools/gulp-sass-lint), which uses [sass-lint](https://github.com/sasstools/sass-lint) (Pure node.js - no Ruby)
- `gulp format:css` - Format SCSS with [gulp-csscombx](https://github.com/drugan/gulp-csscombx), which uses [csscombx](https://github.com/drugan/csscombx)

## Config

- `config.css.src` - Array of SCSS files
- `config.css.dest` - String of Destination directory for CSS
- `config.css.lint.enabled` - Boolean for if Linting should occur
- `config.css.csscombx.enabled` - Boolean for if Formating should occur
- `config.css.sourceComments` - Boolean - Enable comments written in CSS that shows SCSS source. **Don't turn on permanently**, it's useful if SourceMaps aren't working.
- `config.css.autoPrefixerBrowsers` - Array of [Browsers to Support](https://github.com/ai/browserslist#queries) for Autoprefixer (used by PostCSS).

---
