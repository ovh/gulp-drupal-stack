## Config

All is easily configurable by changing values in your `gulpfile.yml` file in your project. These values are merged into the `gulpfile.default.yml` file.

For example, you can enable SCSS and JS like this:
```yml
css:
  enabled: true
js:
  enabled: true
```

You can find all the available options and defaults settings inside the `gulpfile.default.yml` file.


## Folders structure

- source/ (only for Pattern Lab)
  - _annotations/ ([annotations](http://patternlab.io/docs/pattern-adding-annotations.html) for Patterns)
  - _data/ (Global JSON data files available to all Patterns, can add multiple)
  - _patterns/ (Twig, Scss, and JS all in here)
    - 00-base/ (Twig Namespace: `@base`)
      - Contains what all that follows needs: variables, mixins, and grid layouts for examples
    - 01-atoms/ (Twig Namespace: `@atoms`)
    - 02-molecules (Twig Namespace: `@molecules`)
    - 03-organisms (Twig Namespace: `@organisms`)
    - 04-templates (Twig Namespace: `@templates`)
    - 05-pages (Twig Namespace: `@pages`)
  - _meta/ (contains the header and footer Twig templates for PL; add any `<link>` or `<script>` tags here; don't edit in between the `<!-- inject -->` tags though; it'll get overwritten)
- pattern-lab/ (only for Pattern Lab)
  - config/config.yml (Pattern Lab configuration)
  - public/ (Where Pattern Lab compiles too, it's just static HTML)
  - composer.json (run `composer update` next to this to update dependencies)
- scss/ - Sass files that aren't really tied to a component, so not in the above location.
- js/ - all js files here and transpiled by Babel and combined into a single `dest/script.js` file.
- images/icons/src/ - all SVGs here are combined into font icons and have classes and Sass mixins made for each based on file name. See `atoms/images/icons` in Pattern Lab.
- dest/ - Many compiled assets end up in here like CSS, JS, Font Icons, and any doc systems like [SassDoc](http://sassdoc.com).
- templates/ - Drupal twig templates. These often will `include`, `embed`, or `extend` the Twig templates found in Pattern Lab like this: `{% include "@molecules/branding/branding.twig" with { url: path('<front>') } %}`. We keep the components in Pattern Lab "pure" and ignorant of Drupal's data model and use these templates to map the data between the two. Think of these as the Presenter templates in the [Model View Presenter](https://en.wikipedia.org/wiki/Model–view–presenter) approach. Also, Drupal Twig templates that have nothing to do with Pattern Lab go here.
- gulpconfig.yml - Configuration for all the gulp tasks, a ton can be controlled here.


## Commands

- `gulp` - Run all compile tasks, and watch for changes
- `gulp compile` or `gulp build` - Run all compile tasks
- `gulp test` - Run all tests tasks (unit tests, ...)
- `gulp validate` - Run all validate tasks (eslint, ...)
- `gulp watch` - Watch for changes
- `gulp clean` - Run all clean tasks

## Specifics Commands

You can launch specifics tasks, for example "lint CSS files": `gulp validate:css`.

All the documentation can be found inside the [Features](features/css.md) section.

---

### Babel

In order to use Babel, you need to create a `.babelrc` into your project, with the presets that you want installed.

**Example:**

Run:
```bash
$ npm install --save-dev babel-preset-es2015
```
And create a `.babelrc` file:
```json
{
  "presets": ["es2015"]
}
```

### ESLint

You need to create a `.eslintrc.js` file, and specify whitch rules that you want (`eslint-config-drupal` is recommanded).

**Example:**

Run:
```bash
$ npm install --save-dev babel-eslint
$ npm install --save-dev eslint-config-drupal
```
And create a `.eslintrc.js` file:
```javascript
'use strict';
// rule reference: http://eslint.org/docs/rules
// individual rule reference: http://eslint.org/docs/rules/NAME-OF-RULE

module.exports = {
  extends: 'eslint-config-drupal'
};
```

### StyleLint

You need to create a `.stylelintrc.js` file, and specify whitch rules that you want (`stylelint-config-drupal` is recommanded).

**Example:**

Run:
```bash
$ npm install --save-dev stylelint-scss
$ npm install --save-dev stylelint-config-drupal
```
And create a `.stylelintrc.js` file:
```javascript
'use strict';

module.exports = {
  'extends': 'stylelint-config-drupal'
};
```

### CSScombx

The module follows the rules from [Drupal](https://www.drupal.org/docs/develop/standards/css/csscomb-settings-for-drupal-css-formatting-and-sort-tool).

---
