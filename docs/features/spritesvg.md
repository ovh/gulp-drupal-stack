It uses [gulp.svg-sprite](https://github.com/jkphl/gulp-svg-sprite) and [gulp.svgmin](https://github.com/ben-eb/gulp-svgmin)

A documentation for SCSS features is available [here](https://www.bignerdranch.com/blog/css-sprite-management-with-gulp-part2/).

## Usage

- Add your raw svg icon in `config.spritesvg.src`  
- run `gulp spritesvg`  
- A  `sprite.svg` file will be generated as a collection of symbol  
- Implement it with `<use>` [see](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use)  
 - [more implementation](https://www.lullabot.com/articles/better-svg-sprite-reuse-in-drupal-8)  
 - [check if you need svg4everybody](https://github.com/jonathantneal/svg4everybody#implementation-status)

Notes:
- symbol IDs are prefixed with `icon-` and append file name  
- get your designer to make icons monochrome and convert the strokes into paths, also simplify the paths down to single shapes.[see](https://medium.com/sketch-app-sources/preparing-and-exporting-svg-icons-in-sketch-1a3d65b239bb)  




## Commands

- `gulp spritesvg` - Clean up/optimize raw svg icon & generate the sprite

## Config

- `config.spritesvg.src` - Directory of your raw svg icons as a string
- `config.spritesvg.dest` - Destination directory for the sprite.svg file

---
