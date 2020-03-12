Launch a Drupal command.

## Commands

- `gulp cr` - Launch Drupal command (by default `drush cr`)
- `gulp watch:drupal` - Watch files and launch `gulp cr`

## Config

- `config.drupal.themeFile` - The filename of your YOUR_THEME.info.yml (required for PatternLab tasks)
- `config.drupal.dir` - The root directory for Drush
- `config.drupal.command` - The drush command to execute

## Notes

If you want to use it with [Drucker](https://github.com/ovh/drucker), you need to:

  - set the `config.drupal.dir` to `./path/to/drucker`
  - set the `config.drupal.command` to `. load-env && drush cr`

---
