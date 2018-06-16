It uses [gulp.svg-sprite](https://github.com/jkphl/gulp-svg-sprite) and [gulp.svgmin](https://github.com/ben-eb/gulp-svgmin)  

## Usage

- Add your raw svg icon in `config.spritesvg.src`  
- run `gulp spritesvg`  
- A `sprite.svg` file will be generated as a collection of symbol  
- Implement it with [`<use>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use)  
- Drupal 8 [implementation](https://www.lullabot.com/articles/better-svg-sprite-reuse-in-drupal-8) example  
- Check if you need [svg4everybody](https://github.com/jonathantneal/svg4everybody#implementation-status)

Notes:
- Get your designer to make icons monochrome and convert the strokes into paths, also simplify the paths down to single shapes. Example: [preparing and exporting](https://medium.com/sketch-app-sources/preparing-and-exporting-svg-icons-in-sketch-1a3d65b239bb) svg icons in sketch

## Commands

- `gulp spritesvg` - Cleanup/optimize raw svg icon & generate a sprite file

## Config

- `config.spritesvg.src` - Directory of your raw svg icons as a string
- `config.spritesvg.dest` - Destination directory for the sprite.svg file
- `config.spritesvg.prefix` - Append symbol ID with a prefix
---
