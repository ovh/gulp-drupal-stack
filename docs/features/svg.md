It uses [gulp.svg-sprite](https://github.com/jkphl/gulp-svg-sprite) and [gulp.svgmin](https://github.com/ben-eb/gulp-svgmin)  

## Usage

### Svg sprite for Utility icon

- Add your raw svg icon in `config.svg.iconUtil.options.src` and config more options (prefix, outputFileName)
- run `gulp svg:utilsprite`  
- A `spriteFileName.svg` file will be generated as a collection of symbol (Cleanup/optimize raw svg icons & generate a sprite file) 
- Implement it with [`<use>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use)  
- Drupal 8 [implementation](https://www.lullabot.com/articles/better-svg-sprite-reuse-in-drupal-8) example  
- Check if you need [svg4everybody](https://github.com/jonathantneal/svg4everybody#implementation-status)

Notes:
- Get your designer to make icons monochrome and convert the strokes into paths, also simplify the paths down to single shapes. Example: [preparing and exporting](https://medium.com/sketch-app-sources/preparing-and-exporting-svg-icons-in-sketch-1a3d65b239bb) svg icons in sketch (This solution is useful for util icons, but could be extended for illustration type of icons)

### Svg illustration

- Add your raw svg icon illustration in `config.svg.iconIllustration.options.src` and config more options (prefix, outputDirName)
- run `gulp svg:illu`  
- Your raw svg files will be cleaned and export in a separated directory   

## Commands

- `gulp svg` - combine `gulp svg:utilsprite` & `gulp svg:illu`
- `gulp clean:svg` - remove compiled svg files

## Config

- `config.svg.dest` - Destination directory for the spriteFileName.svg file (dist/)
- `config.svg.iconUtil.options.src` - Directory of your RAW source svg icons utility as a string
- `config.svg.iconUtil.options.prefix` - Append symbol ID with a prefix
- `config.svg.iconUtil.options.outputFileName` - sprite file name
- `config.svg.iconIllustration.options.src` - Directory of your RAW source svg icons utility as a string
- `config.svg.iconIllustration.options.prefix` - Append individual svg file name with a prefix 
- `config.svg.iconIllustration.options.outputDirName` - illustration output directory name
---
