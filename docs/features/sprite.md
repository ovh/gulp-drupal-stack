Uses [gulp.spritesmith](https://github.com/twolfson/gulp.spritesmith). Grabs a folder of images and turns them into a sprite, creates a Sass mixin and class for each based on filename.

A documentation for SCSS features is available [here](https://www.bignerdranch.com/blog/css-sprite-management-with-gulp-part2/).

## Usage

Given a file named `facebook.png`, you can use this Sass mixin:

```scss
@include sprite('sprite-facebook');
```

Or this HTML class:

```html
<span class="sprite-facebook"></span>
```

### Retina support

You can generate a second sprite for Retina.
First, you need to duplicates all your images for Retina, and append "@2x" in the filename. For example: "facebook.png" and "facebook@2x.png".

After enabled it, you can now use the mixin:

```scss
@include retina-sprite('sprite-facebook');
```

It will automatically take sprite@2x for Retina devices, and normal sprite for others.


## Commands

- `gulp sprite` - Generates the sprite
- `gulp watch:sprite` - Watch for images modifed and regenerate the sprite

## Config

- `config.sprite.src` - Array or String of globbed PNG files
- `config.sprite.imgDest` - Destination directory for the sprite image file
- `config.sprite.cssDest` - Destination directory for the sprite SCSS file
- `config.sprite.imgName` - Name of the sprite image file
- `config.sprite.cssName` - Name of the sprite SCSS file
- `config.sprite.imgPathPrefix` - Sprite image path prefix
- `config.sprite.spritesheetName` - Name of the sprite
- `config.sprite.imagemin` - Enable imagemin compression for the sprite image file
- `config.sprite.retina.enabled` - Enable retina sprite generation
- `config.sprite.retina.imgName` - Name of the retina sprite image file
- `config.sprite.retina.filter` - Images filter that match the retina files

---
