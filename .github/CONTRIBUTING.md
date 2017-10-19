First you'll want to clone this repo next to the repo you are working on.

```
my-project/ (repo)
    - package.json
    - node_modules/
        - gulp-drupal-stack/
gulp-drupal-stack/ (repo)
```

While in `my-project/`, symlink the `gulp-drupal-stack/` that is a repo into your `node_modules/` directory with `npm link` like so:

    npm link ../gulp-drupal-stack/

This will replace `node_modules/gulp-drupal-stack/` with a symlink to the `gulp-drupal-stack` repo.

Now you can make changes and contribute!

## Acceptance Criteria

- Passes `npm test` - Travis runs this and will report it on your PR
- Branch off `master` and into a `feature/name-of-it` - no `develop` branch going
- If you add new config, add it to `gulpfile.default.yml`

### Bonus Points

Adding a new test. See `tests/css/css.test.js`

# Testing

To test: `npm test`

To start watches for tests: `npm start`
