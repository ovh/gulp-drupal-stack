Copy any files to a destination folder (useful for node_modules vendoring).

## Usage

You simply put the files (input) that you want to copy to output (dist).
```yml
copy:
  enabled: true
  files:
    - src: "node_modules/lodash/dist/lodash.js"
      dest: "dist/vendors/"
    - src: "node_modules/underscore/dist/*.js"
      dest: "dist/vendors/"
      concat: true                  # (optional) enable concat
      destName: "underscore.js"     # (optional) concatened file name
    [...]
```

## Commands

- `gulp copy` - Launch copy task
- `gulp watch:copy` - Watch and copy

---
